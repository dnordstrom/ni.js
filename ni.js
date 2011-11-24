/* NI.JS, version 0.1 */

if (NI === undefined) var NI = { };

/* NI.JS constructor */
function NI.prototype.JS(url) {
  /* Private
    Instance to use instead of "this" in inner methods */
  var instance = this;

  /* Privileged
    Retrieve the browser-specific XMLHttpRequest object */
  this.getXHR = function() {
    if (typeof XMLHttpRequest == "undefined") {
      XMLHttpRequest = function() {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") }
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP") }
        catch (e) {}
        return false;
      }
    }
    
    return new XMLHttpRequest();
  };
  
  /* Privileged
    Get JSON-P data from URL via AJAX */
  this.getJSON = function(path, callback) {
    var request = instance.getXHR();
    var script = document.createElement("script");
    
    script.src = instance.url + path;
    script.type = "text/javascript";
    
    if (callback != undefined) {
      script.src += "?callback=NI.JS._callback"

      instance._callback = function(data) {
        callback(data);
        instance._callback = undefined
      };
    }
    
    if (document.getElementsByTagName("head").length > 0) {
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }
}

/* Public
  Method */
NI.prototype.Example = function() {

}
