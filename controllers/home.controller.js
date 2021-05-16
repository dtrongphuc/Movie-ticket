const express = require('express');
const models = require('../db/connection');
const { Sequelize, QueryTypes } = require('sequelize');
const { movie } = require('./statiscics.admin.controller');
const image = require('../models/image.model');

class HomeController {

    async index(req, res, next) {

        models.Movie.findAll({
           include: [{

               model: models.Image,
               where: {},

           }],
           limit: 4,
		})
		.then(movies => {
			return res.render('content/content', {movies:movies});
		})
		.catch(() => {
			res.status(500).send({ error: 'Something failed!' })
		})


    };

};

module.exports = new HomeController