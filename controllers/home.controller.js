const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');


//var list = [];
class HomeController {

    async index(req, res) {


        // let query = `SELECT i."publicURL" , m.* 
        //             FROM movie m JOIN image i on m.id = i."movieId"`;

        // var data = await models.sequelize.query(query,
        //     {
        //         type: QueryTypes.SELECT
        //     }
        // );

        // res.status(200).json(data);

        // console.log(data);

        var movies= await models.Movie.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });


        console.log(movies);
        res.render('content/content', {movies:movies});
    }

}

module.exports = new HomeController