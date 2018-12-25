const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/shop';
const express = require('express');
const router = express.Router();
const app = express();
const view = __dirname + '/dist/ang-shop';
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

let urlencodedParser = bodyParser.urlencoded({extended: true}),
	jsonParser = bodyParser.json();

let Category = require('./schemas/category'),
	Products = require('./schemas/products'),
	Users = require('./schemas/users'),
	Subscriptions = require('./schemas/subscription');


mongoose.connect(dbUrl, function (err) {

	if (err) throw err;

}, {useNewUrlParser: true});

// // define the about route
router.get('/', function (req, res) {

	return res.sendFile('index.html', {root: view})

});

router.get('/menu', function (req, res) {
	Category.find({}, function (err, cat) {

		if (err) return console.log(err);

		return res.send(cat);
	});

});


router.get('/category/:id/data', function (req, res, next) {
	let idObj = req.params.id;

	Products.find({category: idObj}, function (err, product) {
		if (err) return console.log(err);

		res.send(product);

	});

});

router.post('/auth/data', jsonParser, function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	let login = req.body.login,
		password = req.body.password;
	Users.find({login: login, password: password}).lean().exec(function (err, users) {

		let user = JSON.parse(JSON.stringify(users));

		if (err) return console.log(err);

		if (user.length > 0) {
			if (login === user[0].login && password === user[0].password) {
				res.json({name: user[0].name, login: user[0].login, role: user[0].role, success: true});
			} else {
				res.json({success: false});
			}
		} else {
			res.json({errorText: 'Сочетаний таких логина и пароля не найдены!', success: false});
		}


	})

});

router.post('/registration/data', jsonParser, function (req, res, next) {
	if (!req.body) return res.sendStatus(400);

	let login = req.body.login,
		userData = new Users({
			name: req.body.name,
			login: req.body.login,
			password: req.body.password,
			mail: req.body.mail
		});

	Users.find({login: login}).lean().exec(function (err, users) {

		let user = JSON.parse(JSON.stringify(users));

		if (err) return console.log(err);

		if (user.length >0 || req.body.password.length <8 || req.body.login === '') {
			res.json({errorText: 'Логин занят', success: false});
			return false;
		} else {
			userData.save(function (error, userData) {
				if (error) return console.log(error);

				res.json({name: userData.name, login: userData.login, success: true});
			})
		}

	})

});

router.post('/subscribtion/data', jsonParser, function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	let mail = req.body.mail,
		subData = new Subscriptions({
			mail: req.body.mail
		});

	Subscriptions.find({mail: mail}).lean().exec(function (err, subscription) {

		let sub = JSON.parse(JSON.stringify(subscription));

		if (err) return console.log(err);

		if (sub.length > 0) {
			res.json({errorText: 'Данная почта уже есть в базе!', success: false});
			return false;
		} else {
			subData.save(function (error, userData) {
				if (error) return console.log(error);

				res.json({mail: subData.mail, success: true});
			})
		}

	})
});

router.post('/mailing/data', jsonParser, function (req, res, next) {
	if (!req.body) return res.sendStatus(400);
	let message = req.body.message,
		formTo = '',
		mailOptions = {
			from: '<test@test.com>',
			subject: 'News',
			text: 'New message',
			html: message
		};
	Subscriptions.find({}, function (err, subscription) {

		let sub = JSON.parse(JSON.stringify(subscription));

		sub.each(function (i, el) {
			if (i > 0) {
				formTo += ',' + el.mail
			} else {
				formTo += el.mail
			}

		});

		if (err) return console.log(err);
		mailOptions.to = formTo;

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				return console.log(error);
			}

		});

	})
});

module.exports = router;


