bds.make_dice = function($container) {
  var self = {},
      $die = $('<a href="#"></a>');

  var roll = function() {
    $die.fadeOut('slow', function(){ 
      var rand = Math.floor((Math.random()*3) + 1);
      place_die(get_die(rand));
    });
  };

  var get_die = function(i) {
    return $die.html('').append('<img src="/assets/dice/Blue_' + i + '.png" /></a>');
  };

  var place_die = function($die) {
   $container.html('').append($die); 
    $die.on('click', roll);
    $die.fadeIn();
  };

  // API
  self.roll = roll;

  // init

  $die.hover(function() {

  },
  function() {
  });

  place_die(get_die(1)); // init die to 1
  
  return self;
}
