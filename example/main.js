import AlternateList from '../src/alternateList';
import Climate from '../src/climateAndTime';
import CircleBar from '../src/circleBar';
import AdjPie from '../src/adjPie';
import mapboxgl from 'mapbox-gl';
import config from './config';
import $ from 'jquery';
import './style.css';



//--------------------------mapbox加载地图--------------------------
mapboxgl.accessToken = config.map.token;
const map = window.mapbox = new mapboxgl.Map({
    style: config.map,
    container: 'map',
    ...config.map.start,
});

map.on('load', function() { 
    let building_layers = [
        ['#111423', 15, '0-15 Meters'],
        ['#1E2234', 30, '15-30 Meters'],
        ['#303753', 50, '30-50 Meters'],
        ['#353C5C', 100, '50-100 Meters'],
        ['#4D557B', 200, '100-200 Meters'],
        ['#5D6690', 300, '200-300 Meters'],
        ['#727AA2', 400, '300-400 Meters'],
        ['#848DB9', 500, '400-500 Meters'],
    ]

    building_layers.forEach(function(layer, i) {
        map.addLayer({
            id: 'building_layer-' + i,
            type: 'fill-extrusion',
            'source': 'composite',
            'source-layer': 'building',
            minzoom: 10.0,
            paint: {
                'fill-extrusion-color': layer[0],
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    5, 0,
                    10.0, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    5, 0,
                    15.0, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': 1.0
            },
        })
    })

    building_layers.forEach(function(layer, i) {
        var filters = ['all', ['<=', 'height', layer[1]]]
        if (i !== 0)
            filters.push(['>', 'height', building_layers[i - 1][1]])
        map.setFilter('building_layer-' + i, filters)
    })

    let light={
        anchor: "viewport",
        color: '#ffffff',
        intensity: 0.8,
        position:[
              1,
              0,
              60
        ]
    };
    map.setLight(light); 
});
//---------------------------------------------------------------


//----------------------------循环列表组件--------------------------
let atlist3=new AlternateList({      
    listId:'alternateList',      //指定传入该组件的元素ID
    interval:1500,      //指定列表的循环间隔
    data:[              //指定列表数据
        {
            "road": "东安门大街",
            "path": "从南河沿大街至王府井大街",
            "speed": "12.81"
        },
        {
            "road": "景山西街",
            "path": "从景山后街至景山前街",
            "speed": "9.98"
        },
        {
            "road": "八角西街",
            "path": "从八角北路至石景山路",
            "speed": "6.83"
        },
        {
            "road": "西四北大街",
            "path": "从西四东大街至地安门西大街",
            "speed": "5.44"
        },
        {
            "road": "东三环中路辅路",
            "path": "从广渠路至朝阳门外大街",
            "speed": "3.16"
        }
    ]
})
//----------------------------------------------------------------



//----------------------------时间天气组件-------------------------
let climate=new Climate({
    listId:'climate',        //指定传入该组件的元素ID
    cityName:'上海市'         //指定获取天气的城市
})
//----------------------------------------------------------------


//----------------------------环形进度条组件-------------------------
let circle=new CircleBar({
    listId:'circleBar',      //指定传入该组件的元素ID
    centerText:"当前速度",    //指定中心文字内容
    centerValue:12,          //指定中心数据内容
    maxValue:30,             //指定中心数据的最大值
    color:['#4BD2DE',"#4E9AE6"],  //指定进度条渐变的两种颜色
})
let circle2=new CircleBar({
    listId:'circleBar2',
    centerText:"在线车辆",
    centerValue:500,
    maxValue:1000,
    color:["#F79954","#EA5E45"],
})
setInterval(()=>{
   let option={};
   let option2={};
   option.centerValue=Math.floor((30*Math.random()));
   option2.centerValue=Math.floor((500*Math.random()));
   circle.updateData(option);           //更新数据
   circle2.updateData(option2);
   },1500)
//----------------------------------------------------------------



//----------------------------环形饼状图组件------------------------
let adjPie=new AdjPie({
    listId:'adjPie',          //指定传入该组件的元素ID
    data: [{                  //传入饼状图的数据
        value: 30,          
        category: '静安区',
        color: "#F7EA54",
        inner:0.01,
        outer:1.1,
    }, {
        value: 20,
        category: '黄浦区',
        color: "#4BD2DE",
        inner:0.4,
        outer:1,
    }, {
        value: 19,
        category: '徐汇区',
        color: "#4E9AE6",
        inner:0.4,
        outer:1,
    }, {
        value: 25,
        category: '长宁区',
        color: "#503DB3",
        inner:0.4,
        outer:1,
    }, {
        value: 18,
        category: '普陀区',
        color: "#EA5E45",
        inner:0.4,
        outer:1,
    }, {
        value: 27,
        category: '浦东新区',
        color: "#F79954",
        inner:0.4,
        outer:1,
    },]
})

let adjPie2=new AdjPie({
    listId:'adjPie2',
    centerValue:"35%",
    centerText:"所占比例",
    data: [{
        value: 35,
        category: '浦东南路',
        color: "#503DB3",
    }, {
        value: 43,
        category: '浦明路',
        color: "#4BD2DE",
    }, {
        value: 32,
        category: '淮海路',
        color: "#4567CC",
    }, {
        value: 22,
        category: '吴中路',
        color: "#4E9AE6",
    }, {
        value: 19,
        category: '天山路',
        color: "#4BDEAD",
    }, {
        value: 9,
        category: '南京东路',
        color: "#F7EA54",
    }]
})

setInterval(()=>{
   let option={};
   let colorarr=["#503DB3", "#4BD2DE","#4567CC","#4E9AE6","#4BDEAD","#F7EA54"];
   let data=[];
   let max=0;
   let sum=0;
   let k=0;
   for(let i=0;i<6;i++){
        let item={};
        let value=Math.floor(100*Math.max(Math.random(),0.1));
        sum+=value;
        if(value>max) {
            max=value;
            k=i;
        }
        let color=colorarr[i];
        item.value=value;
        item.color=color;
        data.push(item);
   }
   let centerText=('0'+parseInt(100*max/sum)).slice(-2)+'%';
   option.centerText="所占比例";
   option.centerValue=centerText;
   option.data=data;
   adjPie2.updateData(option);
   adjPie2.changeClass();
   },1500)
//------------------------------------------------------------------

