const mongoose = require('mongoose');

let productsSchema = mongoose.Schema({
	name: String,
	img: String,
	price: Number,
	category:Number
});

let Products = new mongoose.model('products',  productsSchema);

module.exports = Products;