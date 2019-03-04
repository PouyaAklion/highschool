let guest = function (req, res, next) {

	if (!req.token) {
		next();
	} else {
		res.redirect('/');
	}
}
module.exports = {
	guest
}