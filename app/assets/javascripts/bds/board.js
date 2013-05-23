bds.make_board = function(svg, json, options) {
  var circle_class = 'bdsCircle',
      label_class = 'bdsLabel';

  var draw_circles = function () {

    var defs = svg.append('svg:defs');
    var pattern = defs.selectAll('pattern')
                      .data([0])
                      .enter()
                      .append('pattern')
                      .attr('id', 'img-bkg')
                      .attr('x', 0)
                      .attr('y', 0)
                      .attr('patternUnits', 'userSpaceOnUse')
                      .attr('height', 1)
                      .attr('width', 1);

//     var images = pattern.selectAll('image')
//                     .data([0])
//                     .enter()
//                     .append('svg:image')
//                     .attr('x', function (d) { return 0; }) // TODO: scale these
//                     .attr('y', function (d) { return 0; })
//                     .attr('height', 35)
//                     .attr('width', 35)
//                     .attr('xlink:href', 'http://www.pco.noaa.gov/stormwatch/images/iconsm-waves.gif');
// 

    var elem = svg.selectAll('g bds')
                        .data(json);

    var elemEnter = elem.enter()
                        .append('g');
                    
    var circle =  elemEnter.append('circle')
                            .attr('cx', function (d) { return d.x; })
                            .attr('cy', function (d) { return d.y; })
                            .attr('r', function(d) { return d.r; })
                            .attr('class', circle_class)
                            .attr('id', function(d) { return d.id; })
                            .attr('data-next', function(d) { return JSON.stringify(d.next); })
                            .attr('data-start', function(d) { return d.start; })
                            .style('fill', function(d) { return d.color; })
                            ;

    elemEnter.append('text')
      .attr('dx', function(d){return d.x - 80; })
      .attr('dy', function(d){return d.y; }) 
      .attr('fill', 'none')
      .attr('class', label_class)
      .text(function(d){ return d.label; });
      

  };

  // ------
  // note - expects json to contain info about only one line
  //
  //  var lineData = [ { "x": 30,   "y": 30},  { "x": 70,  "y": 70},
  //                   { "x": 70,  "y": 70}, { "x": 110,  "y": 110}];
  var draw_path = function () {

    // TODO: clean this up - fake memo - puts all circle data in 
    // an object referencable by id - as of now has to be done
    // prior to creating bds.circles
    var memo = (function() {
      var obj = {};
      $.each(json, function() {
        obj[this.id] = this;
      });
      return obj;
    })();

    var transform_circles_to_path = function(json) {
      var arr = [];
      $.each(json, function(i, v) {
        var that = this;
        $.each(this.next, function() {
          var next = memo[this];
          if (next !== undefined) {
            arr.push({ "x": that.x, "y": that.y});
            arr.push({ "x": next.x, "y": next.y});
          }

          if ( that.id === 114 ) {
            var fake_next = memo[119];
            arr.push({ "x": fake_next.x, "y": fake_next.y});
          }
        });

      });
      
      return arr;
    };

    var lineFunction = d3.svg.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; })
                              .interpolate("linear");

    var lineGraph = svg.append('path')
                       .attr('d', lineFunction(transform_circles_to_path(json)))
                       .attr('stroke', bds.path_color)
                       .attr('stroke-width', bds.path_width)
                       .style('fill', 'none');
  };

  var draw_game = function () {
    bds.dice = bds.make_dice( $(options.die) );
    bds.start = bds.make_start( $(options.start) );
    bds.move = bds.make_move( $(options.move) );
    bds.roller = bds.make_roller( $(options.roller) );
    bds.score = bds.make_score( $(options.score) );
  };

  // initialization
  draw_game();
  draw_path();
  draw_circles();

  $('.' + circle_class).each(function() {
     var label;
     $(this).closest('g').find('.' + label_class).each(function() {
      label = this;
     });
     bds.make_circle(this, label);  
  });

};
