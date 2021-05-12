const express = require('express');
class ShowtimeController {

    index(req, res) {
        var movie= [
            {
                "id": 1,
                "name": "Nghìn Lẽ Một Đêm"
            },
            {
                "id": 2,
                "name": "Đêm Trăng Tàn"
            },
            {
                "id": 3,
                "name": "Bố Già"
            },
            {
                "id": 4,
                "name": "Lật mặt"
            },
        ];
        var cinema = [
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
        res.render('admin/manager/showtime',{movie: movie, cinema: cinema});
    };

    getData(req, res){
        var data = [
    		{   
                "movieid": 1,
				"movie": "Nghìn Lẽ Một Đêm",
                "cinemaid": 2,
				"cinema": "Quận 8",
                "starttime": "05/12/2021",
                "endtime": "30/12/2021",
                "price": 30000
			},
			{
                "movieid": 2,
				"movie": "Đêm Trăng Tàn",
                "cinemaid": 3,
				"cinema": "Quận 4",
                "starttime": "02/12/2021",
                "endtime": "30/12/2021",
                "price": 35000
			},
            {
                "movieid": 3,
				"movie": "Bố Già",
                "cinemaid": 1,
				"cinema": "Quận 7",
                "starttime": "06/12/2021",
                "endtime": "13/1/2022",
                "price": 15000
			},
    	];
        res.status(200).json(data);
    }

    delete(req,res){
        var movie = req.params.movie;
        var cinema = req.params.cinema;
        console.log("movie: "+ movie);
        console.log("cinema: "+cinema);
        res.redirect('/admin/suat-phim')
    }

    add(req,res){
        var body = req.body;
        console.log(body);
        res.redirect('/admin/suat-phim')
    }
}

module.exports = new ShowtimeController