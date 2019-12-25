//  需求： 封装方法，导出给别人使用，自定义模块

/*
    原生模块： 绝对路径
    文件模块
    第三方模块：绝对路径
    自定义模块
        导出：
            mudule.exports
            exports
        导入：
            require(相对路径)

*/

let show=()=>{
    let name = "覃";
    console.log(name);
}

let obj={
    name:"老覃",
    age:"18",
    showname(){
        console.log(this.age);  
    }
}

//  导出模块 == 导入模块   exports就是一个对象

exports.show=show;
exports.obj=obj;