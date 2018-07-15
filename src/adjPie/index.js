import $ from 'jquery';
import "./style.css";

class adjPie {
    constructor(option) {
        this.id=option.listId;
        this.listDiv = document.getElementById(option.listId);
        this.initialWidth=240;
        this.listDiv.style.width=this.initialWidth+'px';
        this.containerWidth=this.listDiv.getAttribute("width");
        this.width=this.containerWidth.substring(0,this.containerWidth.length-2);
        this.w=this.initialWidth;
        this.h=this.initialWidth/2.1;
        this.origin = [this.w/4, this.h/2]; 
        this.drawData = [];
        this.W=this.h/5*2;
        this.count=0;
        this.centerValue=option.centerValue||"";
        this.centerText=option.centerText||"";
        this.data=option.data;
        this.init();
        this.draw();
    }
    init(){
        let svg =  this.createSvgTag('svg', {
            'cx':  this.origin[0],
            'cy':  this.origin[1],
            'width': this.w/2 + 'px',
            'height': this.h + 'px',
            'viewBox': `0 0 ${this.w/2} ${this.h}`,     
        });
        let demons=document.createElement('div');
        demons.setAttribute('class','demons');
        let ul=document.createElement('ul');
        for(let i=0;i<this.data.length;i++){
            let li=document.createElement('li');
            let span0=document.createElement('span');
            let span1=document.createElement('span');
            let span2=document.createElement('span');
            let span3=document.createElement('span');
            span0.innerHTML="• ";
            span0.style.color=this.data[i].color;
            span1.innerHTML=this.data[i].category;
            span2.innerHTML=this.data[i].value;
            let boxWidth = this.w/2-14;
            let boxHeight = 4;
            let innersvg=this.createSvgTag("svg", {
            'width': boxWidth+ 'px',
            'height': boxHeight + 'px',
            'viewBox': `0 0 ${boxWidth} ${boxHeight}`,    
            })
            let innerLine =this.createSvgTag("line", {
            'x1': 2+ 'px',
            'y1': 2+ 'px',
            'x2': boxWidth-2,
            'y2': '2',
            'stroke-width':'4',
            'stroke':'#9099AA',
            'stroke-linecap':'round',    
            })
            let outerLine =this.createSvgTag("line", {
            'x1': 2+ 'px',
            'y1': 2+ 'px',
            'x2': boxWidth-2,
            'y2': '2',
            'stroke-width':'4',
            'stroke':this.data[i].color,
            'stroke-linecap':'round', 
            'stroke-dasharray': boxWidth ,
            'stroke-dashoffset': '50',
            'class':'outerLine',
            })
            innersvg.appendChild(innerLine);
            innersvg.appendChild(outerLine);
            li.appendChild(span0);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(span3);
            li.appendChild(innersvg);
            ul.appendChild(li);
        }
        demons.appendChild(ul);
        let content=document.createElement('div');
        svg.setAttribute('class','svg-cont');
        content.setAttribute('class','pie-content');
        content.appendChild(svg);
        content.appendChild(demons);
        this.listDiv.appendChild(content);
        this.listDiv.style["transform-origin"]= "0 0";
        this.listDiv.style.transform = 'scale(' + this.width/this.initialWidth + ')'; 
    }
    changeClass(){
        let mod=this.data.length;
        this.count=this.count%mod;
        $('.pie-content').find('ul').find('li').removeClass('active');
        $('.pie-content').find('ul').find('li').eq(this.count).addClass('active');
        let i=0;
        let sumvalue=0;
        this.data.map(item=>{
            item.outer=1.0;
            item.inner=0.8;
            sumvalue+=item.value;
            $('.pie-content').find('ul').find('li').eq(i).find('span').eq(2).text(item.value);
            i++;
        })
        this.centerValue=Math.floor(this.data[this.count].value/sumvalue*100)+'%';
        this.data[this.count].outer=1.1;
        this.data[this.count].inner=0.7;
        this.drawData = []; 
        this.draw();
        this.count++;
    }
    draw(){
       let sAngel = 0; 
       let eAngel = sAngel; 

       let total = this.data.reduce(function(v, item) {
                return v + item.value;
            }, 0)
        let svg=document.getElementById(this.id).getElementsByClassName('svg-cont')[0];
        svg.innerHTML="";
        for(let v of this.data) {
            let itemData = Object.assign({}, v);
            let r=this.W*v.inner||this.W*0.8;
            let R=this.W*v.outer||this.W;
            eAngel = sAngel + v.value / total * 2 * Math.PI; 
            itemData.arclineStarts = [
                this.evaluateXY(r, sAngel, this.origin),
                this.evaluateXY(R, sAngel, this.origin), 
                this.evaluateXY(R, eAngel-0.01, this.origin),
                this.evaluateXY(r, eAngel-0.01, this.origin) 
                ];

            itemData.LargeArcFlag = (eAngel - sAngel) > Math.PI ? '1' : '0';
            itemData.r=r;
            itemData.R=R;
            this.drawData.push(itemData);
            sAngel = eAngel;
        }
        for(let v of this.drawData) {
            let P = v.arclineStarts;
            let path = this.createSvgTag('path', {
                'fill': v.color, 
                'stroke': 'black',
                'stroke-width': '0', 
                'd': `M ${P[0][0]} ${P[0][1]} L ${P[1][0]} ${P[1][1]} A ${v.R} ${v.R} 0 ${v.LargeArcFlag} 1 ${P[2][0]} ${P[2][1]} L ${P[3][0]} ${P[3][1]} A ${v.r} ${v.r}  0 ${v.LargeArcFlag} 0 ${P[0][0]} ${P[0][1]} z`
            })
            let percent = this.createSvgTag("text", {
                'x':  this.origin[0]-13,
                'y':  this.origin[1],
                'fill':'#fff',
                'font-size':'14px',
            })
            let demons = this.createSvgTag("text", {
                'x':  this.origin[0]-15,
                'y':  this.origin[1]+16,
                'fill':'#6F7F9D',
                'font-size':'8px',
            })
            percent.innerHTML = this.centerValue;
            demons.innerHTML = this.centerText;
            svg.appendChild(path); 
            svg.appendChild(percent);
            svg.appendChild(demons);
        } 
    }
    createSvgTag (tagName, attributes) {
        let tag = document.createElementNS('http://www.w3.org/2000/svg', tagName)
        for (let attr in attributes) {
            tag.setAttribute(attr, attributes[attr])
        }
        return tag;
    }
    evaluateXY (r, angel, origin) {
        return [origin[0] + Math.sin(angel) * r, origin[0] - Math.cos(angel) * r]                                                                                  
    }
    updateData(option){
        this.centerText=option.centerText;
        this.centerValue=option.centerValue;  
        this.data=option.data; 
    }
    
}

export default adjPie