/*
var mysql = require("mysql");
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"654012",
    database:"node"
});
//dateString:DATE 设置date类型的数据转化为2017/01/27格式
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;*/
var mysql = require("mysql");
var db = mysql.createConnection({
    host:"localhost",
    //port默认为3306，可不写
    port:3306,
    user:"root",
    password:"654012",
    database:"node",
    dateStrings:'DATE'// 设置date类型的数据转化为2017/01/27格式
});
module.exports = db;
