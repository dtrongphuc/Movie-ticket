const express = require('express');
class TheatersController {

    index(req, res) {
        res.render('admin/manager/theaters');
    };

    getData(req, res){
        var data = [
    		{
				"id": 1,
				"name": "Quận 8",
				"address": "123 Quận 8"
			},
			{
				"id": 2,
				"name": "Quận 2",
				"address": "123 Quận 2"
			},
			{
				"id": 3,
				"name": "Quận 3",
				"address": "123 Quận 3"
			},
    	];
        res.status(200).json(data);
    }

    delete(req,res){
        var id = req.params.id;
        console.log(id);
        res.redirect('/admin/cum-rap')
    }

    add(req,res){
        var body = req.body;
        console.log(body);
        res.redirect('/admin/cum-rap')
    }

}

module.exports = new TheatersController