const express = require('express');
const { QueryTypes } = require('sequelize');
const models = require('../db/connection');
class Statistics {

    async theater(req, res) {
        var body = req.body;
        console.log(body);
        var x = await models.sequelize.query(
            'SELECT * FROM theaters',
            {
              type: QueryTypes.SELECT
            }
          );
        res.render('admin/statistics/statisticsTheaters',{movie: null, cinema: null});
    };

    movie(req, res) {
        var body = req.body;
        console.log(body);
        res.render('admin/statistics/statisticsTheaters',{movie: null, cinema: null});
    };

}

module.exports = new Statistics