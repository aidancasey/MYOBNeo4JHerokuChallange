var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

function deleteAllNodes(callback){
    var cypherQuery = "START n=node(*) MATCH n-[r?]-() WHERE ID(n) <> 0 DELETE n,r";
    db.query(cypherQuery, null, function (err, results) {
            if (err) {
                return callback(err);}

        }
    )
}
exports.deleteAllNodes = deleteAllNodes;