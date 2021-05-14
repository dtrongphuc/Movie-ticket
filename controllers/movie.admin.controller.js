const express = require('express');
const models = require('../db/connection');
const cloudinary = require('../helpers/cloudinary');
var multer  = require('multer');

class MovieController {

    index(req, res) {
        res.render('admin/manager/movie');
    };

    async getData(req, res){
        var data = await models.Movie.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });
        res.status(200).json(data);
    }

    async delete(req,res){
        var id = req.params.id;
        await models.Movie.destroy({
            where:{
                id: id
            }
        });
        res.redirect('/admin/phim')
    }

    async add(req,res){
        var body = req.body;
        let avatar = req.file;
        let imagePath = await cloudinary.uploadMovieImage(req.file.path);
        console.log(imagePath);
        
        // var movie = await models.Movie.create({
        //     name: body.name,
        //     time: body.time,
        //     OpeningDay: body.starttime
        // });

        // console.log(movie);

        res.redirect('/admin/phim')
    }

}

module.exports = new MovieController