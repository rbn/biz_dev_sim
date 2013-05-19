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
    self.current.drop(500);
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
      if (! isDest ) self.current.hop(i*250);
    }

    // TODO: code smell - find out the way to do this - queing with callbacks?
    self.current.pop({delay: n * 250});
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
bds.make_circle = function(elem) {
  var self = {}, 
      $elem = $(elem),
      d3o = d3.select(elem),
      starting_radius = d3o.attr('r'),
      isBig = false
      ;

  var pop = function(options) {
    var options = options || {},
        duration = options.duration || 500,
        delay = options.delay || 0;

    setTimeout(function() {
      d3o.transition()
         .duration(duration)
         .attr('r', starting_radius * 4);
      isBig = true;
     }, delay);

    return self;
  };

  var drop = function(options) {
    var options = options || {},
        duration = options.duration || 500,
        delay = options.delay || 0;

    setTimeout(function() {
      d3o.transition()
         .duration(duration)
         .attr('r', starting_radius);
      isBig = true;
     }, delay);

    return self;
  };

  var hop = function(delay) {
    var delay = delay;
    setTimeout(function() {
      pop();
      setTimeout(drop, 500);
    }, delay);
  };

  var is_start = function() {
    return $elem.data('start');
  };

  var next = function() {
    return $elem.data('next');
  };

  var play = function() {
      // TODO: get these elements from the app (e.g. $thediv)
      localStorage.app = JSON.stringify(bds.app);
      $('#thediv').fadeOut(2000, function() {
        $('#stage').load('stages', function() {
         $(this).fadeIn(2000);
        });
      });
  };

  var complete = function(callback) {
    var callback = callback || bds.noop;

    d3o.transition()
        .duration(2500)
        .style('fill', 'silver')
        .style('stroke', 'black')
        .each('end', callback);
  };

  var wire = function() {
    $elem.on('click', function() {
      $.publish('bds_circle_click', self.id)
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
