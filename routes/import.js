var individuals = require('../models/Individual');
var employees = require('../models/Employee');
var partners = require('../models/partner');



//TO DO move this logic from the route to a specific model - e.g. batchimportmodel...

exports.importFiles = function(req, res, next){
  //  individuals.LoadFromFile();
  //  console.log("individuals added to db");

  //  employees.LoadFromFile();
  //  console.log("employees added db");

    partners.LoadFromFile();
    console.log("partners added db");


    res.end('done');
};

