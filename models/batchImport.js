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
}


function AddRelationships(){

    //TO DO is there a way to check if Neo4J has caught up ?? I guess I could double check the
    // node count to the line count in the csv files///

    //add relationship between nodes

    // the tricky bit here is that the calls to Neo are async ... how do we know all the data has been populated??



    //add "manages" relationship (partner) -[manages]-> (individual)

    //get all partner nodes
    var partnernodes;
    partners.getAll(
                                    function (err, result) {
                                        if (err){
                                            return err;
                                        }
                                        partnernodes = result;
                                        console.log('number partners returned is '+ partners.length);
                                    }
    );


}


exports.AddRelationships = AddRelationships;
exports.ImportData = ImportData;