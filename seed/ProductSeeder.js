var Product=require('../models/product');
var mongoose=require('mongoose');
const { exists } = require('../models/product');
mongoose.connect("mongodb://localhost/OnlineBookStr",{useNewUrlParser:true,useUnifiedTopology: true});
var products=[
    new Product({
    imagePath:'../public/img/Books.jpg',
    title:'Me',
    description:'Excellent book!!!',
    price:250
    }),
    new Product({
        imagePath:'../public/img/Books.jpg',
        title:'Hello',
        description:'Excellent book!!!',
        price:350
    })
];
var done=0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done==products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}