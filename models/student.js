const db = require('../util/database');

module.exports = class User {
    constructor(Student_ID, First_Name, Last_Name, Location,
        English, Maths, Chemistry, Physics, Biology, History, Geography) {
        this.Student_ID = Student_ID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.Location = Location;
        this.English = English;
        this.Maths = Maths;
        this.Chemistry = Chemistry;
        this.Physics = Physics;
        this.Biology = Biology;
        this.History = History;
        this.Geography = Geography;
    }

    static getNoOfPassedStudents(location) {
        if (location === "") return db.execute('SELECT count(*) as noOfPassedStudents FROM students where ((English+Maths+Chemistry+Physics+Biology+History+Geography)/7)>3.5');
        return db.execute('SELECT count(*) as noOfPassedStudents FROM students where ((English+Maths+Chemistry+Physics+Biology+History+Geography)/7)>3.5 and Location=?',[location]);
    }

    static getNoOfFailedStudents(location) {
        if (location === "") return db.execute('SELECT count(*) as noOfFailedStudents FROM students where ((English+Maths+Chemistry+Physics+Biology+History+Geography)/7)<=3.5');
        return db.execute('SELECT count(*) as noOfFailedStudents FROM students where ((English+Maths+Chemistry+Physics+Biology+History+Geography)/7)<=3.5 and Location=?', [location]);
    }

    static getAllDistinctLocations(location) {
        return db.execute('SELECT distinct(Location) as allDistinctLocations FROM students');
    }
};