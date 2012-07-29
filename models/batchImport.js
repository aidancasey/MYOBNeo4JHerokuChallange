var individuals = require('../models/individual');
var employees = require('../models/employee');
var partners = require('../models/partner');
var businesses = require('../models/business');

function ImportData() {

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


function AddRelationships() {

    //TO DO is there a way to check if Neo4J has caught up ?? I guess I could double check the
    // node count to the line count in the csv files///

    //add "manages" relationship (partner) -[manages]-> (individual)

    //get all partner nodes
    var partnernodes;
    partners.getAll(

        function (err, result) {
            if (err) {
                return err;
            }
            partnernodes = result;
            console.log('number partners returned is ' + partnernodes.length);
        });
    var individualnodes;
    individuals.getAll(

        function (err, result) {
            if (err) {
                return err;
            }
            individualnodes = result;
            console.log('number individuals returned is ' + individualnodes.length);

//loop thru all individuals, find the partner and add the manages relationship

            individualnodes.forEach(
                function(ind)
                {
                    //ok here how to access the properties but its dog ugly !
                    //maybe adding prototyping properties would be nice..
                    var partnerid = ind._node._data.data.ManagedBy;
                    console.log('managed by :' + partnerid);
                }
            )


        });


}

exports.AddRelationships = AddRelationships;
exports.ImportData = ImportData;