'use strict'; 
function createServer(callback) {
    var PORT = 3000;
    var http = require('http');
    var url=require('url');
    var queryString  = require("querystring");
    var datas={};
    var server = http.createServer(function (request, response) {
        var query = url.parse(request.url).query;
        datas = queryString.parse(query);
//		console.log("datas: ");
//		console.log(datas);
		if(datas.cmd != null) {
			callback.exeCmd(datas.cmd, datas.power, datas.temperature, datas.mode);
//			console.log("exeCmd finished");
			response.write(callback.getReply());
//			console.log("getReply finished");
			response.end();
		}        		
    });
    server.listen(PORT);
    console.log("Server runing at port: " + PORT + ".");
    }
module.exports.listenCMD = createServer;