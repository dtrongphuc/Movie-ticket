const { request } = require('express')
const express = require('express')
const app = express()
const route = require('./routers/index');
//ejs
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(expressLayouts);

route(app);

app.listen(3000)