var individuals = require('../models/individual');
var employees = require('../models/employee');
var partners = require('../models/partner');
var businesses = require('../models/business');



//TO DO move this logic from the route to a specific model - e.g. batchimportmodel...

exports.importFiles = function(req, res, next){
//    individuals.LoadFromFile();
//    console.log("individuals added to db");

//    employees.LoadFromFile();
//    console.log("employees added db");

//    partners.LoadFromFile();
//    console.log("partners added db");

    businesses.LoadFromFile();
    console.log("businesses added db");

    res.end('done');
};

