const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class AuthController {

    async index(req, res) {
        
        res.render('admin/manager/cinema', {theaters: theaters});
    };

    
}

module.exports = new AuthController