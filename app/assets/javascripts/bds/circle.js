bds.make_circle = function(elem) {
  var self = {}, 
      $elem = $(elem),
      _d3o = d3.select(elem),
      _starting_radius = _d3o.attr('r'),
      _id = 1,
      _name = "my first circle",
      _isBig = false
      ;

  var name = function() {
    return _name;
  };
    
  var enlarge = function() {
    _d3o.transition()
       .attr('r', _starting_radius*4);
    _isBig = true;
  }

  var shrink = function() {
    _d3o.transition()
       .attr('r', _starting_radius);
    _isBig = false;
  }

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
  
  $elem.on('click', function() {
    self.sticky = !self.sticky;
  });

  self.name = name;
  self.enlarge = enlarge;
  self.shrink = shrink;
  self.sticky = false;

  return self;
}
