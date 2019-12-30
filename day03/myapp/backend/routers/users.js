//  子路由
const express = require("express");
const query = require("../db/mysql");// 自定义一个模块
const Router = express.Router();//路由设置

const bodyParser = require("body-parser");//第三方中间件，在express里面使用

// 提取body请求体数据用到的中间件，需要配置参数才能使用
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*
    用户管理：
        * 验证用户名是否存在 （已存在就不给注册） （√）
        *注册   （数据库里未存在可以给注册）  （√）
        *登录   （查询数据库里是否有用户名和密码）  （√）
        *修改密码   
        *删除XX用户
        *清空用户
        *数据渲染  分页
*/
//  功能： 查询所有的用户信息
Router.get("/all", async (req, res) => {
    // page:第几页    数量  num
    let { page, num } = req.query;
    page = page || 1; // 设置默认值
    num = num || 5;  // 设置默认值
    let index = (page - 1) * num;  // 页码数量
    let str = `SELECT * FROM user LIMIT ${index},${num}`;
    let data = await query(str);
    let sql2 = `SELECT * FROM user`;
    let data2 = await query(sql2);

    //  请求成功期望返回的数据
    let result = {};
    if (data.length) {
        // 成功返回
        let pages = Math.ceil(data2.length / num);
        result = {
            type: 1,
            msg: "success",
            page,
            num,
            pages,
            datalist: data
        }
    } else {
        // 失败返回
        result = {
            type: 0,
            msg: "fail",
            datalist: [],
        }
    }
    res.send(result);
});

// 验证用户名是否存在
Router.get("/chechname", async (req, res) => {
    let { name } = req.query;
    if (name) {
        let sql = `SELECT * FROM user WHERE name='${name}'`;
        let data = await query(sql);
        let result = {};
        if (data.length) {
            //  数据库里已有，不给注册
            result = {
                type: 0,
                msg: "不能注册"
            }
        } else {
            //    数据库里没有，可以注册
            result = {
                type: 1,
                msg: "用户未存在，可以注册"
            }
        }
        res.send(result);//无论成功失败都需要响应给客户
    } else {
        res.send(result);
    }

})

//  注册功能
Router.post("/reg", urlencodedParser, async (req, res) => {
    let { name, password } = req.body;
    if (name && password) {
        let sql = `INSERT INTO user (name,psw) VALUES ('${name}','${password}')`;
        let data = await query(sql);
        let result = {};
        if (data.affectedRows) { //affectedRows在哪里弄来的
            // 插入数据成功，并返回结果
            result = {
                type: 1,
                msg: '注册成功'
            }
        } else {
            // 数据失败，并返回结果
            result = {
                type: 0,
                msg: '注册失败'
            }
        }
        res.send(result)
    } else {
        res.send("请填写全部数据")
    }
})

// 登录功能
Router.post("/login", urlencodedParser, async (req, res) => {
    let { name, password } = req.body;
    if (name && password) {
        let sql = `SELECT * FROM user WHERE name='${name}' AND psw='${password}'`;
        let data = await query(sql);
        console.log(data.length);
        let result = {};
        if (data.length == 1) { //affectedRows在哪里弄来的
            // 插入数据成功，并返回结果
            result = {
                type: 1,
                msg: '登录成功'
            }
        } else {
            // 插入数据失败，并返回结果
            result = {
                type: 0,
                msg: '登录失败'
            }
        }
        res.send(result)
    } else {
        res.send("请填写全部数据")
    }
})

// 删除功能
Router.delete("/del/:id", async (req, res) => {
    let { id } = req.params;
    if (id) {
        let dele = `DELETE FROM user WHERE id='${id}'`;
        let data = await query(dele);
        let result = {};
        if (data.affectedRows) {
            result = {
                type: 1,
                msg: "删除成功"
            }
        } else {
            result = {
                type: 0,
                msg: "删除失败"
            }
        }
        res.send(result)
    } else {

    }
})

//  修改保存
Router.put("/put", urlencodedParser, async (req, res) => {
    let { uid, name } = req.body;
    // let sql = `UPDATE user SET name='${name}' WHERE id='${uid}' `;
    let sql = `UPDATE user SET name='${name}' WHERE id=${uid}`;
    let data = await query(sql);
    let result = {};
    if (data.affectedRows) {
        result = {
            type: 1,
            msg: "修改成功"
        }
    }else{
        result = {
            type: 0,
            msg: "修改失败"
        }
    }
})




module.exports = Router;

/*
let sql2 = `UPDATE shwo SET show_name = '${show_name}',show_kucun='${show_kucun}',show_price='${show_price}' WHERE show_id = '${show_id}' ` //更新数据

let slq1 = `select * from shwo where show_id=${show_id} `;//查询数据

let data = await Mysql(sql);

let sql = `delete from users where  name='${name}'`

let sql = `INSERT INTO shwo (show_id,show_name,show_kucun,show_price) VALUES( '${show_id}','${show_name}',${show_kucun}, ${show_price})`;


*/
