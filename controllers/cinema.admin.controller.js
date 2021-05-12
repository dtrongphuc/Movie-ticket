const express = require('express');
class CinemaController {

    index(req, res) {
        var theaters= [
            {
                "id": 1,
                "name": "Quận 4",
            },
            {
                "id": 2,
                "name": "Quận 5",
            },
            {
                "id": 3,
                "name": "Quận 6",
            },
            
        ]
        var type = [
            {
                "id": 1,
                "name": "2D"
            },
            {
                "id": 2,
                "name": "3D"
            },
            {
                "id": 3,
                "name": "4DX"
            },
        ]
        res.render('admin/manager/cinema', {theaters: theaters, type: type});
    };

    getData(req, res){
        var data = [
    		{
				"id": 1,
				"name": "cinema Quận 8",
				"theater": "Quận 8",
                "type": "2D",
                "hor": "20",
                "ver": "30"
			},
			{
				"id": 2,
				"name": "cinema Quận 3",
				"theater": "Quận 3",
                "type": "3D",
                "hor": "70",
                "ver": "30"
			},
			{
				"id": 1,
				"name": "cinema Quận 1",
				"theater": "Quận 1",
                "type": "4D",
                "hor": "20",
                "ver": "50"
			},
    	];
        res.status(200).json(data);
    }

    delete(req,res){
        var id = req.params.id;
        console.log(id);
        res.redirect('/admin/');
    }

    add(req,res){
        var body = req.body;
        console.log(body);
        res.redirect('/admin/');
    }
}

module.exports = new CinemaController