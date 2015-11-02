(function () {
  'use strict';

  describe('jQuery call', function () {
    it('should be a function', function () {
      var node = $;
      assert.isFunction(node);
    });
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
          
          it('should return same match', function () {
            var res = match.append(myInnerEl)
            
            assert.equal(res, match)
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
