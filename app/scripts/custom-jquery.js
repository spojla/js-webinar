var $ = function(selector){
  var hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
  var result = document.querySelectorAll(selector);
  var resultChildren = [];
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
          this.appendChild(items[i].cloneNode());
        };
      });
    },
    html: function(html){
      if (html) {
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
      if (attrValue) {
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
      resultChildren.length = 0;
      result.each(function(i){
        Array.prototype.push.apply(resultChildren, this.childNodes)
      });
      return resultChildren;
    },
    css: function(){
      
    },
    data: function(){
      
    },
    on: function(){
      
    },
    one: function(){
      
    }
  });
  Object.assign(resultChildren, result);
  resultChildren.length = 0;
  return result;
}