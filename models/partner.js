var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');
var uscore = require("underscore");

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'partners';
var INDEX_KEY = 'key';
var INDEX_VAL = 'partner';

var Partner = module.exports = function Partner(_node) {
    this._node = _node;
}

var propertyNames = ["Id","Title","FirstName","LastName","DOB","Mobile","Email",
    "Twitter","AddressLine1","AddressLine2","Postcode","City","State","Income","Type"];

Partner.LoadFromFile = function () {
    csv().fromPath(__dirname + '../../csv_data/partner.csv', {
        columns: true,
        trim: true
    }).on('data', loadData).on('end', handleSuccess).on('error', handleLoadError);
}

function loadData(data, index) {
    //pick out the properties of interest from each line
    var partner = uscore.pick(data, propertyNames);

    util.removeNullOrEmptyPropertiesIn(partner);
    Partner.create(partner, handleCreated);
}

function handleSuccess(count) {
    console.log('Number of Partners created: ' + count);
}

function handleLoadError(error) {
    console.log(error.message);
}

function handleCreated(error, data) {
    if (error) console.log(error.message);
    console.log('Created: ' + data);
}


// creates the user and persists (saves) it to the db, incl. indexing it:
Partner.create = function (data, callback) {
    var node = db.createNode(data);
    var partner = new Partner(node);
    node.save(function (err) {
        if (err) return callback(err);
        node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            if (err) return callback(err);
            callback(null, partner);
        });
    });
};

Partner.getAll = function (callback) {
    db.getIndexedNodes(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err, nodes) {
        if (err) return callback(err);

        var partners = nodes.map(function (node) {
            return new Partner(node);
        });

        callback(null, partners);
    });
};