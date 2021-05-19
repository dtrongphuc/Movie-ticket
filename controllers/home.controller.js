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
           limit: 5,
		})
		.then(movies => {
			return res.render('content/content', {movies:movies});
		})
		.catch(() => {
			res.status(500).send({ error: 'Something failed!' })
		})
    };

	async indexNew(req, res, next) {
        
        models.Movie.findAll({
           include: [{

               model: models.Image,
               where: {},

           }],
		   order: [
			['openingDay', 'DESC'],
			],
		})
		.then(movies => {
			return res.render('content/contentNew', {movies:movies});
		})
		.catch(() => {
			res.status(500).send({ error: 'Something failed!' })
		})
    };

    async detail(req, res, next) {

		const id = req.params.id;
		
		models.Movie.findOne({
			where: {id: id},
			include: [
				{
					model: models.Image,
				}
			]
		})
		.then(movie => {
			return res.render('content/detail', {movie : movie});
		})
		.catch(()=>{
			res.status(500).send({ error: 'Something failed!' })
		})
			
	}

};

module.exports = new HomeController