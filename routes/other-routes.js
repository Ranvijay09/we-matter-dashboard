const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const dashboardController = require('../controllers/dashboard-controller');

router.get('/dashboard', dashboardController.fetchAllDataToDashboard);

router.get('/getAllData', dashboardController.fetchAllData);

module.exports = router;