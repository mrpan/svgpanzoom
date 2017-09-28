'use strict';


module.exports = svgpanzoom;
function svgpanzoom(options){
	return new SVGPanZoom(options);
}
function SVGPanZoom(options){
	var element  = options.element;
   if(typeof element ==="string"){
   		var svgdom = document.getElementById(element);
   		this.element =svgdom;
   		return svgdom;
   }else if(element instanceof SVGElement){
   		this.element =element;
   		return element;
   }else{
   		throw new Error('Cannot create panzoom for the current type of dom element')
   }
}

