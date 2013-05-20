bds.make_app = function(svg, json, options) {
  var self = {},
      svg = svg,
      jsonCircles = json,
      circle_class = 'bdsCircle',
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
                            .attr('data-start', function(d) { return d.start !== undefined; })
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

  var mark_stage_complete = function(id) {
    var arr = JSON.parse(localStorage.completed);
    arr.push(id);
    localStorage.completed = JSON.stringify(arr);
  };

  var on_start = function() {
    if ( self.started ) return;
    self.started = true;
    self.playable = true;
    bds.circles.first();
    bds.start.off(); 
    $.publish('bds_play', [null, 3000]);
  };

  var on_moving = function() {
    if (! self.started) return;
    if (! self.moveable) return;
    bds.circles.leave_and_land(bds.dice.current_face);
    self.moveable = false;
    bds.move.off();
    bds.dice.off();
    self.playable = true;
    $.publish('bds_play', [null, 3000]);
  };

  var on_stage_complete = function(e) {
    self.rollable = true;
    self.playable = false;
    bds.circles.complete_stage(function() {
      bds.roller.on(); 
    });
    mark_stage_complete(bds.circles.current.id);
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

  var on_play = function(e, id, delay) {
    if (! self.playable ) return;

    if (id) {
      if (! bds.circles.is_current(id) )  
        return;
    }

    var delay = delay || 0;
    setTimeout(function() {
      bds.circles.current.play();
    }, delay);
  };

  // change params to option hash
  var hydrate = function(id, passed) {
    self.started = true;
    completed = JSON.parse(localStorage.completed);
    bds.circles.current = bds.circles.get(id);

    $.each(completed, function(k, v) {
      bds.circles.get(v).complete(null, true);  
    });

    bds.circles.current.pop(function() {
      if (passed) {
        $.publish('bds_stage_complete');
      }
    });

    bds.start.off();
  };

  var wire = function() {
    $.subscribe('bds_start', on_start);
    $.subscribe('bds_moving', on_moving);
    $.subscribe('bds_stage_complete', on_stage_complete);
    $.subscribe('bds_rolled', on_rolled);
    $.subscribe('bds_rolling', on_rolling);
    $.subscribe('bds_play', on_play);

    $('.' + circle_class).each(function() {
       var label;
       $(this).closest('g').find('.' + label_class).each(function() {
        label = this;
       });
       bds.make_circle(this, label);  
    });
  };

  // API
  self.hydrate = hydrate;

  // initialization
  draw_game();
  draw_circles_path();
  draw_circles();
  wire();

  if ( options.fresh ) {
    localStorage.clear();
    localStorage.completed = JSON.stringify([]);
  }

  self.started = false;
  self.moveable = false;
  self.rollable = false;
  
  return self;
};
