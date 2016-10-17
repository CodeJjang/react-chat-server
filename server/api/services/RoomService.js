var util = require('util');

var _globalRoomName = 'Global',
    _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users',
    _newRoomSyncEventName = 'sync_rooms';

var _globalRoomId; // defined on run-time

module.exports.createRoom = function(roomName, ownerId) {
    return Room.create({
            roomName: roomName,
            ownerId: ownerId
        })
        .then((room) => {
            broadcastSyncToAllRooms(_newRoomSyncEventName)
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                })
            return Promise.resolve(room);
        })
}

function findRoom(params) {
    return Room.find(params);
}
module.exports.findRoom = findRoom;

module.exports.createGlobalRoomIfNotExists = function() {
    return Room.findOrCreate({
            name: _globalRoomName
        }, {
            name: _globalRoomName,
            ownerId: 'none'
        })
        .then(createdOrFoundRecords => {
            if (createdOrFoundRecords && _.isArray(createdOrFoundRecords)) {
                _globalRoomId = createdOrFoundRecords[0].id;
            } else if (createdOrFoundRecords) {
                _globalRoomId = createdOrFoundRecords.id;
            } else {
                return Promise.reject(new Error('Failed creating / finding global room.'));
            }

            return Promise.resolve();
        });
}

module.exports.joinGlobalRoom = function(req) {
    return (req.session.user ? Promise.resolve() : createUser(req, _globalRoomName))
        .then(joinRoom(req, _globalRoomId));
}

module.exports.sendComment = function(user, text, roomId) {
    var findParams = {};
    if (!roomId) {
        findParams.name = _globalRoomName;
    } else {
        findParams.id = roomId;
    }

    var _room;
    return findRoom(findParams)
        .then(room => {
            if (room && room.length === 1) {
                _room = room[0];
                return CommentService.createComment(user, text, room[0].id);
            }

            return Promise.reject(new Error('No single room was found.'));
        })
        .then(comment => {
            sendSyncToRoom(_room.name, _newCommentSyncEventName)
            return Promise.resolve(comment);
        });
}

module.exports.getGlobalRoomName = function() {
    return _globalRoomName;
}

module.exports.sendUserSyncToAllRooms = function() {
    return broadcastSyncToAllRooms(_newUserSyncEventName);
}

function joinRoom(req, roomId) {
    return findRoom({ id: roomId })
        .then(room => {
            return new Promise(function(resolve, reject) {
                sails.sockets.join(req, room.name, function(err) {
                    if (err) {
                        return reject(err);
                    }

                    resolve();
                });
            });
        })
        .then(leaveRoom(req))
        .then(() => {
            return UserService.updateUser({ id: req.session.user.id }, { currentRoomId: roomId })
                .then(() => {
                    req.session.user.currentRoomId = roomId;
                    return Promise.resolve();
                });
        })
}
module.exports.joinRoom = joinRoom;

function leaveRoom(req) {
    if(!req.session.user.currentRoomId) {
        return Promise.resolve();
    }
    
    return findRoom({ id: req.session.user.currentRoomId })
        .then(rooms => {
            if (rooms && rooms.length === 1) {
                return Promise.resolve(rooms[0].name);
            }

            return Promise.reject(new Error('No room or multiple rooms were found.'));
        })
        .then(roomName => {
            return new Promise(function(resolve, reject) {
                sails.sockets.leave(req, roomName, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
}

function sendSyncToRoom(roomName, eventName) {
    console.log('Sending sync to room: %s, with event name: %s.', roomName, eventName);
    sails.sockets.broadcast(roomName, eventName);
    return Promise.resolve();
}

function broadcastSyncToAllRooms(eventName) {
    console.log('Sending broadcast sync with event name %s.', eventName);
    sails.sockets.blast(eventName);
    return Promise.resolve();
}

function createUser(req, currentRoomName) {
    return Room.find({
            name: currentRoomName
        })
        .then((rooms) => {
            if (rooms && rooms.length === 1) {
                return UserService.createUser(rooms[0].id);
            }

            // can be thrown either for several rooms or no room at all, which is a bug
            return Promise.reject(new Error(util.format('No single room was found with name %s', currentRoomName)));
        })
        .then((user) => {
            console.log('User was created with id:', user.id);
            req.session.user = user;
            req.session.save();
            return Promise.resolve();
        });
}
