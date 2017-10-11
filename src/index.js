'use strict';

var transform =require("./transform.js");
var $=require("jquery");
module.exports = svgpanzoom;
function svgpanzoom(options){
	return new SVGPanZoom(options);
}
function SVGPanZoom(options){
	var element  = options.element;
   var groupElement =options.groupElement;
   this.mousedownx;
   this.mousedowny;
   this.mousemoving;
   this.groupElement;
   this.speed=options.speed||0.065;
   if(typeof groupElement ==="string"){
      this.groupElement=document.getElementById(groupElement);
   }else if(groupElement instanceof SVGElement){
      this.groupElement=groupElement;
   }else{
      throw new Error('groupElement is incorrect');
   }
   if(typeof element ==="string"){
   		var svgdom = document.getElementById(element);
   		this.element =svgdom;
   		return this;
   }else if(element instanceof SVGElement){
   		this.element =element;
   		return this;
   }else{
   		throw new Error('Cannot create panzoom for the current type of dom element')
   }
}
SVGPanZoom.prototype.getTransformAttr=function(){
   var transformattr=$(this.groupElement).attr("transform");
   if(!transformattr){
      transformattr="translate(0,0)scale(1)";
   }
   return transformattr;
}
SVGPanZoom.prototype.on =function(type,listener){
   var element = this.element;
   if(type=="drag"){
      element.addEventListener("mousedown",this.mousedowned.bind(this))
   }else if(type=="zoom"){
       element.addEventListener("wheel",this.wheeled.bind(this));
   }
}

SVGPanZoom.prototype.mousedowned=function(event){
  this.mousedownx =event.clientX;
  this.mousedowny =event.clientY;
  this.mousemoved=this.mousemoved.bind(this);
  this.mouseupped=this.mouseupped.bind(this);
  window.addEventListener("mousemove",this.mousemoved,true);
  window.addEventListener("mouseup",this.mouseupped,true);
   this.mousemoving = false;
   this.transformattr = this.getTransformAttr();
}

SVGPanZoom.prototype.mousemoved=function(event){
  if(!this.mousemoving){
      var  nowtransforms = transform.getTranslation(this.transformattr);
      var nowscale=transform.getScale(this.transformattr);
      var tempx = nowtransforms[0]+event.clientX- this.mousedownx;
     var tempy=nowtransforms[1]+event.clientY- this.mousedowny;
     var trans = "translate("+tempx+","+tempy+")scale("+nowscale[0]+")";
     this.groupElement.setAttribute("transform",trans);
  }
}
SVGPanZoom.prototype.mouseupped=function(event){
  //  this.mousemoved=this.mousemoved.bind(this);
  // this.mouseupped=this.mouseupped.bind(this);
   window.removeEventListener("mouseup",this.mouseupped,true);
   window.removeEventListener("mousemove",this.mousemoved,true);
   
}
SVGPanZoom.prototype.wheeled=function(event){
   var deltaY =event.deltaY;
   var deltaX =event.deltaX;
   var centerX = event.clientX;
   var centerY = event.clientY;
   var nowtransforms = transform.getTranslation(this.getTransformAttr());
   var scale=transform.getScale(this.getTransformAttr());
   if(deltaY<0){
    var factor = 1+this.speed;
    nowtransforms[0]= centerX - factor * (centerX - nowtransforms[0])
    nowtransforms[1] = centerY - factor * (centerY - nowtransforms[1])
    factor *=scale[0]
    scale[0]=factor
    //  console.log(nowtransforms);
    // console.log((-centerX*(factor-1))+"======"+(-centerY*(factor-1)));
    
    var trans = "translate("+(nowtransforms[0])+","+(nowtransforms[1])+")scale("+factor+")";
     this.groupElement.setAttribute("transform",trans);
  }else{
   var factor = 1-this.speed;
    nowtransforms[0]= centerX - factor * (centerX - nowtransforms[0])
    nowtransforms[1] = centerY - factor * (centerY - nowtransforms[1])
    factor *=scale[0]
    scale[0]=factor
   var trans = "translate("+(nowtransforms[0])+","+(nowtransforms[1])+")scale("+factor+")";
     this.groupElement.setAttribute("transform",trans);
  }
}
