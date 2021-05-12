const express = require('express');
const router = express.Router();

router.use(function (req, resp, next) {
    resp.locals.title = 'Rạp';
    next();
});
router.get('/',function(req,res){
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
});
router.get('/getdata', function(req,res){
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
});
// router.get('/delete/:id', controller.delete);
// router.post('/', controller.add);

module.exports = router;