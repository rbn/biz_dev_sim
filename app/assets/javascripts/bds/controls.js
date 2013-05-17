// //////////////////
// dice constructor
//
bds.make_dice = function($container) {
  var self = {},
      $die = $('<a href="#"></a>')
      ;

  var roll = function() {
    if (!self.ready) return;
    var rand = Math.floor((Math.random()*3) + 1);
    self.current = rand;
    place(self.current);
  };

  var set = function(i) {
    if ( self.ready )
      $die.html('').append('<img src="/assets/dice/Blue_' + i + '.png" /></a>');
    else
      $die.html('').append('<img src="/assets/dice/Blue_' + i + '_frozen.png" /></a>');
  };

  var make_ready = function() {
    self.ready = true;
    place(self.current);
  };

  var make_frozen = function() {
    self.ready = false;
    place(self.current);
  };

  var place = function(n) {
    var n = n || self.current;
    $die.fadeOut('slow', function() {
      set(n);
      $container.html('').append($die); 
      apply_behavior();
      $die.fadeIn();
    });
  };

  var apply_behavior = function() {

    $die
      .on('click', roll)
      .hover(function() {

      },
      function() {

      });

  };

  // API
  self.roll = roll;
  self.make_ready = make_ready;
  self.current = 1;
  self.make_frozen = make_frozen;
  self.place = place;

  // init
  place(1); // init die to 1
  
  return self;
}

///////////////////////////
// start button constructor
// 
bds.make_start = function($container) {
  var self = {},
      $start = $('<div>START</div>');

  var start = function() {
    bds.circle_tracker.start.click();
    self.started = true; 
    bds.dice.make_ready(); // this should be changed by the die, by responding to an event that this control raises!
    disable();
  };

  var apply_styles = function() {
    $start.css('width', '100px')
          .css('height', '50px')
          .css('background-color', '#33efe4')
          .css('padding', '4px');
    return this;
  };

  var apply_behavior = function() {
    $start.on('click', start);
    return this;
  };

  var disable = function() {
    $start.css('background-color', 'silver')
          .css('border', '1px dashed black')
          .off('click');
  };

  // API
  self.start = start;

  // init
  apply_styles();
  apply_behavior();
  $start.appendTo($container);

  return self;
};

// ///////////////////
// move button ctr
// 
bds.make_move = function($container) {
  var self = {},
      $move = $('<div>MOVE</div>');

  var move = function() {
    if ( !bds.start.started )
      return false;

    if ( !bds.dice.ready )
      return false;

    bds.circle_tracker.move(bds.dice.current);
    // TODO: again, raise a 'move' event here so that the die can respond
    bds.dice.ready = false;
    bds.dice.place();
  };

  var wire = function() {
    $move.on('click', move);
    $move.appendTo($container);
  };

  var style = function() {
    $move.css('width', '100px')
         .css('height', '50px')
         .css('background-color', '#543be3')
         .css('color', 'white')
         .css('padding', '4px');
  };

  self.move = move;

  // init
  wire();
  style();
  return self;
};
