const cinemaRouter = require("./cinema");
const userRouter = require("./user");

function route(app) {
    app.use("/cinema", cinemaRouter);
    app.use("/user", userRouter);
}

module.exports = route;
