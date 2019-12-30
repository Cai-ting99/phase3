// 借助第三方模块  express  快速搭建静态资源服务器

//  1  引入模块
const express = require("express");

const allRouter=require("./backend/routers/index");
// 调用方法生成对象
const app = express();

// 借用中间件开启静态资源服务器

app.use(express.static("./"));//以当前目录下作为站点根目录
app.use(allRouter);

app.listen(2019,()=>{
    console.log("服务器开启成功，请访问端口2019");
})
