// user.js
// User model logic.

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

// constants:

var INDEX_NAME = 'nodes';
var INDEX_KEY = 'type';
var INDEX_VAL = 'stock';

//var FOLLOWS_REL = 'follows'; not sure

// private constructor:

var Stock = module.exports = function Stock(_node) {
    // all we'll really store is the node; the rest of our properties 
    // will be derivable or just pass-through properties (see below).
    this._node = _node;
}

// pass-through node properties:

function proxyProperty(prop, isData) {
    Object.defineProperty(Stock.prototype, prop, {
        get: function () {
            if (isData) {
                return this._node.data[prop];
            } else {
                return this._node[prop];
            }
        },
        set: function (value) {
            if (isData) {
                this._node.data[prop] = value;
            } else {
                this._node[prop] = value;
            }
        }
    });
}

proxyProperty('id');
proxyProperty('code');

proxyProperty('name', true);
proxyProperty('basevalue', true);

// private instance methods:

// public instance methods:

Stock.prototype.save = function (callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

Stock.prototype.del = function (callback) {
    this._node.del(function (err) { callback(err); }, true);   // true = yes, force it (delete all relationships)
};

Stock.prototype.follow = function (other, callback) {
    this._node.createRelationshipTo(other._node, 'follows', {}, function (err, rel) {
        callback(err);
    });
};

// public functions:

Stock.get = function (id, callback) 
{
    db.getNodeById(id, function (err, node) {
        if (err) 
            return callback(err);
        
        callback(null, new Stock(node));
    });
};

Stock.getAll = function (callback) 
{
    db.getIndexedNodes(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err, nodes) {
        if (err) 
            return callback(null, []);
        
        var stocks = nodes.map(function (node) 
        {
            return new Stock(node);
        });
        
        callback(null, stocks);
    });
};

// creates the stock and persists (saves) it to the db, incl. indexing it:
Stock.create = function (data, callback) 
{
    var node = db.createNode(data);
    var stock = new Stock(node);
    node.save(function (err) 
    {
        if (err) return callback(err);
        node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            if (err) 
                return callback(err);
            callback(null, stock);
        });
    });
};
