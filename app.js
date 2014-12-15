var controller = require('./controller')
var router = require('./router');
var model = require("./model");

function start(){
	controller.launchService();
}
start();