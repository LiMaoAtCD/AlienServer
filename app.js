var controller = require('./Controller/controller')
var router = require('./router');
var model = require("./model/model");

function start(){
	controller.launchService();
}

start();