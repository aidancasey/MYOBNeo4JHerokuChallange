var csv = require('csv');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

var INDEX_NAME = 'partners';
var INDEX_KEY = 'key';
var INDEX_VAL = 'partner';

var Partner = module.exports = function Partner(_node) {
    this._node = _node;
}

Partner.LoadFromFile = function()
{
    csv().fromPath(__dirname+ '../../csv_data/partner.csv', { columns: true, trim: true })
        .on('data', loadData)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadData(data, index) {
    var item ={ id : data.Id,

        Title : data.Title,
        FirstName : data.FirstName,
        LastName : data.LastName,
        DOB : data.DOB,
        Mobile : data.Mobile,
        Email : data.Email,
        Twitter : data.Twitter,
        AddressLine1 : data.AddressLine1,
        AddressLine2 : data.AddressLine2,
        Postcode : data.Postcode,
        City : data.City,
        State : data.State,
        Income : data.Income,
        Type : data.Type
        }

    console.log(data);
    removeNullOrEmptyPropertiesIn(item);
    console.log(JSON.stringify(item));
    Partner.create(item, handleCreated);
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

function isNullOrEmpty(value) {
    return !value || value.length === 0 || /^\s*$/.test(value);
}
function removeNullOrEmptyPropertiesIn(object)
{  for (var propertyName in object)
{    var propertyValue = object[propertyName];
    if (isNullOrEmpty(propertyValue))
        delete object[propertyName];
}}




