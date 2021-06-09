const express = require('express');
const { QueryTypes } = require('sequelize');
const models = require('../db/connection');
class Statistics {

    async theater(req, res) {
        var starttime = req.params.start;
        var endtime = req.params.end;
        var query = `SELECT t.id,t."name", SUM(statisshowtime."ve") as "ve", SUM(statisshowtime."doanhthu") as "doanhthu" 
                     FROM showtimes as s
                     JOIN (
                             SELECT  b."showtimeId" as "showtimeId", count(*) as "ve", sum(t.price) as "doanhthu" from bookings as b
                             JOIN tickets as t
                             on t."bookingId" = b.id
                             GROUP BY b."showtimeId"
                         ) as statisshowtime
                     on s.id = statisshowtime."showtimeId"
                     JOIN cinemas as c
                     on c.id = s."cinemaId"
                     join theaters as t
                     on t.id = c."theaterId"
                     WHERE s."startTime" BETWEEN :start AND :end
                     GROUP by t.id, t."name"
                    `;
        var result = await models.sequelize.query(query,
            {
                replacements: { 
                    start: starttime +' 00:00:00+07',
                    end: endtime +' 00:00:00+07'
                 },
                raw: false,
                type: QueryTypes.SELECT
            }
        );
        res.status(200).json(result);
    };

    async movie(req, res) {
        var starttime = req.params.start;
        var endtime = req.params.end;
        var query = `SELECT m.id,m."name", SUM(statisshowtime."ve") as "ve", SUM(statisshowtime."doanhthu") as "doanhthu" FROM showtimes as s
                    JOIN (
                            SELECT  b."showtimeId" as "showtimeId", count(*) as "ve", sum(t.price) as "doanhthu" from bookings as b
                            JOIN tickets as t
                            on t."bookingId" = b.id
                            GROUP BY b."showtimeId"
                         ) as statisshowtime
                    on s.id = statisshowtime."showtimeId"
                    JOIN movies as m
                    on m.id = s."movieId"
                    WHERE s."startTime" BETWEEN :start AND :end
                    GROUP BY m.id, m."name"
                    `;
        var result = await models.sequelize.query(query,
            {
                replacements: { 
                    start: starttime +' 00:00:00+07',
                    end: endtime +' 00:00:00+07'
                 },
                raw: false,
                type: QueryTypes.SELECT
            }
        );
        res.status(200).json(result);
        
    };
}

module.exports = new Statistics