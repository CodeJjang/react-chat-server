var _globalRoomName = 'globalRoom',
    _syncEventName = 'sync';

module.exports.createRoom = function(roomName, ownerId) {
    return Room.create({
        roomName: roomName,
        ownerId: ownerId
    });
}

module.exports.createGlobalRoomIfNotExists = function() {
    return Room.findOrCreate({
        name: _globalRoomName
    }, {
        name: _globalRoomName,
        ownerId: 'none'
    });
}

module.exports.joinGlobalRoom = function(req) {
    return (req.session.userId ? Promise.resolve() : createUser(req, _globalRoomName))
        .then(joinRoom(req, _globalRoomName));
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

function createUser(req, currentRoomName) {
    return RoomService.findRoom({
            name: currentRoomName
        })
        .then((room) => {
            return UserService.createUser(room.id);
        })
        .then((user) => {
            console.log('User was created with id:', user.id);
            req.session.userId = user.id;
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
