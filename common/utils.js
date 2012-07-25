exports.ConnectionString = function(){
    return process.env.NEO4J_URL || 'http://localhost:7474';
};


function isNullOrEmpty(value) {
    return !value || value.length === 0 || /^\s*$/.test(value);
}
exports.removeNullOrEmptyPropertiesIn =  function(object)
{  for (var propertyName in object)
{    var propertyValue = object[propertyName];
    if (isNullOrEmpty(propertyValue))
        delete object[propertyName];
}}

