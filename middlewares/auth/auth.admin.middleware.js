const models = require('../../db/connection');

module.exports = async function auth(req, res, next) {
    const user = req.session.user;
    res.locals.currrentUser = null;
    if (user) {
        if (user.role != 'admin') {
            req.session.mess = "Tài Khoản Không Có Quyền Truy Cập";
            res.redirect('/admin/dang-nhap');
            return;
        }
        res.locals.currrentUser = user;
    } else {
        req.session.mess = "Cần Đăng Nhập Để Tiếp Tục";
        res.redirect('/admin/dang-nhap');
        return;
    }
    next();
};