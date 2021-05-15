const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class ShowtimeController {

    async index(req, res) {
        var movie= await models.Movie.findAll();
        let cinema = await models.Cinema.findAll();
        res.render('admin/manager/showtime',{movie: movie, cinema: cinema});
    };

    async getData(req, res){
        let query =`SELECT c."name" as "cinemaName", m."name" as "movieName", s.* 
                    FROM showtimes s JOIN cinemas c on c.id = s."cinemaId"
                    join movies m on m.id = s."movieId" ORDER BY s.id DESC`
        var data = await models.sequelize.query(query,
            {
                raw: false,
                type: QueryTypes.SELECT
            }
        );

        console.log(momentDate.format("YYYY-MM-DD hh:mm:ss A Z"));
        res.status(200).json(data);
    }

    async delete(req,res){
        var movie = req.params.movie;
        var cinema = req.params.cinema;
        await models.Showtime.destroy({
            where:{
                movieId: movie,
                cinemaId: cinema
            }
        });
        res.redirect('/admin/suat-phim')
    }

    async add(req,res){
        var body = req.body;
        await models.Showtime.create({
            startTime: body.starttime,
            endTime: body.endtime,
            fare: body.price,
            movieId: body.movie,
            cinemaId: body.cinema
        });
        res.redirect('/admin/suat-phim')
    }
}

module.exports = new ShowtimeController