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
                            .attr('data-next', function(d) { return JSON.stringify(d.nexts); })
                            .attr('data-start', function(d) { return d.start; })
                            .style('fill', function(d) { return d.color; })
                            .style('stroke', 'black')
                            .style('stroke-width', '5')
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

    var lineFunction = d3.svg.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; })
                              .interpolate('linear');         //.interpolate("linear");

    // from/to => { x:x, y:y}
    var get_path_array = function(from, to) {
      return [ from, to ];
    };

    // for each "circle" object, draw all of its connections
    $.each(json, function() {
      var from = { 'x' : this.x, 'y': this.y };
      $.each(this.nexts, function() {
        var next = memo[this];
        if (! next ) return; // TODO: this has a code smell - figure out better way
        var to = { 'x' : next.x, 'y': next.y };
        var lineGraph = svg.append('path')
                           .attr('d', lineFunction(get_path_array(from, to)))
                           .attr('stroke', bds.path_color)
                           .attr('stroke-width', bds.path_width)
                           .attr('stroke-dasharray', bds.dash_array)
                           .attr('stroke-linecap', 'round')
                           .style('fill', 'red')
                           ;
      });
     });

    return;
    
    var lineGraph = svg.append('path')
                       .attr('d', lineFunction(transform_circles_to_path(json)))
                       .attr('stroke', bds.path_color)
                       .attr('stroke-width', bds.path_width)
                       .style('fill', 'none');


    // var pi = Math.PI;
    // var arc = d3.svg.arc()
    //             .innerRadius(20)
    //             .outerRadius(70)
    //             .startAngle(0)
    //             .endAngle(100);

    // var arcGraph = svg.append('path')
    //                   .attr('d', arc(transform_circles_to_path(json)))
    //                   .attr('transform', 'translate(130,60)'); 
  };

  var draw_game = function () {
    bds.dice = bds.make_dice( $(options.die) );
    bds.start = bds.make_start( $(options.start) );
    bds.go = bds.make_go( $(options.go) );
    bds.roller = bds.make_roller( $(options.roller) );
    bds.score = bds.make_score( $(options.score) );
    bds.start_over = bds.make_start_over( $(options.start_over) );
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
