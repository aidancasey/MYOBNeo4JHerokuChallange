var Individual = require('../models/Individual');
var csvMapper = require('../models/csvMapper');


exports.importFiles = function(req, res, next){
//TO make this all async
    csvMapper.parseFile( function (err, individuals) {
            if (err) return next(err);
            console.log('number of individuals ' +  individuals.length);
            individuals.forEach(function(item){
                        addIndividual(req,res,next,item);
                                })

            res.end('done');
                        }
            );

};

function addIndividual(req, res, next, data) {
    Individual.create(data
        , function (err, individual) {
            if (err) return next(err);
            console.log("individaul added to db");
            res.end('done');
        });
}
