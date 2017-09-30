exports.getTranslation=function(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttributeNS(null, "transform", transform);
  var matrix = g.transform.baseVal.consolidate().matrix;
  return [matrix.e, matrix.f];
}
exports.getScale=function(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  var matrix = g.transform.baseVal.consolidate().matrix;
  // console.log(g.transform.baseVal.consolidate())
  // As per definition values e and f are the ones for the translation.
  return [matrix.a, matrix.d];
}