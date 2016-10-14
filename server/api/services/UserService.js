module.exports.updateUser = function(id, nickname) {
	console.log('Updating user of id: %s, with nickname: %s', id, nickname);

    return User.update({
        id: id
    }, {
        nickname: nickname
    });
};

module.exports.createUser = function() {
	console.log('Creating anonymous user');

	return User.create({});
};

module.exports.findUser = function(params) {
	return User.find(params);
};