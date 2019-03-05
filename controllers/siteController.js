let { Post } = require('../models/post');
let _ = require('lodash');

let register = function (req, res) {
	res.render('auth/register');
}
let login = function (req, res) {
	res.render('auth/login');
}
let home = function (req, res) {
	let user = req.user;
	Post.find({}).then(posts => {
		posts = posts.map(post => {
			return _.omit(post.toObject(), ['__v']);
		})
		res.render('site/home', { user, posts });
	})
		.catch(e => {
			res.render('site/home', { user });
		})

}
let post = function (req, res) {
	let user = req.user;
	let id = req.params.id;
	let allPosts;
	Post.find({}).then(posts => {
		allPosts = posts.map(post => {
			return _.omit(post.toObject(), ['__v']);
		})
		return Post.findById(id);
	})
		.then(post => {
			res.render('site/post', { user,post, posts: allPosts })
		})
		.catch(e => {
			res.render('site/home', { user });
		})
}

module.exports = {
	home,
	login,
	register,
	post

}