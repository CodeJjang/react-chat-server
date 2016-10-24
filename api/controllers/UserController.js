/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function(req, res, next) {

        var roomId = req.query.roomId || RoomService.getGlobalRoomId();
        return UserService.findUser({
                currentRoomId: roomId,
                nickname: { '!': null }
            })
            .then(users => {
                res.json(users);
                return Promise.resolve();
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    }
};
