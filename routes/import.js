var Individual = require('../models/Individual');


exports.importFiles = function(req, res){
    //console.log("to do import all files");
    //res.end();

  var x = Individual
};


// POST /users
exports.createIndividual = function (req, res, next) {

    var data = {Id : 1, title : 'Mr', firstname :'Angie', lastname : 'Fuller', sex: 'F',
        dob :'1995-11-14', tfn : 67804455 };

    Individual.create(data
        , function (err, user) {
        if (err) return next(err);
        console.log("created");
    });
};