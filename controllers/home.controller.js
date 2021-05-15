const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');



var list = [];
class HomeController {
    
    async index(req, res) {
        

        var movies= await models.Movie.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });
        console.log(movies);
        res.render('content/content',{movies:movies});
    }
    
}

module.exports = new HomeController