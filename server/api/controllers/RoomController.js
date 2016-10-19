/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    joinGlobalRoom: function(req, res, next) {
        if (!req.isSocket || !req.method === 'POST') {
            return res.badRequest();
        }
        
        RoomService.joinGlobalRoom(req)
            .then(() => {
                console.log('Someone joined global room.');
                return res.ok();
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    },

    join: function(req, res, next) {
        if (!req.isSocket || !req.method === 'POST') {
            return res.badRequest();
        } else if (!validateJoinParams(req.body)) {
            return next(new Error('Some parameters are missing.'));
        }
        
        var roomId = req.body.roomId;
        RoomService.joinRoom(req, roomId)
            .then(() => {
                console.log('Someone joined room with id %s.', roomId);
                return res.ok();
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    },

    create: function(req, res, next) {
        if (!validateCreateParams(req.body)) {
            return next(new Error('Some parameters are missing.'));
        }

        var name = req.body.name;
        RoomService.createRoom(name, req.session.user.id)
            .then(room => {
                console.log('Room %s was created.', name);
                return res.json(room);
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            });
    },

    find: function(req, res, next) {
        RoomService.findRoom({
                name: { '!': RoomService.getGlobalRoomName() }
            })
            .then(rooms => {
                return res.json(rooms);
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                    next(err);
                }
            })
    }
};

function validateCreateParams(body) {
    if (_.isUndefined(body.name)) {
        return false;
    }
    
    return true;
}

function validateJoinParams(body) {
    if (_.isUndefined(body.roomId)) {
        return false;
    }

    return true;
}
