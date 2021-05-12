const express = require('express');
class Statistics {

    theater(req, res) {
        var body = req.body;
        console.log(body);
        res.render('admin/statistics/statisticsTheaters',{movie: null, cinema: null});
    };

    movie(req, res) {
        var body = req.body;
        console.log(body);
        res.render('admin/statistics/statisticsTheaters',{movie: null, cinema: null});
    };

}

module.exports = new Statistics