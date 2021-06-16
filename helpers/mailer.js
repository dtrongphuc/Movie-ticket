'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: process.env.MAILER_HOST,
	port: process.env.MAILER_PORT,
	secure: process.env.MAILER_SECURE, // true for 465, false for other ports
	auth: {
		user: process.env.MAILER_USER, // generated ethereal user
		pass: process.env.MAILER_PASSWORD, // generated ethereal password
	},
	tls: {
		ciphers: 'SSLv3',
	},
});

exports.sendMail = async (email, subject, text, html) => {
	try {
		const info = await transporter.sendMail({
			from: '"Lotteria Movie" <lotteria@mail.com>', // sender address
			to: email, // list of receivers
			subject, // Subject line
			text, // plain text body
			html, // html body
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.log(error);
		return false;
	}

	return true;
};

exports.transporter = transporter;
