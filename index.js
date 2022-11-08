const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const routes = require('./routes/routes');

const errorController = require('./controllers/error-controller');

const User = require('./models/user');

const app = express();

const ports = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(routes);

app.use(errorController.get404);

app.use(errorController.get500);

User.addDefaultUser();

app.listen(ports, () => console.log(`listining on port ${ports}`));