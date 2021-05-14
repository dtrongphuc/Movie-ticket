const { route } = require('./cinema');

const express = require('express'),
    router = express.Router(),
    theatersRouter = require('./theaters'),
    cinemaRouter = require('./cinema'),
    showtimeRouter = require('./showtime'),
    statisticeRouter = require('./statistics'),
    movieRouter = require('./movie');


//apply template

router.use('/', cinemaRouter);
router.use('/suat-phim', showtimeRouter);
router.use('/cum-rap', theatersRouter);
router.use('/thong-ke', statisticeRouter);
router.use('/phim', movieRouter);

module.exports = router;