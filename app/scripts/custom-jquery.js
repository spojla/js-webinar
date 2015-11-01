var $ = function(selector){
  var hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
  var result = document.querySelectorAll(selector);
  Object.assign(result, {
    addClass: function(newClassName){
      for (var i = 0; i < result.length; i++){
        if (!hasClass(result[i], newClassName)) {
          result[i].className += ' ' + newClassName 
        }
      }
      return result; // TODO: check problems after chain
    },
    append: function(){
      
    },
    html: function(){
      
    },
    attr: function(){
      
    },
    children: function(){
      
    },
    css: function(){
      
    },
    data: function(){
      
    },
    on: function(){
      
    },
    one: function(){
      
    },
    each: function(){
      
    }
  });
  return result;
}