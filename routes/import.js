var batchAPI = require('../models/batchImport');

exports.importFiles = function(req, res, next){
    batchAPI.ImportData();
    res.end('done');
};

