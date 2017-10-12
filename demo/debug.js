/*
* @Author: giserpan
* @Date:   2017-09-28 14:15:53
* @Last Modified by:   giserpan
* @Last Modified time: 2017-10-12 16:01:24
*/

var dom = svgpanzoom({
	element: "limit-svg",
	groupElement:"container",
	speed:0.065
});
dom.on("drag").on("zoom");

