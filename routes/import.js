var Individual = require('../models/Individual');
var csvMapper = require('../models/csvMapper');


exports.importFiles = function(req, res){
//TO make this all async
    csvMapper.parseFile();
    res.end('done');

};


exports.createIndividual = function (req, res, next) {

    var data = {Id : 1, title : 'Mr', firstname :'Angie', lastname : 'Fuller', sex: 'F',
        dob :'1995-11-14', tfn : 67804455 };
    Individual.create(data
        , function (err, individual) {
        if (err) return next(err);
        console.log("created");
        res.end('done');
    });
};