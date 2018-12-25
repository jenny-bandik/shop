const mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
	name: String,
	login: String,
	password: String,
	mail:String
});

let Users = new mongoose.model('users',  usersSchema);

module.exports = Users;