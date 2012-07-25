var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'individuals';
var INDEX_KEY = 'key';
var INDEX_VAL = 'individual';

var Individual = module.exports = function User(_node) {
    this._node = _node;
}

Individual.LoadFromFile = function()
{
    csv().fromPath(__dirname+ '../../csv_data/individual.csv', { columns: true, trim: true })
        .on('data', loadIndividual)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadIndividual(data, index) {
    var item ={ id : data.Id,
        ManagedBy : data.ManagedBy,
        Title : data.Title,
        FirstName : data.FirstName,
        LastName : data.LastName,
        Gender : data.Gender,
        DOB : data.DOB,
        TFN : data.TFN,
        Mobile : data.Mobile,
        Email : data.Email,
        Twitter : data.Twitter,
        AddressLine1 : data.AddressLine1,
        AddressLine2 : data.AddressLine2,
        Postcode : data.Postcode,
        City : data.City,
        State : data.State,
        ReferralId : data.ReferralId
        }
    util.removeNullOrEmptyPropertiesIn(item);
    Individual.create(item, handleCreated);
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


// creates the user and persists (saves) it to the db, incl. indexing it:
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




