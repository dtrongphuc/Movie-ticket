const cinemaRouter = require("./cinema");

function route(app) {
    app.use("/cinema", cinemaRouter);
}

module.exports = route;
