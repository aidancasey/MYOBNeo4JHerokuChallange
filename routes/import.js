var individuals = require('../models/Individual');
var employees = require('../models/Employee');


exports.importFiles = function(req, res, next){
    individuals.LoadFromFile();
    console.log("individuals added to db");

    employees.LoadFromFile();
    console.log("employees added db");
    res.end('done');
};

