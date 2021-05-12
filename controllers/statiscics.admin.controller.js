const express = require('express');
class Statistics {

    theater(req, res) {
        var bd = req.body;
        console.log(bd);
        res.render('admin/statistics/statisticsTheaters',{movie: movie, cinema: cinema});
    };

}

module.exports = new Statistics