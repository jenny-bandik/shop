const mongoose = require('mongoose');

let categoriescSchema = mongoose.Schema({
	name: String,
	uri:String
});

let Category = new mongoose.model('category', categoriescSchema);

module.exports = Category;