var express = require('express');
var mysql=require("./mysql.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('router');
});
//传递数据
router.get('/fetch', function(req, res) {
    mysql.query("select * from cate",function(err,result){
        res.send(JSON.stringify(result));
    })
});
//传递数据
router.get('/cate', function(req, res) {
    mysql.query("select * from category",function(err,result){
        var tree=cate(result,0);
        res.send(tree)
    })

});
function cate(result,pid) {
    var arr=[];
    for(var i in result){
        var obj={};
        if(result[i].pid==pid){
            obj.title=result[i].cname;
            obj.flag=true;
            obj.url=result[i].cid.toString();
            obj.child=cate(result,result[i].cid);
            arr.push(obj)
        }
    }
    return arr;
}
router.get('/fetch/:id', function(req, res) {
    mysql.query("select * from list where cid="+req.params.id,function(err,result){
        res.send(JSON.stringify(result));
    })

});
module.exports = router;