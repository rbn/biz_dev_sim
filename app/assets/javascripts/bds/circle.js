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

  var wire = function() {
    $.subscribe('bds_start', on_start);
    $.subscribe('bds_move', on_move);
  };

  var on_start = function(e) {
    self.start.click(); 
  };

  var on_move = function(e) {
    var orig = self.current;

    for(i = 0; i < bds.dice.current; i ++) {
      var next_id = self.current.next()[0];
      self.current = self[next_id];
    }

    self.current.click();
  };
  
  self.add = add;

  // init
  wire();

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
    else {
      shrink();
    }
  };

  var wire = function() {
    // behaviour
    $elem.hover(function() {
    },
    function() {
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
  wire();
  bds.circle_tracker.add($elem.attr('id'), self); 

  return self;
}
