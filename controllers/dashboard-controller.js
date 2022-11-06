const { validationResult } = require('express-validator');

const Student = require('../models/student');

exports.fetchAllDataToDashboard = async (req, res, next) => {
    try {
        const [allLocations] = await Student.getAllDistinctLocations();
        var passedStudents = {}, failedStudents = {};
        for (var i = 0; i < allLocations.length; i++) {
            const [noOfPassedStudents] = await Student.getNoOfPassedStudents(allLocations[i].allDistinctLocations);

            passedStudents[allLocations[i].allDistinctLocations] = noOfPassedStudents[0].noOfPassedStudents;

            const [noOfFailedStudents] = await Student.getNoOfFailedStudents(allLocations[i].allDistinctLocations);

            failedStudents[allLocations[i].allDistinctLocations] = noOfFailedStudents[0].noOfFailedStudents;
        }
        const [noOfPassedStudents] = await Student.getNoOfPassedStudents("");
        passedStudents['All'] = noOfPassedStudents[0].noOfPassedStudents;

        const [noOfFailedStudents] = await Student.getNoOfFailedStudents("");
        failedStudents['All'] = noOfFailedStudents[0].noOfFailedStudents;

        res.render('dashboard', { allLocations: allLocations, passedStudents: passedStudents, failedStudents: failedStudents });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.fetchAllData = async (req, res, next) => {
    try {
        const [allLocations] = await Student.getAllDistinctLocations();
        var passedStudents = {}, failedStudents = {};
        for (var i = 0; i < allLocations.length; i++) {
            const [noOfPassedStudents] = await Student.getNoOfPassedStudents(allLocations[i].allDistinctLocations);

            passedStudents[allLocations[i].allDistinctLocations] = noOfPassedStudents[0].noOfPassedStudents;

            const [noOfFailedStudents] = await Student.getNoOfFailedStudents(allLocations[i].allDistinctLocations);

            failedStudents[allLocations[i].allDistinctLocations] = noOfFailedStudents[0].noOfFailedStudents;
        }
        const [noOfPassedStudents] = await Student.getNoOfPassedStudents("");
        passedStudents['All'] = noOfPassedStudents[0].noOfPassedStudents;

        const [noOfFailedStudents] = await Student.getNoOfFailedStudents("");
        failedStudents['All'] = noOfFailedStudents[0].noOfFailedStudents;

        res.send({ allLocations: allLocations, passedStudents: passedStudents, failedStudents: failedStudents });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};