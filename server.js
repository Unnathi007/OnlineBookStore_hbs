var express=require("express");
var path=require('path');
var mongoose=require("mongoose");
var favicon=require('serve-favicon');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var routes=require('./routes/index');
var expressHbs=require('express-handlebars');
var app=express();
//var users=require('./route/users');
//var authors=require("./authors");
//var books=require("./books");
//var category=require("./category");
//var publisher=require("./publisher");
//var LoginInfo=require("./user");
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'hbs'}));
app.set("view engine",".hbs");
mongoose.connect("mongodb://localhost/OnlineBookStr",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);
//app.use('/users',users);
//app.use(express.static('node_modules'));
//var engines = require('consolidate');
//app.set('views', __dirname + '/views');
//app.engine('html', engines.mustache);
//-------------------------------------------------------------------------------------------------------
app.use(function(req,res,next){
	var err=new Error('Not Found');
	err.status=404;
	next(err);
})
if(app.get('env')==='development'){
	app.use(function(err,req,res,next){
		res.status(err.status || 500);
		res.render('error',{
			message:err.message,
			error:err
		});
	});
}
/*app.listen(5000,function(req,res){
console.log("Server Started");
});*/
//----------------------------------------------------------------------------------------------------
