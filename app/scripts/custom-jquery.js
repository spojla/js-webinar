var $ = function(selector){
  var hasClass = function(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
  var result = document.querySelectorAll(selector);
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
    append: function(item){
      return result.each(function(i){
        this.appendChild(item.cloneNode());
      });
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
      
    }
  });
  return result;
}