const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');

class PayController {
    async index(req, res) {
        res.render('content/pay');
    }
}

module.exports = new PayController 
