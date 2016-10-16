var util = require('util');

var _globalRoomName = 'globalRoom',
    _newCommentSyncEventName = 'sync_comments',
    _newUserSyncEventName = 'sync_users';

module.exports.createRoom = function(roomName, ownerId) {
    return Room.create({
        roomName: roomName,
        ownerId: ownerId
    });
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
    });
}

module.exports.joinGlobalRoom = function(req) {
    return (req.session.user ? Promise.resolve() : createUser(req, _globalRoomName))
        .then(joinRoom(req, _globalRoomName));
}

module.exports.sendComment = function(user, text, roomId) {
    var createCommentPromise = CommentService.createComment(user, text, roomId);

    if (!roomId) {
        return createCommentPromise
            .then(sendSyncToRoom(_globalRoomName, _newCommentSyncEventName));
    } else {
        var _room;
        return findRoom(roomId)
            .then(room => {
                if(room && room.length === 1) {
                    _room = room;
                    return createCommentPromise;
                }

                return Promise.reject(new Error('No single room was found.'));
            })
            .then(() => sendSyncToRoom(_room.name, _newCommentSyncEventName));
    }
}

module.exports.getGlobalRoomName = function() {
    return _globalRoomName;
}

module.exports.sendUserSyncToRoom = function(roomName) {
    return sendSyncToRoom(roomName, _newUserSyncEventName);
}

function sendSyncToRoom(roomName, eventName) {
    console.log('Sending sync to room: %s, with event name: %s.', roomName, eventName);
    sails.sockets.broadcast(roomName, eventName);
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
            return Promise.reject(new Error(util.format('No sinle room was found with name %s', currentRoomName)));
        })
        .then((user) => {
            console.log('User was created with id:', user.id);
            req.session.user = user;
            req.session.save();
            return Promise.resolve();
        });
}

function joinRoom(req, roomName) {
    return new Promise(function(resolve, reject) {
        sails.sockets.join(req, roomName, function(err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
