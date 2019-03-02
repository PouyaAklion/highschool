const { User } = require('../models/user');
const _ = require('lodash');

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
	let teacherInfo = _.pick(data, ['experience', 'degree']);
	let dataGrade = _.pick(data, ['one', 'two', 'three', 'four']);
	data = _.omit(data, ['experience', 'degree', 'one', 'two', 'three', 'four']);
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
			console.log(e);
		})

}
module.exports = {
	index,
	students,
	teachers,
	teacherRegister
}