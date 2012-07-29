var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');
var uscore = require("underscore");

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'individuals';
var INDEX_KEY = 'key';
var INDEX_VAL = 'individual';

var Individual = module.exports = function User(_node) {
    this._node = _node;
}

var propertyNames = ["Id","ManagedBy","Title","FirstName","LastName",
    "Gender","DOB","TFN","Mobile","Email","Twitter","Notes","AddressLine1","AddressLine2",
    "Postcode","City","State","ReferralId"];

util.createProxyProperties(Individual,propertyNames);

Individual.LoadFromFile = function()
{
    csv().fromPath('csv_data/Individual.csv', { columns: true, trim: true })
        .on('data', loadIndividual)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadIndividual(data, index) {

    //pick out the properties of interest from each line
    var individual = uscore.pick(data, propertyNames);

    util.removeNullOrEmptyPropertiesIn(individual);
    Individual.create(individual, handleCreated);
}
function handleSuccess(count) {
    console.log('Number of individuals created: ' + count);
}

function handleLoadError(error) {
    console.log(error.message);
}

function handleCreated(error, data) {
    if (error) console.log(error.message);
    console.log('Created: ' + data);
}

// create the node and persists (saves) it to the db, incl. indexing it:
Individual.create = function (data, callback) {
console.log('calling Neo4J....')
    var node = db.createNode(data);
    var individual = new Individual(node);
    node.save(function (err) {
        if (err) return callback(err);
        node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            if (err) return callback(err);
            callback(null, individual);
        });
    });
};

Individual.getAll = function (callback) {
    db.getIndexedNodes(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err, nodes) {
        if (err) return callback(null, []);
        var individuals = nodes.map(function (node) {
            return new Individual(node);
        });
        callback(null, individuals);
    });
};
