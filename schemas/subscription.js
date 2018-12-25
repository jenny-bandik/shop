const mongoose = require('mongoose');

let subscriptionsSchema = mongoose.Schema({
	mail: String
});

let Subscriptions = new mongoose.model('subscriptions',  subscriptionsSchema);

module.exports = Subscriptions;