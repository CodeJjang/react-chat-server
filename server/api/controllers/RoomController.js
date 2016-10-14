/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    joinGlobalRoom: function(req, res, next) {
        if (!req.isSocket) {
            return res.badRequest();
        }

        RoomService.joinGlobalRoom(req)
            .then(() => {
                console.log('Someone joined global room.');
                return res.ok();
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    }
};
