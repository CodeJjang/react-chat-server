module.exports.createComment = function(user, text) {
	console.log('Creating comment:', user, text);

	return Comment.create({
		author: user,
		text: text
	});
};