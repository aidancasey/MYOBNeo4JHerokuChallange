var individuals = require('../models/individual');
var employees = require('../models/employee');
var partners = require('../models/partner');
var businesses = require('../models/business');

function ImportData(){

    //add nodes

    partners.LoadFromFile();
    console.log("partners added db");

    individuals.LoadFromFile();
    console.log("individuals added to db");

    employees.LoadFromFile();
    console.log("employees added db");

    businesses.LoadFromFile();
    console.log("businesses added db");



    //add relationship between nodes
    
    //add manages relationship (partner) -[manages]-> (individual)

}
exports.ImportData = ImportData;