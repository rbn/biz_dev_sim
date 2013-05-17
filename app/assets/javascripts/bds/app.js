bds.make_app = function(svg, json, options) {
  var self = {},
      svg = svg,
      jsonCircles = json,
      options = options || {},
      circle_class = 'bdsCircle';

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

    var images = pattern.selectAll('image')
                    .data([0])
                    .enter()
                    .append('svg:image')
                    .attr('x', function (d) { return 0; }) // TODO: scale these
                    .attr('y', function (d) { return 0; })
                    .attr('height', 35)
                    .attr('width', 35)
                    .attr('xlink:href', 'http://www.pco.noaa.gov/stormwatch/images/iconsm-waves.gif');

                    
    var circles = svg.selectAll('circle')
                     .data(jsonCircles)
                     .enter()
                     .append('circle');

    var circleAttributes = circles
                            .attr('cx', function (d) { return d.x; })
                            .attr('cy', function (d) { return d.y; })
                            .attr('r', function(d) { return d.r; })
                            .attr('class', circle_class)
                            .attr('id', function(d) { return d.id; })
                            .attr('data-next', function(d) { return JSON.stringify(d.next); })
                            .attr('data-start', function(d) { return d.start !== undefined })
                            .style('fill', function(d) { return d.color; })
                            ;

  };

  // ------
  // note - expects json to contain info about only one line
  //
  //  var lineData = [ { "x": 30,   "y": 30},  { "x": 70,  "y": 70},
  //                   { "x": 70,  "y": 70}, { "x": 110,  "y": 110}];
  var draw_circles_path = function () {

    var transform_circles_to_path = function(json) {
      var arr = [];
      $.each(json, function(i, v) {
        var next = json[i + 1];

        if ( next !== undefined ) {
          arr.push({ "x": this.x, "y": this.y});
          arr.push({ "x": next.x, "y": next.y});
        }
      });
      return arr;
    };

    var lineFunction = d3.svg.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; })
                              .interpolate("linear");

    var lineGraph = svg.append('path')
                       .attr('d', lineFunction(transform_circles_to_path(jsonCircles)))
                       .attr('stroke', 'blue')
                       .attr('stroke-width', 4)
                       .style('fill', 'none');
  };

  var draw_die = function($die_container) {
    bds.dice = bds.make_dice($die_container, self);
    return this;
  };
  
  var draw_start = function($start_container) {
    bds.start = bds.make_start($start_container, self);
    return this;
  };

  var draw_move = function($move_container) {
    bds.move = bds.make_move($move_container, self);
  };

  var on_start = function() {
    self.started = true;
  };

  var on_move = function() {
    self.moveable = false;
  };

  var on_stage_complete = function() {
    self.moveable = true;
  };

  var wire = function() {
    $.subscribe('bds_start', on_start);
    $.subscribe('bds_move', on_move);
    $.subscribe('bds_stage_complete', on_stage_complete);

    $('.' + circle_class).each(function() {
       bds.make_circle(this);  
    });
  };

  // API
  self.draw_die = draw_die;
  self.draw_start = draw_start;
  self.draw_move = draw_move;

  // initialization
  draw_circles_path();
  draw_circles();
  wire();

  return self;
};
