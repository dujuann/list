# list
* 一些数据展示的基础组件,如时间天气组件、循环列表、进度条、饼状图等

# 相关Demo
* http://duhoo.cn:3000/BaseComp

# 打开示例程序
    + git clone 'https://github.com/dujuann/list.git'
    + npm install
    + npm run dev
在浏览器打开：http://localhost:8080

# 使用举例
```javascript
import CircleBar from '../src/circleBar';  //引入环形进度条组件
let circle=new CircleBar({   //初始化环形进度条组件
    listId:'circleBar',      //指定传入该组件的元素ID
    centerText:"当前速度",    //指定中心文字内容
    centerValue:12,          //指定中心数据内容
    maxValue:30,             //指定中心数据的最大值
    color:['#4BD2DE',"#4E9AE6"],  //指定进度条渐变的两种颜色
})
setInterval(()=>{
    let option={};
    option.centerValue=Math.floor((30*Math.random()));
    circle.updateData(option);           //更新数据
    },1500)