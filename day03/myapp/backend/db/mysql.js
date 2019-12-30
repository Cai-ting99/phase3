// 做mysql查询

const mysql = require("mysql");//  引入第三方模块，数据库

var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    port:3306,
    database:"phase",
    multipleStatements: true
});

function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,data)=>{
            if(err) reject(err);// 如果有错误就返回错误
            resolve(data);// 实参，回调函数把data传回声明体
        })
    })
}

module.exports=query;