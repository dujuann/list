import $ from 'jquery';
import "./style.css";

class TTIRank {
    constructor(option) {
        this.id=option.listId;
        this.listDiv = document.getElementById(option.listId);
        this.initialWidth=300;
        this.listDiv.style.width=this.initialWidth+'px';
        this.containerWidth=this.listDiv.getAttribute("width");
        this.width=this.containerWidth.substring(0,this.containerWidth.length-2);
        this.itemCount=option.data.length;
        this.count=0;
        this.interval=option.interval;
        this.data=option.data;
        this.init();
        this.updateData(this.data);
        this.changeClass();  
    }
    init(){
       let content=document.createElement('div');
       content.setAttribute('class','alter-content');
       for(let i=1;i<=this.itemCount;i++){
           let item=document.createElement('div');
           item.setAttribute('class','list-item');
           let number=document.createElement('div');
           number.setAttribute('class','number');
           let num=("0"+i).slice(-2);
           number.innerHTML=num;
           let road=document.createElement('div');
           road.setAttribute('class','road');
           let path=document.createElement('div');
           path.setAttribute('class','path');
           let speed=document.createElement('div');
           speed.setAttribute('class','speed');
           let speedvalue=document.createElement('div');
           speedvalue.innerHTML="24.52";
           speedvalue.setAttribute('class','speedvalue');
           let speedunit=document.createElement('div');
           speedunit.innerHTML="km/h";
           speedunit.setAttribute('class','speedunit');
           let speedtext=document.createElement('div');
           speedtext.setAttribute('class','speedtext');
           speedtext.innerHTML="运行速度:";
           let svgElem=this.creatSvg();
           speed.appendChild(speedvalue);
           speed.appendChild(speedunit);
           item.appendChild(number);
           item.appendChild(road);
           item.appendChild(path);
           item.appendChild(speedtext);
           item.appendChild(speed);
           item.appendChild(svgElem);
           content.appendChild(item);    
       }
      this.listDiv.appendChild(content);
      this.listDiv.style["transform-origin"]= "0 0";
      this.listDiv.style.transform = 'scale(' + this.width/this.initialWidth + ')'; 
    }
     creatSvg() {
        let xmlns = "http://www.w3.org/2000/svg";
        let boxWidth = this.initialWidth-12;
        let boxHeight = 4;

        let svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS (null, "width", boxWidth);
        svgElem.setAttributeNS (null, "height", boxHeight);
        svgElem.style.display = "block";

        let defs=document.createElementNS (xmlns, "defs");
        let linearGradient=document.createElementNS (xmlns, "linearGradient");
        linearGradient.setAttributeNS (null, 'id', 'color-gradient');
        linearGradient.setAttributeNS (null, 'x1', '0');
        linearGradient.setAttributeNS (null, 'y1', '0');
        linearGradient.setAttributeNS (null, 'x2', '100%');
        linearGradient.setAttributeNS (null, 'y2', '0');
        linearGradient.setAttributeNS (null, 'gradientUnits', 'userSpaceOnUse');
        let stop1=document.createElementNS (xmlns, "stop");
        stop1.setAttributeNS (null, 'offset', '0%');
        stop1.setAttributeNS (null, 'style', 'stop-color: #4E9AE6');
        let stop2=document.createElementNS (xmlns, "stop");
        stop2.setAttributeNS (null, 'offset', '100%');
        stop2.setAttributeNS (null, 'style', 'stop-color:#4BD2DE');
        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        defs.appendChild(linearGradient);
        svgElem.appendChild (defs);

        let innerLine = document.createElementNS (xmlns, "line");
        innerLine.setAttributeNS (null, 'x1', '2');
        innerLine.setAttributeNS (null, 'y1', '2');
        innerLine.setAttributeNS (null, 'x2', boxWidth-2);
        innerLine.setAttributeNS (null, 'y2', '2');
        innerLine.setAttributeNS (null, 'stroke-width', '4');
        innerLine.setAttributeNS (null, 'stroke', '#9099AA');
        innerLine.setAttributeNS (null, 'stroke-linecap', 'round');
        svgElem.appendChild (innerLine);

        let outerLine = document.createElementNS (xmlns, "line");
        outerLine.setAttributeNS (null, 'x1', '2');
        outerLine.setAttributeNS (null, 'y1', '2');
        outerLine.setAttributeNS (null, 'x2', boxWidth-2);
        outerLine.setAttributeNS (null, 'y2', '2');
        outerLine.setAttributeNS (null, 'stroke-width', '4');
        outerLine.setAttributeNS (null, 'stroke', "url(#color-gradient)");
        outerLine.setAttributeNS (null, 'stroke-linecap', 'round');
        outerLine.setAttributeNS (null, 'stroke-dasharray', boxWidth);
        outerLine.setAttributeNS (null, 'stroke-dashoffset', '100');
        outerLine.setAttributeNS (null, 'class', 'outerLine');
        svgElem.appendChild (outerLine);

        return svgElem;
    }
    changeClass(){
        this.count=this.count%5;
        $('#'+this.id).find('.alter-content').find('.list-item').removeClass('active');
        $('#'+this.id).find('.alter-content').find('.list-item').eq(this.count).addClass('active');
        this.count++;
        setTimeout(()=>{
           this.changeClass();
        },this.interval)
    }
    updateData(data) {
        let roadlist =$('#'+this.id).find('.alter-content').find('.list-item');
        let count = 0;
        let length=data.length;
        data.map(item => {
            if (count < length) {
                let currentroad = roadlist.eq(count);
                let roadtext = item.road;
                let pathtext = item.path;
                let sptext = item.speed;
                let dashoffset = Math.max( (1 -sptext/15)*(this.initialWidth-12),0);
                currentroad.find('.road').text(roadtext);
                currentroad.find('.path').text(pathtext);
                currentroad.find('.speedvalue').text(sptext);
                currentroad.find('.outerLine').attr('stroke-dashoffset', dashoffset);
                count++;
            }
        })
    }
}

export default TTIRank