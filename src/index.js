'use strict';


module.exports = svgpanzoom;
function svgpanzoom(options){
	return new SVGPanZoom(options);
}
function SVGPanZoom(options){
	var element  = options.element;
   this.mousedownx;
   this.mousedowny;
   this.mousemoving;
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
SVGPanZoom.prototype.on =function(type,listener){
   var element = this.element;
   if(type=="drag"){
      element.addEventListener("mousedown",mousedowned)
   }
}

SVGPanZoom.prototype.mousedowned=function(event){
  this.mousedownx =event.clientX;
  this.mousedowny =event.clientY;
}

