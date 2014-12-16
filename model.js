//mongoose 链接
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/AlienServer');


var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//Schema 结构

var Account = new Schema({
	username: String,
	title: String,
	content: String,
	time: Date,
	age: Number});


//model
mongoose.model('Account', Account);
var Account = mongoose.model('Account');

/*
//添加mongoose实例方法
mongooseSchema.methods.findbyusername = function(username, callback) {
	return this.model('mongoose').find({username: username},callback);
}

//添加mongoose 静态方法

mongooseSchema.statics.findebytitle = function(title, callback) {
	return this.model("mongoose").find({title:title},callback);
}



//增加记录
var doc = {username : 'entity_demo_username', title : 'entity_demo_title', content : 'entity_demo_content'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('saved OK!');
    }
    // 关闭数据库链接
    db.close();
});

// 增加记录 基于model操作
var doc = {username : 'model_demo_username', title : 'model_demo_title', content : 'model_demo_content'};
mongooseModel.create(doc, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('save ok');
    }
    // 关闭数据库链接
    db.close();
});

// 修改记录
// mongooseModel.update(conditions, update, options, callback);
var conditions = {username : 'model_demo_username'};
var update     = {$set : {age : 27, title : 'model_demo_title_update'}};
var options    = {upsert : true};
mongooseModel.update(conditions, update, options, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('update ok!');
    }
    //关闭数据库链接
    db.close();
});

// 查询
// 基于实例方法的查询
var mongooseEntity = new mongooseModel({});
mongooseEntity.findbyusername('model_demo_username', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});

// 基于静态方法的查询
mongooseModel.findbytitle('emtity_demo_title', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});

// mongoose find
var criteria = {title : 'emtity_demo_title'}; // 查询条件
var fields   = {title : 1, content : 1, time : 1}; // 待返回的字段
var options  = {};
mongooseModel.find(criteria, fields, options, function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});

// 删除记录
var conditions = {username: 'emtity_demo_username'};
mongooseModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('delete ok!');
    }
 
 
    //关闭数据库链接
    db.close();
});

*/


/*
Provider = function(){};

Provider.prototype.save = function(params, callback) {

	var account = new Account({
		username: params['username'],
		title: params['title'],
		content: params['content'],
		time: params['time'],
		age:params['age']
	});

	account.save( function (err) {
        if (err) {
            callback(err)
        }else {
            callback(null);
        }
	});
};

exports.Provider = Provider;
*/

exports.save = function(params, callback) {

    var account = new Account({
        username: params['username'],
        title: params['title'],
        content: params['content'],
        time: params['time'],
        age:params['age']
    });

    account.save( function (err) {
        if (err) {
            callback(err)
        }else {
            callback(null, err);
        }
    });
};




