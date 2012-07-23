
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

var INDEX_NAME = 'individuals';
var INDEX_KEY = 'key';
var INDEX_VAL = 'individual';

var Individual = module.exports = function User(_node) {
    this._node = _node;
}

// creates the user and persists (saves) it to the db, incl. indexing it:
Individual.create = function (data, callback) {

    // Neo4J doesn't support null values - remove any properties with nulls
    removeNullOrEmptyPropertiesIn(data);
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


function isNullOrEmpty(value) {
    return !value || value.length === 0 || /^\s*$/.test(value);
}
function removeNullOrEmptyPropertiesIn(object)
{  for (var propertyName in object)
{    var propertyValue = object[propertyName];
    if (isNullOrEmpty(propertyValue))
        delete object[propertyName];
}}

//CYPHER QUERY TO CREATE NODE
//Individual
//some of the properties in the file
//Id ,Title , FirstName , LastName , Gender , DOB , TFN
//1  ,  Mr , Angie , Fuller , F, 1995-11-14, 67804455

//CYPHER QUERY TO SEARCH THE INDEX
//START n=node:individuals(type = "user")
//RETURN n



