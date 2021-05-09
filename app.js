const express = require('express');
const app = express();
const route = require('./routers/index');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('auth/login'));

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
