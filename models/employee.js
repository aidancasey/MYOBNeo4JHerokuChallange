var csv = require('csv');
var neo4j = require('neo4j');
var util = require('../common/utils');

var db = new neo4j.GraphDatabase(util.ConnectionString());

var INDEX_NAME = 'employees';
var INDEX_KEY = 'key';
var INDEX_VAL = 'employee';

var Employee = module.exports = function Employee(_node) {
    this._node = _node;
}

Employee.LoadFromFile = function()
{
    csv().fromPath(__dirname+ '../../csv_data/employee.csv', { columns: true, trim: true })
        .on('data', loadEmployee)
        .on('end', handleSuccess)
        .on('error', handleLoadError);
}

function loadEmployee(data, index) {
    var item ={ id : data.Id,
            ReportTo : data.ReportTo,
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
            Income : data.Income
        }

    console.log(data);
    util.removeNullOrEmptyPropertiesIn(item);
    console.log(JSON.stringify(item));
    Employee.create(item, handleCreated);
}

function handleSuccess(count) {
    console.log('Number of Employees created: ' + count);
}

function handleLoadError(error) {
    console.log(error.message);
}

function handleCreated(error, data) {
    if (error) console.log(error.message);
    console.log('Created: ' + data);
}


// creates the user and persists (saves) it to the db, incl. indexing it:
Employee.create = function (data, callback) {
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




