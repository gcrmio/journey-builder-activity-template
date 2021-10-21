'use strict';

exports.convert = function (req, res) {
    
    console.log("Convert");	
    
    // Data from the req and put it in an array accessible to the main app.

    console.log(req);
    res.send(200, 'Convert');
};