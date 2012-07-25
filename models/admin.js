var neo4j = require('neo4j');
var util = require('../common/utils');

var db = new neo4j.GraphDatabase(util.ConnectionString());

function deleteAllNodes(callback){
    var cypherQuery = "START n=node(*) MATCH n-[r?]-() WHERE ID(n) <> 0 DELETE n,r";
    db.query(cypherQuery, null, function (err, results) {
            if (err) {
                return callback(err);}
        callback(null);
        }
    )
}
exports.deleteAllNodes = deleteAllNodes;