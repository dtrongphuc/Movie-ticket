const express = require('express');
const models = require('../db/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class AuthController {

    async index(req, res) {
        let mess = req.session.mess;
        delete req.session.mess;
        res.render('admin/login',{message: mess});
    };

    async login(req, res){
        var body = req.body;
        let user = await models.User.findOne({
            where:{
                email: body.email,
                role: "admin"
            }
        });
        if(user != null){
            await bcrypt.compare(body.pass, user.hashedPassword, function(err, result) {
                if(result == true){
                    req.session.user = user;
                    //req.sessionOptions.maxAge = 1 * 60 * 60 * 1000; // 2 tiếng
                    res.redirect('/admin/');
                    return;
                }else{
                    res.render('admin/login', {message: "Mật Khẩu Không Đúng"});
                    return;
                }
            });
        }else{
            res.render('admin/login',{message: "Tài Khoản Không Tồn Tại"});
            return;
        }
    }

    logout(req,res){
        req.session.destroy()
        res.redirect('/admin/dang-nhap');
    }
    
}

module.exports = new AuthController