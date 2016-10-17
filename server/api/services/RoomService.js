var util = require('util');

var _globalRoomName = 'Global',
    _globalRoomId = '5803bb435efa70e03c74ee2e',
    _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users',
    _newRoomSyncEventName = 'sync_rooms';

module.exports.createRoom = function(roomName, ownerId) {
    return Room.create({
            roomName: roomName,
            ownerId: ownerId
        })
        .then(room => {
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

function findRoomById(id) {
    return Room.findOne({id: id});
}
module.exports.findRoomById = findRoomById;

module.exports.createGlobalRoomIfNotExists = function() {
    return Room.findOrCreate({
            name: _globalRoomName
        }, {
            name: _globalRoomName,
            ownerId: 'none',
            id: _globalRoomId
        });
}

module.exports.joinGlobalRoom = function(req) {
    return (req.session.user ? Promise.resolve() : createUser(req, _globalRoomId))
        .then(() => joinRoom(req, _globalRoomId));
}

module.exports.sendComment = function(user, text, roomId) {
    var findRoomPromise;
    if (!roomId) {
        findRoomPromise = findRoom({name: _globalRoomName});
    } else {
        findRoomPromise = findRoomById(roomId);
    }

    var _room;
    return findRoomPromise
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

module.exports.getGlobalRoomId = function() {
    return _globalRoomId;
}

module.exports.sendUserSyncToAllRooms = function() {
    return broadcastSyncToAllRooms(_newUserSyncEventName);
}

function joinRoom(req, roomId) {
    console.log('Attempting to join room with id:', roomId);
    return findRoomById(roomId)
        .then(room => {
            return new Promise(function(resolve, reject) {
                sails.sockets.join(req, room.name, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    console.log('Joined room with name: %s, id: %s', room.name, room.id);
                    resolve();
                });
            });
        })
        .then(() => {
            // if user joined new room, leave the old one
            if(roomId !== req.session.user.currentRoomId) {
                return leaveRoom(req);
            }

            return Promise.resolve();
        })
        .then(() => UserService.updateUser({ id: req.session.user.id }, { currentRoomId: roomId }))
        .then(() => {
            req.session.user.currentRoomId = roomId;
            return saveSessionAsPromise(req.session);
        })
}
module.exports.joinRoom = joinRoom;

function leaveRoom(req) {
    console.log('Attempting to leave room with id:', req.session.user.currentRoomId);
    return findRoomById(req.session.user.currentRoomId)
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
                    console.log('Room with id %s was left.', req.session.user.currentRoomId);
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

function createUser(req, roomId) {
    return UserService
        .createUser(roomId)
        .then(user => {
            console.log('User was created with id:', user.id);
            req.session.user = user;
            return saveSessionAsPromise(req.session);
        });
}

function saveSessionAsPromise(session) {
    return new Promise(function(resolve, reject) {
        session.save(() => resolve());
    });
}