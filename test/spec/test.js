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
      describe('addClass', function () {
        beforeEach(function() {
          match = $('.my-class');
        });
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
    });
  });
})();
