// TODO: fix this so its a bit cleaner (ids, etc), and that the stage_data url is pulled from a bds config var
(function($){
  $.fn.bds = function(options) {
    
    options = $.extend({}, $.fn.bds.defaultOptions, options);

    this.each(function() {
      var $elem = $(this),
          $svg_elem = $('<div id="svg_container"></div>');

      $elem.append($svg_elem);

      var svg =  d3.select('#svg_container')
                      .append('svg')
                      .attr('width', 900)
                      .attr('height', 900);

          d3.json('/stage_data', function(error, root) {

            if (typeof(Storage) === 'undefined')
              alert('This application requires HTML5 support. Please use a different browser.');

            bds.make_app(svg, root, { 
                  content: '#' + $elem.attr('id'),
                  svg_container: '#' + $svg_elem.attr('id')
                });

          });
      });

      return this;
  };

  $.fn.bds.defaultOptions = {
    a: '1',
    b: '2'
  };
  
})(jQuery);
