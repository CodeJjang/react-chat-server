module.exports.findOrCreateUser = function(nickname, text) {
	console.log('Finding / Creating user:', nickname);

    return User.findOrCreate({
        nickname: nickname
    }, {
        nickname: nickname
    });
};
