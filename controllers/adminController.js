const _ = require('lodash');
const multer = require('multer');

const { User } = require('../models/user');
const { Post } = require('../models/post');

let index = function (req, res) {
	res.render('admin/dashboard', { user: req.user });
}
let students = function (req, res) {
	User.find({ role: 'parent' }).then((students) => {
		students = students.map(student => {
			return _.omit(student.toObject(), ['password', 'email', 'tokens', '__v']);
		})
		res.render('admin/students', { user: req.user, students });
	})
		.catch(e => {

		})
}
let teachers = function (req, res) {

	let message = req.cookies.message;
	if (message) { res.clearCookie('message') }
	User.find({ role: 'teacher' }).then((teachers) => {
		teachers = teachers.map(teacher => {
			return _.omit(teacher.toObject(), ['password', 'email', 'token']);
		})
		res.render('admin/teachers', { user: req.user, teachers, message })
	})
		.catch(e => {

		})
}
let teacherRegister = function (req, res) {
	let data = req.body;
	let teacherInfo = _.pick(data, ['experience', 'degree', 'lesson']);
	let dataGrade = _.pick(data, ['one', 'two', 'three', 'four']);
	data = _.omit(data, ['experience', 'degree', 'lesson', 'one', 'two', 'three', 'four']);
	let grades = [];
	for (let key in dataGrade) {
		if (dataGrade.hasOwnProperty(key)) {
			if (key === 'one') {
				grades.push({
					gradeId: 1
				})
			} else if (key === 'two') {
				grades.push({
					gradeId: 2
				});
			} else if (key === 'three') {
				grades.push({
					gradeId: 4
				});
			} else if (key === 'four') {
				grades.push({
					gradeId: 4
				});
			}
		}
	}
	data.teacherInfo = teacherInfo;
	data.grades = grades;
	data.role = 'teacher'

	let user = new User(data)
	user.save().then(() => {
		res.cookie('message', 'معلم با موفقیت ثبت شد', { httpOnly: true });
		res.redirect('/admin-teachers')
	})
		.catch(e => {
			res.cookie('message', req.__('email'), { httpOnly: true });
			res.redirect('/admin-teachers');
			console.log(`${e} ${req.__('email')}`);
		})

}
let post = function (req, res) {
	let message = req.cookies.message;
	if (message) { res.clearCookie('message') }

	res.render('admin/post', { user: req.user,message });
}
let createPost = function (req, res) {

	let body = req.body;
	let title = body.title;
	let content = body.content;
	let imageUrl = `uploads/${req.file.filename}`;
	let post = new Post({
		title,
		content,
		imageUrl
	})
	post.save()
		.then(post => {
			res.cookie('message', 'خبر با موفقیت ثبت شد', { httpOnly: true });
			res.redirect('/admin-post')
		})
		.catch(e => {
			res.cookie('message', 'خطا:خبر ثبت نشد', { httpOnly: true });
			res.redirect('/admin-post')
		})


}
module.exports = {
	index,
	students,
	teachers,
	teacherRegister,
	post,
	createPost
}