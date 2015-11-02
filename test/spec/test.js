(function () {
  'use strict';

  describe('jQuery call', function () {
    it('should be a function', function () {
      var node = $;
      assert.isFunction(node);
    });
    //TODO: with dom element
    describe('with class', function () {
      var myEl1, myEl2, otherEl, match;
      beforeEach(function() {
        myEl1 = document.body.appendChild(document.createElement( 'div' ));
        myEl1.className = 'my-class';
        myEl2 = document.body.appendChild(document.createElement( 'div' ));
        myEl2.className = 'my-class';
        otherEl = document.body.appendChild(document.createElement( 'div' ));
        otherEl.className = 'other-class';
      });
      afterEach(function() {
        document.body.removeChild(myEl1);
        document.body.removeChild(myEl2);
        document.body.removeChild(otherEl);
      });
      it('not existing class should return empty array', function () {
        var match = $('.not-existing-class');
        assert.lengthOf(match, 0);
      });
      it('existing class should return two objects', function () {
        var match = $('.my-class');
        assert.lengthOf(match, 2);
      });
      it('existing class should return two DOM objects', function () {
        var match = $('.my-class');
        assert.equal(match[0], myEl1);
        assert.equal(match[1], myEl2);
      });
      it('existing class should return an object with jQuery methods', function () {
        var match = $('.my-class');
        assert.isFunction(match.addClass);
        assert.isFunction(match.append);
        assert.isFunction(match.html);
        assert.isFunction(match.attr);
        assert.isFunction(match.children);
        assert.isFunction(match.css);
        assert.isFunction(match.data);
        assert.isFunction(match.on);
        assert.isFunction(match.one);
        assert.isFunction(match.each);
      });
      describe('functions', function () {
        beforeEach(function() {
          match = $('.my-class');
        });
        describe('addClass', function () {          
          it('should add class to both elements', function () {
            match.addClass('second-class')
            
            assert.equal(myEl1.className, 'my-class second-class')
            assert.equal(myEl2.className, 'my-class second-class')
            assert.equal(otherEl.className, 'other-class')
          });
          
          it('should not add duplicate class to both elements', function () {
            match.addClass('second-class');
            match.addClass('second-class');          
            
            assert.equal(myEl1.className, 'my-class second-class')
            assert.equal(myEl2.className, 'my-class second-class')
            assert.equal(otherEl.className, 'other-class')
          });
          
          it('should return same match', function () {
            var res = match.addClass('second-class')
            
            assert.equal(res, match)
          });
        });
        describe('append', function () { 
          //TODO: test arg as array
          var myInnerEl;
          beforeEach(function() {
            var otherInnerEl = myEl1.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';
            var otherInnerEl = myEl2.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';
            var otherInnerEl = otherEl.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';
            
            myInnerEl = document.createElement( 'div' );
            myInnerEl.className = 'my-inner-class';             
          }); 
          describe('should add child to both elements', function () {                         
            it('should add child to first element', function () {              
              match.append(myInnerEl);
              
              assert.lengthOf(myEl1.childNodes, 2);
              assert.equal(myEl1.childNodes[1].className, 'my-inner-class');
            });
            it('should add child to second element', function () {              
              match.append(myInnerEl);
              
              assert.lengthOf(myEl2.childNodes, 2);
              assert.equal(myEl2.childNodes[1].className, 'my-inner-class');
            });
            it('should not add child to other element', function () {              
              match.append(myInnerEl);
              
              assert.lengthOf(otherEl.childNodes, 1);
              assert.equal(otherEl.childNodes[0].className, 'other-inner-class');
            });
          });
          
          describe('should add two children to both elements', function () {                         
            it('should add two children to first element', function () {              
              match.append(myInnerEl, myInnerEl.cloneNode());
              
              assert.lengthOf(myEl1.childNodes, 3);
              assert.equal(myEl1.childNodes[1].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[2].className, 'my-inner-class');
            });
            it('should add two children to second element', function () {              
              match.append(myInnerEl, myInnerEl.cloneNode());
              
              assert.lengthOf(myEl1.childNodes, 3);
              assert.equal(myEl2.childNodes[1].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[2].className, 'my-inner-class');
            });
            it('should not add child to other element', function () {              
              match.append(myInnerEl, myInnerEl.cloneNode());
              
              assert.lengthOf(otherEl.childNodes, 1);
              assert.equal(otherEl.childNodes[0].className, 'other-inner-class');
            });
          });
          
          describe('should add seven children to both elements', function () {                         
            it('should add seven children to first element', function () {              
              match.append(myInnerEl, 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode()
                );
              
              assert.lengthOf(myEl1.childNodes, 8);
              assert.equal(myEl1.childNodes[1].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[2].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[3].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[4].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[5].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[6].className, 'my-inner-class');
              assert.equal(myEl1.childNodes[7].className, 'my-inner-class');
            });
            it('should add seven children to second element', function () {              
              match.append(myInnerEl, 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode()
                );
              
              assert.lengthOf(myEl2.childNodes, 8);
              assert.equal(myEl2.childNodes[1].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[2].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[3].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[4].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[5].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[6].className, 'my-inner-class');
              assert.equal(myEl2.childNodes[7].className, 'my-inner-class');
            });
            it('should not add child to other element', function () {              
              match.append(myInnerEl, 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode(), 
                myInnerEl.cloneNode()
                );
              
              assert.lengthOf(otherEl.childNodes, 1);
              assert.equal(otherEl.childNodes[0].className, 'other-inner-class');
            });
          });
          
          it('should return same match', function () {
            var res = match.append(myInnerEl)
            
            assert.equal(res, match)
          });
        });
        
        describe('html', function () { 
          beforeEach(function() {
            var otherInnerEl = myEl1.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'my-inner-class';
            var otherInnerEl = myEl2.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';
            var otherInnerEl = otherEl.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';          
          }); 
          it('should return first element html', function () {
            var res = match.html();
            
            assert.equal(res, '<div class="my-inner-class"></div>')
          });
          
          it('when empty match should return undefined', function () {
            var notMatch = $('.not-existing-class');
            var res = notMatch.html();
            
            assert.isUndefined(res);
          });
          
          describe('argument provided', function () { 
            it('should change first element inner html', function () {
              match.html('<div/>');
              
              assert.equal(myEl1.childNodes[0].className, '')
            });
            
            it('should change second element inner html', function () {
              match.html('<div/>');
              
              assert.equal(myEl2.childNodes[0].className, '')
            });
            
            it('should return same match', function () {
              var res = match.html('<div/>')
              
              assert.equal(res, match)
            });
          });
        });
        
        describe('attr', function () { 
          it('should return first element attribute', function () {
            var res = match.attr('class');
            
            assert.equal(res, 'my-class')
          });
          
          it('when empty match should return undefined', function () {
            var notMatch = $('.not-existing-class');
            var res = notMatch.attr('class');
            
            assert.isUndefined(res);
          });
          
          describe('second argument provided', function () { 
            it('should change first element attribute', function () {
              match.attr('class', 'new-class');
            
              assert.equal(myEl1.className, 'new-class')
            });
            
            it('should change second element attribute', function () {
              match.attr('class', 'new-class');
            
              assert.equal(myEl2.className, 'new-class')
            });
            
            it('should return same match', function () {
              var res = match.attr('class', 'new-class');
              
              assert.equal(res, match)
            });
          });
        });
        
        describe('children', function () { 
          beforeEach(function() {
            var otherInnerEl = myEl1.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'my-inner-class';
            var otherInnerEl = myEl2.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';
            var otherInnerEl = otherEl.appendChild(document.createElement( 'div' ));
            otherInnerEl.className = 'other-inner-class';          
          }); 
          
          it('should return both elements children', function () {
            var res = match.children();
            
            assert.lengthOf(res, 2);
            assert.equal(res[0].className, 'my-inner-class');
            assert.equal(res[1].className, 'other-inner-class');
          });
          
          it('should return an object with jQuery methods', function () {
            var res = match.children();
            assert.isFunction(res.addClass);
            assert.isFunction(res.append);
            assert.isFunction(res.html);
            assert.isFunction(res.attr);
            assert.isFunction(res.children);
            assert.isFunction(res.css);
            assert.isFunction(res.data);
            assert.isFunction(res.on);
            assert.isFunction(res.one);
            assert.isFunction(res.each);
          });
          //TODO: children with query selector, more children methods test
        });
        
        describe('css', function () { 
          beforeEach(function() {
            myEl1.style.backgroundColor = 'red';
            myEl2.style.backgroundColor = 'blue';
            otherEl.style.backgroundColor = 'green';         
          }); 
          describe('first argument is string', function () { 
            it('should return first element css', function () {
              var res = match.css('background-color');
              
              assert.equal(res, 'red')
            });
            
            it('when empty match should return undefined', function () {
              var notMatch = $('.not-existing-class');
              var res = notMatch.css('background-color');
              
              assert.isUndefined(res);
            });
          });
          
          describe('first argument is object with js syntax', function () { 
            it('should change first element css', function () {
              match.css({backgroundColor: 'black'});
            
              assert.equal(myEl1.style.backgroundColor, 'black')
            });
            
            it('should change second element css', function () {
              match.css({backgroundColor: 'black'});
            
              assert.equal(myEl2.style.backgroundColor, 'black')
            });
            
            it('not matched el should stay', function () {
              match.css({backgroundColor: 'black'});
            
              assert.equal(otherEl.style.backgroundColor, 'green')
            });
            
            it('should return same match', function () {
              var res = match.css({backgroundColor: 'black'});
              
              assert.equal(res, match)
            });
          });
          
          describe('first argument is object with css syntax', function () { 
            it('should change first element css', function () {
              match.css({'background-color': 'black'});
            
              assert.equal(myEl1.style.backgroundColor, 'black')
            });
            
            it('should change second element css', function () {
              match.css({'background-color': 'black'});
            
              assert.equal(myEl2.style.backgroundColor, 'black')
            });
            
            it('should return same match', function () {
              var res = match.css({'background-color': 'black'});
              
              assert.equal(res, match)
            });
          });
        });
        
        describe('each', function () { 
          it('should iterate both elements', function () {
            var eachElIndex = 0;
            match.each(function(index) {
              assert.equal(index, eachElIndex);
              eachElIndex++;
            });
            assert.equal(eachElIndex, 2);
          });
          
          it('should have scope on each element', function () {
            var eachElIndex = 0;
            match.each(function() {
              if (eachElIndex == 0) {
                assert.equal(this, myEl1);
              } else {
                assert.equal(this, myEl2);                
              }
              eachElIndex++;
            }); 
          });
          
          it('should stop iterating when return false', function () {
            var eachElIndex = 0;
            match.each(function() {
              eachElIndex++;
              return false;
            }); 
            assert.equal(eachElIndex, 1);
          });
          
          it('should return same match', function () {
            var res = match.each(function(){});
          
            assert.equal(res, match)
          });
        });
      });
    });
  });
})();
