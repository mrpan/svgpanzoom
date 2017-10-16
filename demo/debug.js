/*
* @Author: giserpan
* @Date:   2017-09-28 14:15:53
* @Last Modified by:   giserpan
* @Last Modified time: 2017-10-16 10:57:11
*/

var dom = svgpanzoom({
	element: "limit-svg",
	groupElement:"container",
	speed:0.065
});
dom.on("drag").on("zoom").on("dbclick");

