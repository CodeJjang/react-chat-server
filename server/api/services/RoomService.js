var _globalRoomName = 'globalRoom',
    _syncEventName = 'sync';

module.exports.joinGlobalRoom = function(req, cb) {
    var socketId = sails.sockets.getId(req);
    UserService.createUser(socketId)
        .then((user) => {
            console.log('User was created with id:', user.id);
            req.session.userId = user.id;
            req.session.save();
            console.log('Session id:', req.sessionID);
            return Promise.resolve();
        })
        .then(() => {
            sails.sockets.join(req, _globalRoomName, cb);
            return Promise.resolve();
        })
        .catch((err) => cb(err));
}

module.exports.sendComment = function(user, text, room) {
    var createCommentPromise = CommentService.createComment(user, text);

    if (!room) {
        return createCommentPromise
            .then(sendSyncToRoom(_globalRoomName));
    } else {
        return createCommentPromise
            .then(sendSyncToRoom(room));
    }
}

module.exports.getGlobalRoomName = function() {
    return _globalRoomName;
}

function sendSyncToRoom(roomName) {
	console.log('Sending sync to room:', roomName);
    sails.sockets.broadcast(roomName, _syncEventName);
    return Promise.resolve();
}
