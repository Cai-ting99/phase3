let arr=[1,2,3];

// 拼接数据
let str=arr.map(function(ele){
    return `<li>${ele}</li>`
}).join("");
console.log(str);