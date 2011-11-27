/* NI.JS minimalist library
   Best practices and prototypal JavaScript conventions
  Version 0.1 */

if (NI === undefined) var NI = { };

/* Public
  Core helper methods */
NI.prototype.JS = (function() {
  /* Using ECMAScript 5 strict mode */
  "use strict";

  /* Private
    Instance to use instead of "this" in inner methods */
  var self = this;
  
  /* Private
    Detects common browser features and capabilities */
  var Detects = (function() {
    var this.getElementById = !!document.getElementById;
    var this.byId = this.getElementById;

    var this.getElementsByTagName = !!document.getElementsByTagName;
    var this.byTagName = this.getElementsByTagName;
  })();

  /* Privileged
    Detects and calls W3C DOM getElementById if available */
  this.find = function(element) {
    if (!self.Detects.byId) return false;
    document.getElementById(element);
  }
})();

/* Public
  Asynchronous request helper methods */
NI.prototype.HTTP = (function() {
  /* Using ECMAScript 5 strict mode */
  "use strict"

  /* Private
    Stores the appropriate XMLHttpRequest object */
  var xml_http_request;

  /* Private
    Retrieve the browser-specific XMLHttpRequest object */
  var getXHR = function() {
    if(!!xml_http_request) return xml_http_request;

    if (typeof XMLHttpRequest === "undefined") {
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
    
    xml_http_request = new XMLHttpRequest();
    return xml_http_request;
  }

  /* Privileged
    Get JSON-P data from URL via AJAX */
  this.getJSON = function(path, callback) {
    var request = self.getXHR();
    var script = document.createElement("script");
    
    script.src = self.url + path;
    script.type = "text/javascript";
    
    if (callback != undefined) {
      script.src += "?callback=NI.JS.callback";

      self.callback = function(data) {
        callback(data);
        delete self.callback;
      };
    }
    
    if (document.getElementsByTagName("head").length > 0) {
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }
})();
