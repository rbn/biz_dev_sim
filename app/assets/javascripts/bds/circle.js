// track circles out in the field
bds.circle_tracker = (function() {
  var self = {};

  var add = function(id, circle) {
    self[id] = circle;
    if ( circle.is_start() ) {
      self.start = circle;
      self.current = self.start;
     }
  };

  var move = function(n) {
    var starting = self.current;
    for(i = 0; i < n; i ++) {
      var next_id = self.current.next()[0];
      self.current = self[next_id];
    }
    
    starting.click();
    self.current.click();
  };
  
  self.add = add;
  self.move = move;

  return self;
})();

// circle constructor
bds.make_circle = function(elem) {
  var self = {}, 
      $elem = $(elem),
      d3o = d3.select(elem),
      starting_radius = d3o.attr('r'),
      id = 1,
      name = "my first circle",
      isBig = false
      ;

  var name = function() {
    return _name;
  };
    
  var enlarge = function() {
    d3o.transition()
       .attr('r', starting_radius * 4);
    isBig = true;
  };

  var shrink = function() {
    d3o.transition()
       .attr('r', starting_radius);
    isBig = false;
  };

  var click = function() {
    if ( !isBig ) {
      enlarge();
      self.sticky = !self.sticky;
    }
    else
      shrink();

  };

  var apply_behavior = function() {
    // behaviour
    $elem.hover(function() {
      if (!self.sticky)
        enlarge();
      return false;
    },
    function() {
      if (!self.sticky)
        shrink();
      return false;
    });
    
    $elem.on('click', click);
  };

  var is_start = function() {
    return $elem.data('start');
  };

  var next = function() {
    return $elem.data('next');
  };

  self.name = name;
  self.enlarge = enlarge;
  self.shrink = shrink;
  self.sticky = false;
  self.click = click;
  self.is_start = is_start;
  self.next = next;

  // init
  apply_behavior();
  bds.circle_tracker.add($elem.attr('id'), self); 

  return self;
}
