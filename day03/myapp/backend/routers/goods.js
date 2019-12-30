//  子路由
const express = require("express");
const query = require("../db/mysql");// 自定义一个模块
const Router = express.Router();//路由

const bodyParser = require("body-parser");//第三方中间件，在express里面使用

// 提取body请求体数据用到的中间件，需要配置参数才能使用
var urlencodedParser = bodyParser.urlencoded({ extended: false });
/*
    商品管理：
        * 数据渲染
        * 添加商品
        * 删除商品
        * 修改信息
        * 分页功能
*/

// 查询有多少数据，然后进行数据和 页码渲染
Router.get("/rend", async (req, res) => {
    let { page, num } = req.query;
    page = page || 1;
    num = num || 5;
    let index = (page - 1) * num;
    //    console.log(index);
    let str = `SELECT * FROM goods LIMIT ${index},${num}`
    let data = await query(str);
    let sql2 = `SELECT * FROM goods`;
    let data2 = await query(sql2);

    // 请求成功期望返回的数据
    let result = {};
    if (data.length) {
        // 成功后返回的数据
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
})

// 删除功能
Router.delete("/del/:id", async (req, res) => {
    let { id } = req.params;
    console.log(id);
    
    if (id) {
        let dele = `DELETE FROM goods WHERE good_id='${id}'`;
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
        res.send("删除失败")
    }
})





module.exports = Router;