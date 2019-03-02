const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
let UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [function () {
			return this.role === 'parent'
		}, 'User first-name required'],
		maxlength: 25,
		trim: true,
	},
	lastName: {
		type: String,
		required: [function () {
			return this.role === 'parent'
		}, 'User last-name required'],
		maxlength: 25,
		trim: true,
	},
	nationalCode: {
		type: Number,
		required: [function () {
			return this.role === 'parent'
		}, 'User last-name required'],
		maxlength: 10,
		unique: true,
	},
	fatherName: {
		type: String,
		required: [function () {
			return this.role === 'parent'
		}, 'User father-name required'],
		maxlength: 25,
		trim: true,
	},
	birthdate: {
		type: Date,
		required: [function () {
			return this.role === 'parent'
		}, 'User birthday required'],
	},
	gradeId: {
		type: Number,
		// validate: {
		// 	validator: function (v) {
		// 		return validator.isInt(v, { min: 0, max: 3 });
		// 	},
		// 	message: props => `${probs.value} is not valid class number`
		// }
	},
	grades: [{
		gradeId: {
			type: Number,
			required: [function () {
				return this.role === 'teacher'
			}, 'teacher gradeId required']
		}
	}],
	teacherInfo: {
		degree: {
			type: String,
			required: [function () {
				return this.role === 'teacher'
			}, 'teacher degree required']
		},
		experience: {
			type: String,
			required: [function () {
				return this.role === 'teacher'
			}, 'teacher experience required']
		}

	},
	email: {
		type: String,
		required: [true, 'User email required'],
		minlength: 10,
		maxlength: 50,
		unique: true,
		trim: true,
		validate: {
			validator: function (v) {
				return validator.isEmail(v);
			},
			message: props => `${props.value} is not valid email`
		}
	},
	password: {
		type: String,
		required: [true, 'User password required'],
		minlength: 6,

	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	role: {
		type: String,
		default: 'parent'
	}
})
UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({ '_id': user._id.toHexString(), access }, 'secretFromPouya').toString();
	user.tokens = user.tokens.concat([{ access, token }]);

	return user.save().then(() => {
		return token;
	})

}
UserSchema.statics.findByToken = function (token) {
	let user = this;
	let decoded;
	try {
		decoded = jwt.verify(token, 'secretFromPouya')
	} catch (e) {
		return Promise.reject();
	}
	return user.findOne({
		'_id': decoded._id,
		'tokens.access': 'auth',
		'tokens.token': token
	})
}
let User = mongoose.model('User', UserSchema);

module.exports = { User };