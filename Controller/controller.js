var http = require('http');
var url = require('url');
var querystring = require('querystring');
var model = require('../model/model');

var port = 3000;

function launchService(){

	http.createServer( function(request,response){
		if (request.method === 'GET') {

			var reqUrl = decodeURIComponent(request.url).replace('+','%2b'),
			acceptEncoding = request.headers['accept-encoding']||'',
			parse = url.parse(reqUrl,true),
			path = parse.pathname;
			query = parse.query;

			if (query.act === 'login') {
				model.save(
					{
					username: query.name,
					pwd:query.pwd,
					time: Date.now()
					},
					function(error){
						if (!error) {
							console.log('save success');
							response.writeHead(200,{"Content-Type":"application/json"});
							var responseJson = {"ack":"success"};
							response.write(JSON.stringify(responseJson));
							response.end();
						} else {
							console.log(error);
							response.writeHead(404,{"Content-Type":"application/json"});
							response.write(JSON.stringify({"ack":"failed"}));
							response.end();
						};
					}
				);
			} else if(query.act == 'query'){
				model.queryusername(query.name,function(error,result){
					if (!error) {
						response.writeHead(200,{"Content-Type":"application/json"});
						// var responseJson = {"ack":result};
						console.log(result);
						var responseJson = {"ack":result[0].pwd};
						response.write(JSON.stringify(responseJson));

						response.end();
						console.log("response sucess")
					}else{
						// console.log(result);
						console.log(error);

						response.writeHead(404,{"Content-Type":"application/json"});
						response.write(JSON.stringify({"ack":"error"}));
						response.end();
					}
				});
			} 
			else {
				console.log(query.act);

				response.writeHead(404,{"Content-Type":"text/plain"});
				response.write("Not Found");
				response.end();

			};
		} else if (request.method === 'POST') {

			request.setEncoding('utf8');

			var postdata = '';
			request.addListener('data',function(postchunk){
				postdata += postchunk;

				console.log("POST Data is : " + postdata);
			});
			request.addListener('end', function(){
				var objectPostData = querystring.parse(postdata);
				for (var i in objectPostData) {

					if (i === 'act' && objectPostData[i] == 'register') {
						console.log("someone register");
						if (objectPostData['username'] != undefined && 
							objectPostData['pwd'] != undefined) {

							model.saveAsNewAccount({
								username:objectPostData['username'],
								pwd:objectPostData['pwd']
							},function (err, result){
								if (err) {
									console.log(err);
									response.writeHead(500,{"Content-Type":"application/json"});
									response.write(JSON.stringify({"ack":"save error"}));
									response.end();
								} else{
									console.log("result:"+ result);
									response.writeHead(200,{"Content-Type":"application/json"});
									response.write(JSON.stringify({"ack":result}));
									response.end();
								}

							});
						};

					};

				}
			});

		} else {

			response.writeHead(500,{'Content-Type':'text/plain'});
			response.write('request method will support later');
			response.end();
		};

	}).listen(port);

console.log('app is launching...');

}

exports.launchService = launchService;