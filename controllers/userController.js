const { User } = require('../models/user');
let index = function (req, res) {
	let user = req.user;

	res.render('parent/dashboard', { user });
}
let register = function (req, res) {
	let data = req.body;
	if (!data) {
		return
	}

	let user = new User(data);
	user.save().then(() => {
		return user.generateAuthToken();
	})
		.then(token => {
			res.cookie('access_token', token, {
				maxAge: 3600000,
				httpOnly: true
			})
			if (user.role === 'parent') {
				res.redirect('/parent-dashboard');
			} else if (user.role === 'admin') {
				res.redirect('/admin-dashboard');
			} else if (user.role === 'teacher') {
				res.redirect('/teacher-dashboard');
			}
		})
		.catch(e => {
			console.log(e);
		})

}
let login = function (req, res) {
	let data = req.body;
	let findedUser;
	User.findOne({
		email: data.email,
		password: data.password
	}).then((user) => {
		
		findedUser = user;
		return user.generateAuthToken()
	})
		.then(token => {
			res.cookie('access_token', token, {
				maxAge: 3600000,
				httpOnly: true
			})
			if (findedUser.role === 'parent') {
				res.redirect('/parent-dashboard');
			} else if (findedUser.role === 'admin') {
				res.redirect('/admin-dashboard');
			} else if (findedUser.role === 'teacher') {
				res.redirect('/teacher-dashboard');
			}

		})
		.catch(e => {
			console.log(e);
			res.redirect('/login');
		})
}
let logout = function (req, res) {
	User.findByToken(req.token).then((user) => {
		user.tokens = [];
		return user.save();
	})
		.then(() => {
			res.clearCookie('access_token');
			res.redirect('/');
		})
		.catch(e => {
			res.redirect('/');
		})
}
module.exports = {
	index,
	register,
	login,
	logout
}