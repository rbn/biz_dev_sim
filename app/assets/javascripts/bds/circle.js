// track circles out in the field
bds.circles = (function() {
  var self = {};

  var add = function(id, circle) {
    self[id] = circle;
    if ( circle.is_start() ) {
      self.start = circle;
      self.current = self.start;
     }
  };

  var get = function(id) {
    return self[id];
  };

  var first = function() {
    land(); 
  };

  var leave = function() {
    self.current.drop();
  };

  var is_current = function(id) {
    return self.current.id == id;
  };

  var land = function(n) {
    // handle start
    if (! n) {
      self.start.pop();
      return;
    }

    for(i = 0; i < n; i ++) {
      var isDest = ( i == n - 1 );
      var next_id = self.current.next()[0]; // TODO: temporary - only looking at "first" next
      self.current = self[next_id];
      if (! isDest ) {
        setTimeout(self.current.hop, i*250);
      }
    }

    setTimeout(self.current.pop, n*250);
  };
  
  var leave_and_land = function(n) {
    leave();
    land(n);
  };

  var complete_stage = function(callback) {
    self.current.complete(callback);
  };

  self.add = add;
  self.get = get;

  // TODO: this method looks like something other than it is - fix!
  self.first = first;
  self.is_current = is_current;
  self.leave_and_land = leave_and_land;
  self.complete_stage = complete_stage;

  return self;
})();

// circle constructor
bds.make_circle = function(elem, label) {
  var self = {}, 
      $elem = $(elem),
      d3o = d3.select(elem),
      starting_radius = d3o.attr('r'),
      isBig = false,
      label = d3.select(label)
      ;

  var pop = function(callback, hide_label) {
    var callback = callback || bds.noop;

    d3o.transition()
       .duration(1000)
       .attr('r', starting_radius * 4)
       .each('end', function() {
         callback();
         if ( hide_label ) return;
         label
            .attr('font-size', 20)
            .style('fill', 'black');
       });

    isBig = true;
    return self;
  };

  var drop = function() {
    d3o.transition()
       .duration(500)
       .attr('r', starting_radius);
    isBig = false;

    label.transition()
          .attr('font-size', 10)
          .attr('dx', function(d){return d.x - 10;})
          .attr('dy', function(d){return d.y + 5; })
          .text('MC');
    return self;
  };

  var hop = function() {
      pop(drop, true);
  };

  var is_start = function() {
    return $elem.data('start');
  };

  var next = function() {
    return $elem.data('next');
  };

  var play = function() {
      // TODO: get these elements from the app (e.g. $thediv)
      $('#thediv').fadeOut(1200, function() {
        $('#stage').load('samplestage', function() {
          $(this).fadeIn(1200);
          $(this).append('<input type="hidden" id="stage_id" value="' + self.id + '" />');
        });
      });
  };

  var complete = function(callback, short_label) {
    var callback = callback || bds.noop;

    d3o.transition()
        .duration(2500)
        .style('fill', 'silver')
        .style('stroke', 'black')
        .each('end', function() {
          callback();
          label.style('fill', 'black');

          if (short_label)
            label.text('MC')
                 .attr('dx', function(d) { return d.x - 10; })
                 .attr('dy', function(d) { return d.y + 5; });
          else
            label.text('Marketing Call');
        });
  };

  var wire = function() {
    $elem.on('click', function() {
      // $.publish('bds_circle_click', self.id)
    });
  };

  self.name = name;
  self.pop = pop;
  self.drop = drop;
  self.hop = hop;
  self.sticky = false;
  self.is_start = is_start;
  self.next = next;
  self.play = play;
  self.complete = complete;
  self.id = $elem.attr('id');

  // init
  wire();
  bds.circles.add(self.id, self); 

  return self;
}
