const express = require('express');
const app = express();
const route = require('./routers/index');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
