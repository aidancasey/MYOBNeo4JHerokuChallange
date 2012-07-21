var db = require('../models/admin');

exports.deleteAll = function(req, res,next){
                       console.log("reguest for deleteAllNodes");
                        db.deleteAllNodes(function (err, result) {
                                            if (err){
                                                return next(err);

                                            }
                                            console.log("nodes deleted");
                                            res.end('TO DO change to JSON success response');
                            }
                                           );
};


