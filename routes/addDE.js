// Marketing DE, Content Connection Program Smaple
// 01. Get Auth Token
// 02. Upsert Data Extension Table
// 03. List Content Category
// 04. List Content in a Content Category
// 05. Get Content Information(url)

"use strict";

var request = require('request');

// ----------------------------------------------------------------------------------------------------

module.exports.checkapi = function (req, res) {

    var payload = {
        client_id: "59x7z62ygf4iduainplpgtrk",          // client_id of app
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",      // client_id of app
        grant_type: "client_credentials",               // type of servertoserver case
        account_id: "526002292"                         // MID
    };
    var clientServerOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.auth.marketingcloudapis.com/v2/token' ,  //fixed
        body: JSON.stringify(payload),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    function getToken() {

        return new Promise(function(resolve, reject) {
    
            request(clientServerOptions, function (error, response) {
                //console.log("Auth Token Request: ");	
    
                resolve(response);
                //return;
            });
        });
    };
    
    getToken().then(function(response) {
       
        var tmp = JSON.parse(response.body);

        console.log("");
        console.log("Token =====================================================================================================");
        console.log("TOKEN = [ "+tmp.access_token+ " ]");
        console.log("===========================================================================================================");
        console.log("");

        addDE(tmp.access_token);

    });
    
    // 01. Get Auth Token
   

    res.status(200).send('addDE response');
};
// ----------------------------------------------------------------------------------------------------
// Upsert to Data Extension

function addDE(atoken) {
    
    console.log("[ addDE called ]");	

    var payload2 = {
        "keys":{
            "id":"ID102"
        },
        "values":{
                "name":"TEST LEE",
                "msg":"This Is The First Thing",
                "cdate":"2021-10-09T14:32:00Z"
                 }
    }
    
    var DEputOptions = {
        uri: 'https://mcycnrl05rhxlvjpny59rqschtx4.rest.marketingcloudapis.com/hub/v1/dataevents/key:testDEsklee/rows/id:ID102' ,
        body: JSON.stringify(payload2),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + atoken ,
        },
        client_id: "59x7z62ygf4iduainplpgtrk",
        client_secret: "QBs7wrzcjKN3HR5cJZKvjzld",
        grant_type: "client_credentials",
        account_id: "526002292"        
    }

    request(DEputOptions, function (error, response) {
        console.log(error,response.body);

        var tmp = JSON.parse(response.body);
        console.log("");
        console.log("Data Extension Upsert =====================================================================================");
        console.log("UPSERT DE = [ "+response.body+ " ]");
        console.log("===========================================================================================================");

        console.log("");
        //return;
    });

    //res.status(200).send('addDE response');
};