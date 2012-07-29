var batchAPI = require('../models/batchImport');

exports.importFiles = function(req, res, next){
    batchAPI.ImportData();
    res.end('done... please wait till Neo4J is fully populated before step 2 as this is an async operation ');
};
exports.addRelationships = function(req, res, next){
    batchAPI.AddRelationships();
    res.end('done');
};
