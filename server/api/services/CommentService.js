module.exports.createComment = function(user, text, roomId) {
	console.log('Creating comment of user %s and roomId %s: %s', user.nickname, roomId, text);

	return Comment.create({
		author: user.nickname,
		text: text,
		roomId: roomId
	});
};

module.exports.findComment = function(params) {
	return Comment.find(params);
}