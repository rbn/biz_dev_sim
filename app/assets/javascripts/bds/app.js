bds.make_app = function(svg) {
  var self = {},
      svg = svg,
      jsonCircles,
      circle_class = 'bdsCircle';

  var get_data = function() {
    jsonCircles = [
      { "x": 30,  "y": 30,  "r": 40, "color" : "green" },
      { "x": 170, "y": 170, "r": 20, "color" : "purple" },
      { "x": 667, "y": 50, "r": 10, "color" : "purple" },
      { "x": 200, "y": 15, "r": 30, "color" : "purple" },
      { "x": 170, "y": 300, "r": 50, "color" : "purple" },
      { "x": 40, "y": 700, "r": 15, "color" : "purple" },
      { "x": 400, "y": 400, "r": 20, "color" : "red" }];
  };


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

  var draw_controls = function($controls_container) {
    bds.make_dice($controls_container);
  };
  
  // API
  self.draw_controls = draw_controls;

  // initialization
  get_data();
  draw_circles_path();
  draw_circles();

  // add behaviour
  $('.' + circle_class).each(function() {
     bds.make_circle(this);  
  });

  return self;
};
