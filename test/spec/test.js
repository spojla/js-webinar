(function () {
  'use strict';

  describe('jQuery call', function () {
    describe('with class', function () {
      var myEl, otherEl;
      beforeEach(function() {
        otherEl = document.createElement( 'div' );
        otherEl.className = 'other-class';
        myEl = document.createElement( 'div' );
        myEl.className = 'my-class';
      });
      it('should return an object', function () {
        var node = $('my-class');
        expect(node).toBeDefined();
      });
      it('should have methods', function () {
        var node = $('my-class');
        expect(node.addClass).toBeDefined();
        expect(node.append).toBeDefined();
        expect(node.html).toBeDefined();
        expect(node.attr).toBeDefined();
        expect(node.children).toBeDefined();
        expect(node.css).toBeDefined();
        expect(node.data).toBeDefined();
        expect(node.on).toBeDefined();
        expect(node.one).toBeDefined();
        expect(node.each).toBeDefined();
      });
    });
  });
})();
