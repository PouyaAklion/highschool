const { User } = require('../models/user');
let admin = function (req, res, next) {
	if (req.user.role === 'admin') {
		next();
	} else {
		res.redirect('/');
	}
}
module.exports = {
	admin
}