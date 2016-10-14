var _globalRoomName = 'globalRoom',
    _syncEventName = 'sync';

module.exports.joinGlobalRoom = function(req) {
    return (req.session.userId ? Promise.resolve() : createUser(req))
        .then(joinGlobalRoomAsPromise(req));
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

function createUser(req) {
    return UserService.createUser()
        .then((user) => {
            console.log('User was created with id:', user.id);
            req.session.userId = user.id;
            req.session.save();
            return Promise.resolve();
        });
}

function joinGlobalRoomAsPromise(req) {
    return new Promise(function(resolve, reject) {
        sails.sockets.join(req, _globalRoomName, function(err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
