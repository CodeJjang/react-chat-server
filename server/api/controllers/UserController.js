/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function(req, res, next) {

        var currentRoomId = req.query.currentRoomId;
        return findRoom(currentRoomId)
            .then((room) => {
                if (room && room.length === 1) {
                    return UserService.findUser({
                        currentRoomId: room[0].id,
                        nickname: {'!': null}
                    });
                }

                return Promise.reject(new Error('Global room was not found.'));
            })
            .then((users) => {
                res.json(users);
                return Promise.resolve();
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    }
};

function findRoom(currentRoomId) {
    if (currentRoomId) {
        return RoomService.findRoom({
            id: currentRoomId
        });
    }

    return RoomService.findRoom({
        name: RoomService.getGlobalRoomName()
    });
}
