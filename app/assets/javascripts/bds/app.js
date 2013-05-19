bds.make_app = function(svg, json, options) {
  var self = {},
      svg = svg,
      jsonCircles = json,
      circle_class = 'bdsCircle',
      completed = [];

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
                            .attr('data-start', function(d) { return d.start !== undefined; })
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

  var draw_game = function () {
    bds.dice = bds.make_dice( $(options.die) );
    bds.start = bds.make_start( $(options.start) );
    bds.move = bds.make_move( $(options.move) );
    bds.roller = bds.make_roller( $(options.roller) );
  };

  // TODO: secure this method
  var complete_stage = function() {
    $.publish('bds_stage_complete');
  };

  var on_start = function() {
    if ( self.started ) return;
    self.started = true;
    self.playable = true;
    bds.circles.first();
    bds.start.off(); 
  };

  var on_moving = function() {
    if (! self.started) return;
    if (! self.moveable) return;
    bds.circles.leave_and_land(bds.dice.current_face);
    self.moveable = false;
    bds.move.off();
    bds.dice.off();
    self.playable = true;
  };

  var on_stage_complete = function() {
    self.rollable = true;
    self.playable = false;
    bds.circles.complete_stage(function() {
      bds.roller.on(); 
    });
  };

  var on_rolling = function() {
    if (! self.rollable ) return;
    bds.dice.roll();
    self.rollable = false
    self.moveable = true;
  };

  var on_rolled = function() {
    self.rollable = false;
    bds.roller.off();
    bds.move.on();
  };

  var on_circle_click = function(e, id) {
    if (! self.playable ) return;
    if (! bds.circles.is_current(id) )  return;
    bds.circles.current.play();
  };

  var hydrate = function(arr) {
    completed = arr || completed;
    $.each(completed, function(k, v) {
      bds.circles.get(v).complete();  
    });
  };

  var wire = function() {
    $.subscribe('bds_start', on_start);
    $.subscribe('bds_moving', on_moving);
    $.subscribe('bds_stage_complete', on_stage_complete);
    $.subscribe('bds_rolled', on_rolled);
    $.subscribe('bds_rolling', on_rolling);
    $.subscribe('bds_circle_click', on_circle_click);

    $('.' + circle_class).each(function() {
       bds.make_circle(this);  
    });
  };

  // API
  self.complete_stage = complete_stage;
  self.hydrate = hydrate;

  // initialization
  draw_game();
  draw_circles_path();
  draw_circles();
  wire();

  self.started = false;
  self.moveable = false;
  self.rollable = false;
  
  return self;
};
