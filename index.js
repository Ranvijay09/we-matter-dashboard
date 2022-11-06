const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const authRoutes = require('./routes/auth-routes');

const otherRoutes = require('./routes/other-routes');

const errorController = require('./controllers/error-controller');
const dashboardController = require('./controllers/dashboard-controller');

const User = require('./models/user');
const Student = require('./models/student');

const app = express();

const ports = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(authRoutes);

app.use(otherRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

User.addDefaultUser();

app.listen(ports, () => console.log(`listining on port ${ports}`));