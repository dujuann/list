import $ from 'jquery';
import "./style.css";

class TTIRank {
    constructor(option) {
        this.listDiv = document.getElementById(option.listId);
        this.initialWidth=200;
        this.cityName=option.cityName;
        this.listDiv.style.width=this.initialWidth+'px';
        this.containerWidth=this.listDiv.getAttribute("width");
        this.width=this.containerWidth.substring(0,this.containerWidth.length-2);
        this.city=option.cityName;
        this.count=0;
        this.data={};
        this.init();
        this.updateTime();
        this.updateClimate();
    }
    init(){
       let content=document.createElement('div');
       content.setAttribute('class','climate-content');
       let time=document.createElement('div');
       time.setAttribute('class','time');
       let nowtime=document.createElement('div');
       nowtime.innerHTML='12:00';
       let nowdate=document.createElement('div');
       nowdate.innerHTML='2018年6月01日';
       let climate=document.createElement('div');
       climate.setAttribute('class','climate');
       let img=document.createElement('img');
       img.setAttribute('src','./img/climate/100.png');
       let cli=document.createElement('div');
       cli.setAttribute('class','cli');
       let nowtemp=document.createElement('div');
       nowtemp.innerHTML="30º";
       let nowphen=document.createElement('div');
       nowphen.innerHTML="晴";
       cli.appendChild(nowtemp);
       cli.appendChild(nowphen);
       time.appendChild(nowtime);
       time.appendChild(nowdate);
       climate.appendChild(img);
       climate.appendChild(cli);
       content.appendChild(time);
       content.appendChild(climate);
       this.listDiv.appendChild(content);
       this.listDiv.style["transform-origin"]= "0 0";
       this.listDiv.style.transform = 'scale(' + this.width/this.initialWidth + ')'; 
    }
    updateTime(){
      let myDate = new Date();
      let nowTime =myDate.getHours() + ':' + ('0' + myDate.getMinutes()).slice(-2);
      let nowDate =myDate.getFullYear() +'年' +(myDate.getMonth() + 1) + '月' + myDate.getDate() +'日';
      $('.climate-content').find('.time').find('div').eq(0).text(nowTime);
      $('.climate-content').find('.time').find('div').eq(1).text(nowDate);
      setTimeout(()=>{
         this.updateTime();
      },1000);
    }
    updateClimate(){
      let data1=fetch('https://free-api.heweather.com/s6/weather/now?key=35215b50963846a2890c6d138b6b94fc&location='+this.cityName)
      .then(response=>{
        if(response.ok) return response.json();
      })
      .then(data=>{  
        let nowtemp=data.HeWeather6[0].now.tmp+'º';
        let nowphen=data.HeWeather6[0].now.cond_txt;
        let nowcon=data.HeWeather6[0].now.cond_code;
        $('.climate-content').find('.climate').find('.cli').find('div').eq(0).text(nowtemp);
        $('.climate-content').find('.climate').find('.cli').find('div').eq(1).text(nowphen);
        $('.climate-content').find('.climate').find('img').attr('src','./img/climate/'+nowcon+'.png');
      })
      setTimeout(()=>{
         this.updateClimate();
      },300000);
    }
}

export default TTIRank