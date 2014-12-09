var http = require('http');
var url = require('url');
var querystring = require('querystring');


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
				console.log(query.name);
				console.log(query.pwd);

				response.writeHead(200,{"Content-Type":"application/json"});
				// response.write({'result':'success'}.stringify);
				var json  = {"ack":"success"}

				response.write(JSON.stringify(json));
				response.end();

			}else{
				console.log(query.act);

				response.writeHead(404,{"Content-Type":"text/plain"});
				response.write("Not Found");
				response.end();

			};
		} else if (request.method === 'POST') {
			console.log('POST request received.');
			request.setEncoding('utf8');

			var postdata = '';
			request.addListener('data',function(postchunk){
				postdata += postchunk;

				console.log("POST Data is : " + postdata);
			});
			request.addListener('end', function(){
				var objectPostData = querystring.parse(postdata);
				for (var i in objectPostData) {
					console.log("post parameters: " + i + ':' + objectPostData[i])
				}
				response.writeHead(200,{"Content-Type":"application/json"});
				response.write(JSON.stringify({"ack":"postdata"}));
				response.end();
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