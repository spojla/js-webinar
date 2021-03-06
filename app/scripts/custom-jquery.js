var $ = function(selector){
  var hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
  var hyphenToCamelCase = function(hyphen){
    return hyphen.replace(/-([a-z])/gi, function(s, group1) {
        return group1.toUpperCase();
    });
  }
  var camelCaseToHyphen = function(camelCase){
    return camelCase.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  }
  var result = selector instanceof HTMLElement ? [selector] : document.querySelectorAll(selector);
  result.each = function(callback){
    for (var i = 0; i < result.length; i++){
      if (callback.call(result[i], i) === false){
        break;
      }
    }
    return result;  
  }
  Object.assign(result, {
    addClass: function(newClassName){
      return result.each(function(i){
        if (!hasClass(result[i], newClassName)) {
          result[i].className += ' ' + newClassName 
        }  
      });
    },
    append: function(){
      var items = arguments;
      return result.each(function(i){
        for (var i = 0; i < items.length; i++){
          if (items[i].length) {
            for (var j = 0; j < items[i].length; j++){
              this.appendChild(items[i][j].cloneNode());             
            }
          } else {
            this.appendChild(items[i].cloneNode());
          }
        };
      });
    },
    html: function(html){
      if (html != undefined) {
        return result.each(function(i){
          this.innerHTML = html;
        });
      }
      
      var funRes;
      if (result.length)
        funRes = result[0].innerHTML;
      return funRes;
    },
    attr: function(attrName, attrValue){    
      if (attrValue != undefined) {
        return result.each(function(i){
          this.setAttribute(attrName, attrValue)
        });
      }    
      var funRes;
      if (result.length)
        funRes = result[0].getAttribute(attrName);
      return funRes;
    },
    children: function(){
      var resultChildren = [];
      Object.assign(resultChildren, result);
      resultChildren.length = 0;
      result.each(function(i){
        Array.prototype.push.apply(resultChildren, this.childNodes)
      });
      return resultChildren;
    },
    css: function(arg){
      if (arg.toString() == '[object Object]') {
        return result.each(function(i){         
          Object.assign(this.style, arg);
        });
      } else if (typeof arg == 'string') {
        var funRes;
        if (result.length)
          funRes = result[0].style[hyphenToCamelCase(arg)]
        return funRes;
      }
    },
    data: function(dataAttr, value){
      if (value != undefined) {
        return result.each(function(i){
          this.setAttribute('data-' + hyphenToCamelCase(dataAttr), value.toString() == '[object Object]' ? JSON.stringify(value): value);
        });
      }    
      var funRes;
      if (result.length)
        funRes = result[0].getAttribute('data-' + camelCaseToHyphen(dataAttr));
      try {
        return JSON.parse(funRes);
      }
      catch (err) {
        return funRes;
      }
    },
    on: function(eventName, callback){
      return result.each(function(i){
        this.addEventListener(eventName, callback);
      });
    },
    one: function(eventName, callback){
      var onceCallbackFunction = function(){
        callback(arguments);
        this.removeEventListener(eventName, onceCallbackFunction);
      }
      return this.on(eventName, onceCallbackFunction);
    }
  });
  return result;
}