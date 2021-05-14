const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.admin.controller');

router.get('/', controller.index);
router.post('/', controller.login);
router.get('/dang-xuat', controller.logout);
router.get('/quen-mat-khau', function(req,res){
    res.render('admin/auth/forgetPassword', {mess: null})
});
router.post('/quen-mat-khau', controller.forgetPassword);
module.exports = router;