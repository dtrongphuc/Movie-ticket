require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db/connection');
const route = require('./routers/index');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.send('index'));

// Test giao diện content
app.get('/view', (req, res) => res.render('content/content'));

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
