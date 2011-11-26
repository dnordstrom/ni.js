/* NI.JS minimalist library
 *  Built on best practices and prototypal JavaScript conventions.
  Version 0.1 */

if (NI === undefined) var NI = { };

/* Private || Privileged
  Core helper methods */
NI.prototype.JS = {
  /* Using ECMAScript 5 strict mode */
  "use strict";

  /* Private
    Instance to use instead of "this" in inner methods */
  self: this,

  find: function(element) {
    if (!document.getElementById) return false;
    document.getElementById(element);
  },

  /* Privileged
    Retrieve the browser-specific XMLHttpRequest object */
  getXHR: function() {
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
  },
  
  /* Privileged
    Get JSON-P data from URL via AJAX */
  getJSON: function(path, callback) {
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
  },

}

/* Public
  Method */
NI.prototype.Example = function() {

}
