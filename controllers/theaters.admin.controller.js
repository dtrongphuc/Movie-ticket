const express = require('express');
const models = require('../db/connection');
class TheatersController {

    index(req, res) {
        res.render('admin/manager/theaters');
    };

    async getData(req, res){
        var data = await models.Theater.findAll({
            order: [
                ['id', 'DESC'],
            ]
        });
        res.status(200).json(data);
    }

    async delete(req,res){
        var id = req.params.id;
        await models.Theater.destroy({
            where:{
                id: id
            }
        });
        res.redirect('/admin/cum-rap')
    }

    async add(req,res){
        var body = req.body;
        await models.Theater.create({
            name: body.nameTheaters,
            address: body.address
        });


        res.redirect('/admin/cum-rap')
    }

}

module.exports = new TheatersController