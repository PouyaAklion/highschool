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
			res.redirect('/parent-dashboard');
		})
		.catch(e => {
			console.log(e);
		})
		
}
let login = function (req, res) {
	let data = req.body;
	User.findOne({
		email: data.email,
		password: data.password
	}).then((user) => {
		return user.generateAuthToken()
	})
	.then(token =>{
		res.cookie('access_token', token, {
			maxAge: 3600000,
			httpOnly: true
		})
		res.redirect('/parent-dashboard');
	})
	.catch(e => {
		console.log(e);
		res.redirect('/login');
	})
}
let logout = function (req, res) {
	let token = req.cookies.access_token;
	User.findByToken(token).then((user) => {
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