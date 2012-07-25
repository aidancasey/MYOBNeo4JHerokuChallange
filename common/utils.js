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
}
};

exports.createProxyProperties = function(object, propertyNames)
{
    propertyNames.forEach(
        function(name)
        {
            proxyProperty(object,name);

        }
    )
};

 function proxyProperty(object, prop, isData) {
    Object.defineProperty(object.prototype, prop, {
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


