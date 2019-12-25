//  借助第三方模块   express   快速搭建静态资源服务器

// 引入模块
const express =require("express");
// 引入路由文件
const allRouter = require("./routers");

// 调用生成对象
const app = express();

//  借助中间件开启静态资源服务器
app.use(express.static("../"));//以当前目录为站点根目录
app.use(allRouter);//使用allRouter中间件，实现路由效果

app.listen(2019,()=>{
    console.log("服务器开启成功，请访问2019端口");
})
