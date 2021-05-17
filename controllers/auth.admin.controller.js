const express = require('express');
const models = require('../db/connection');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const { sendMail } = require('../helpers/mailer');

class AuthController {

    async index(req, res) {
        let mess = req.session.mess;
        delete req.session.mess;
        if(req.session.user){
            if(req.session.user.role == "admin"){
                res.redirect('/admin');
                return;
            }
        }
        res.render('admin/auth/login', { message: mess });
    };

    async login(req, res) {
        var body = req.body;
        let user = await models.User.findOne({
            where: {
                email: body.email,
                role: "admin"
            }
        });
        if (user != null) {
            await bcrypt.compare(body.pass, user.hashedPassword, function (err, result) {
                if (result == true) {
                    req.session.user = user;
                    //req.sessionOptions.maxAge = 1 * 60 * 60 * 1000; // 2 tiếng
                    res.redirect('/admin/');
                    return;
                } else {
                    res.render('admin/auth/login', { message: "Mật Khẩu Không Đúng" });
                    return;
                }
            });
        } else {
            res.render('admin/auth/login', { message: "Tài Khoản Không Tồn Tại" });
            return;
        }
    }

    logout(req, res) {
        req.session.destroy()
        res.redirect('/admin/dang-nhap');
    }

    async forgetPassword(req, res) {
        var body = req.body;
        let user = await models.User.findOne({
            where: {
                email: body.email,
                role: "admin"
            }
        });
        if (!user) {
            res.render('admin/auth/forgetPassword', { mess: "Email Không Chính Xác" })
        } else {
            try {
                const verifyString = randomstring.generate(12);
                const verifyLink = `${req.protocol}://${req.get('host')}/auth/reset-pwd/${user.id
                    }/${verifyString}`;
                user.verifyString = verifyString;
                await user.save();
                await sendMail(user.email,
                    'Quên mật khẩu',
                    `Vui lòng xác thực qua liên kết: ${verifyLink}`,
                    `Vui lòng xác thực qua liên kết: <a href=${verifyLink}>Xác thực</a>`)
            } catch (err) {
                console.error();
            }
        }
        res.render('admin/auth/forgetPassword', {mess: "Vui Lòng Vào Mail Để Xác Nhận"})
    }

    async changePassword(req,res){
        const {oldPassword, newPassword, confirm} = req.body;
        const usercurrent = req.session.user;
        const user = await models.User.findOne({where:{
            email: usercurrent.email
        }});
        await bcrypt.compare(oldPassword, user.hashedPassword, async function (err, result) {
            if (result == true) {
                user.hashedPassword = await bcrypt.hash(newPassword, 10);
                await user.save();
                res.status(200).json({mess: "Thành Công", type: "success"});
                return;
            } else {
                res.status(200).json({mess: "Mật Khẩu Cũ Không Đúng", type: "danger"});
                return;
            }
        });
    }

}

module.exports = new AuthController