var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');
var uscore = require("underscore");

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'employees';
var INDEX_KEY = 'key';
var INDEX_VAL = 'employee';

var Employee = module.exports = function Employee(_node) {
    this._node = _node;
}
var propertyNames = ["Id","ReportTo","Title","FirstName","LastName","DOB","Mobile","Email"
    ,"Twitter","AddressLine1","AddressLine2","Postcode","City","State","Income"];

util.createProxyProperties(Employee,propertyNames);

Employee.LoadFromFile = function()
{
    csv().fromPath('csv_data/Employee.csv', { columns: true, trim: true })
        .on('data', loadData)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadData(data, index) {
    console.log("load data employees");
    //pick out the properties of interest from each line
    var employee = uscore.pick(data, propertyNames);

    util.removeNullOrEmptyPropertiesIn(employee);
    Employee.create(employee, handleCreated);
}

function handleSuccess(count) {
    console.log("handle success employees");

    console.log('Number of Employees created: ' + count);
}

function handleLoadError(error) {
    console.log("handle error employees");

    console.log(error.message);
}

function handleCreated(error, data) {
    console.log("handle created employees");

    if (error) console.log(error.message);
    console.log('Created: ' + data);
}


// creates the user and persists (saves) it to the db, incl. indexing it:
Employee.create = function (data, callback) {
    console.log("create employee employees");

    var node = db.createNode(data);
    var employee = new Employee(node);
    node.save(function (err) {
        if (err) return callback(err);
        node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            if (err) return callback(err);
            callback(null, employee);
        });
    });
};





