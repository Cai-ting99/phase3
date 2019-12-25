//  需求：利用原生HTTP模块开启一个服务器

// 原生模块  不需要安装，直接就可以引用的模块
let http = require("http");

let app =http.createServer((req,res)=>{
    /*
        req: request  请求： 客户端发给服务端
        res: respnse  响应：  服务端发给客户端
    */ 
   res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
   res.write("hello h5-1912");
   res.write("<h2>三阶段</h2>");
   res.end("结束");
})

app.listen(2019,()=>{
    // 监听端口号： 1-65536； 不用写太小，尽量1000以上，因为容易和系统端口号冲突
    console.log("服务器开启成功,http://localhost:2019");
})

