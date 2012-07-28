var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');
var uscore = require("underscore");

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'businesses';
var INDEX_KEY = 'key';
var INDEX_VAL = 'business';

var Business = module.exports = function Business(_node) {
    this._node = _node;
}
var propertyNames = ["Id" , "ManagedBy" , "Name" , "ACN" , "Phone" , "Website" , "AddressLine1" , "AddressLine2"
    , "Postcode" , "City" , "State" , "Type" , "Reserves"];

util.createProxyProperties(Business,propertyNames);

Business.LoadFromFile = function()
{
    csv().fromPath('csv_data/business.csv', { columns: true, trim: true })
        .on('data', loadData)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadData(data, index) {
    //pick out the properties of interest from each line
    var business = uscore.pick(data, propertyNames);

    util.removeNullOrEmptyPropertiesIn(business);
    Business.create(business, handleCreated);
}

function handleSuccess(count) {
    console.log('Number of Businesses created: ' + count);
}

function handleLoadError(error) {
    console.log(error.message);
}

function handleCreated(error, data) {
    if (error) console.log(error.message);
    console.log('Created: ' + data);
}


// creates the user and persists (saves) it to the db, incl. indexing it:
Business.create = function (data, callback) {
    var node = db.createNode(data);
    var business = new Business(node);
    node.save(function (err) {
        if (err) return callback(err);
        node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            if (err) return callback(err);
            callback(null, business);
        });
    });
};





