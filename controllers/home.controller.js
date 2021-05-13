const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');

class HomeController {
    async index(req, res) {
        res.render('content/content');
    }
    
}

module.exports = new HomeController