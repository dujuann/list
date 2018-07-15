import $ from 'jquery';
import "./style.css";

class TTIRank {
    constructor(option) {
        this.id=option.listId;
        this.listDiv = document.getElementById(option.listId);
        this.initialWidth=100;
        this.cityName=option.cityName;
        this.listDiv.style.width=this.initialWidth+'px';
        this.containerWidth=this.listDiv.getAttribute("width");
        this.width=this.containerWidth.substring(0,this.containerWidth.length-2);
        this.city=option.cityName;
        this.centerText=option.centerText||"";
        this.centerValue=option.centerValue||"";
        this.maxValue=option.maxValue||100;
        this.color=option.color;
        this.count=0;
        this.data={};
        this.init();
        this.updateData(option);
    }
    init(){
       let content=document.createElement('div');
       content.setAttribute('class','circle-content');
       let demons=document.createElement('div');
       let valuespan=document.createElement('span');
       valuespan.innerHTML=this.centerValue;
       let despan=document.createElement('span');
       despan.innerHTML=this.centerText;
       demons.appendChild(valuespan);
       demons.appendChild(despan);
       let svgElem=this.creatSvg();
       content.appendChild(demons);
       content.appendChild(svgElem);
       this.listDiv.appendChild(content);
       this.listDiv.style["transform-origin"]= "0 0";
       this.listDiv.style.transform = 'scale(' + this.width/this.initialWidth + ')'; 
    }
    creatSvg() {
        let xmlns = "http://www.w3.org/2000/svg";
        let boxWidth = this.initialWidth;
        let boxHeight = this.initialWidth;

        let svgElem = document.createElementNS (xmlns, "svg");
        svgElem.setAttributeNS (null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS (null, "width", boxWidth);
        svgElem.setAttributeNS (null, "height", boxHeight);
        svgElem.style.display = "block";

        let defs=document.createElementNS (xmlns, "defs");
        let linearGradient=document.createElementNS (xmlns, "linearGradient");
        let colorid=this.id+'color';
        linearGradient.setAttributeNS (null, 'id', colorid);
        linearGradient.setAttributeNS (null, 'x1', '0');
        linearGradient.setAttributeNS (null, 'y1', '0');
        linearGradient.setAttributeNS (null, 'x2', '100%');
        linearGradient.setAttributeNS (null, 'y2', '0');
        linearGradient.setAttributeNS (null, 'gradientUnits', 'userSpaceOnUse');
        let stop1=document.createElementNS (xmlns, "stop");
        stop1.setAttributeNS (null, 'offset', '0%');
        stop1.setAttributeNS (null, 'style', 'stop-color:'+this.color[0]);
        let stop2=document.createElementNS (xmlns, "stop");
        stop2.setAttributeNS (null, 'offset', '100%');
        stop2.setAttributeNS (null, 'style', 'stop-color:'+this.color[1]);
        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        defs.appendChild(linearGradient);
        svgElem.appendChild (defs);

        let innerCircle = document.createElementNS (xmlns, "circle");
        innerCircle.setAttributeNS (null, 'cx', '50');
        innerCircle.setAttributeNS (null, 'cy', '50');
        innerCircle.setAttributeNS (null, 'r', '46');
        innerCircle.setAttributeNS (null, 'fill', 'none');
        innerCircle.setAttributeNS (null, 'stroke-width', '4');
        innerCircle.setAttributeNS (null, 'stroke', '#9099AA');
        innerCircle.setAttributeNS (null, 'stroke-linecap', 'round');
        svgElem.appendChild (innerCircle);

        let outerCircle = document.createElementNS (xmlns, "circle");
        outerCircle.setAttributeNS (null, 'cx', '50');
        outerCircle.setAttributeNS (null, 'cy', '50');
        outerCircle.setAttributeNS (null, 'r', '44');
        outerCircle.setAttributeNS (null, 'fill', 'none');
        outerCircle.setAttributeNS (null, 'stroke-width', '10');
        outerCircle.setAttributeNS (null, 'stroke', "url(#"+colorid+")");
        outerCircle.setAttributeNS (null, 'stroke-linecap', 'round');
        outerCircle.setAttributeNS (null, 'stroke-dasharray', '276');
        outerCircle.setAttributeNS (null, 'stroke-dashoffset', '170');
        outerCircle.setAttributeNS (null, 'class', 'circular');
        svgElem.appendChild (outerCircle);

        return svgElem;
    }
    updateData(option){
        this.centerValue=option.centerValue||this.centerValue;
        let dashoffset = Math.max(276*(1-this.centerValue/this.maxValue),0);
        $('#'+this.id).find('.circle-content').find('.circular').attr('stroke-dashoffset',dashoffset);
        $('#'+this.id).find('.circle-content').find('div').find('span').eq(0).text(this.centerValue);
    }
    
}

export default TTIRank