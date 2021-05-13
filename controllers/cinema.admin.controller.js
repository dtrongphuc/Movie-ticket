const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class CinemaController {

    async index(req, res) {
        var theaters= await models.Theater.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });
        res.render('admin/manager/cinema', {theaters: theaters});
    };

    async getData(req, res){
        let query = `SELECT t."name" as "theaterName", c.* 
                    FROM theaters t JOIN cinemas c on t.id = c."theaterId" 
                    ORDER BY c.id DESC`;

        var data = await models.sequelize.query(query,
            {
                type: QueryTypes.SELECT
            }
        );
        res.status(200).json(data);
    }

    async delete(req,res){
        var id = req.params.id;
        await models.Cinema.destroy({
            where:{
                id: id
            }
        });
        res.redirect('/admin/');
    }

    async add(req,res){
        var body = req.body;
        await models.Cinema.create({
            name: body.name,
            type: body.type,
            length: body.length,
            width: body.width,
            theaterId: body.theaters
        });
        res.redirect('/admin/');
    }
}

module.exports = new CinemaController