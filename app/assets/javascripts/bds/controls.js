// //////////////////
// dice constructor
//
bds.make_dice = function($container, app) {
  var self = {},
      $die = $('<a href="#"></a>'),
      app = app
      ;

  var roll = function() {
    if (!self.ready) return;
    $.publish('bds_roll');
    var rand = Math.floor((Math.random()*3) + 1);
    $die.fadeOut('slow', function() {
      place(rand);
      $die.fadeIn();
    })
  };



  var make_frozen = function() {
    self.ready = false;
    place();
  };

  var place = function(n) {
    
  var set = function(i) {
      if ( self.ready )
        $die.html('').append('<img src="/assets/dice/Blue_' + i + '.png" /></a>');
      else
        $die.html('').append('<img src="/assets/dice/Blue_' + i + '_frozen.png" /></a>');
    };
    self.current = n || self.current;
    set(self.current);
    $container.html('').append($die); 
    wire();
  };

  var on_move = function() {
    make_frozen();
  };

  var on_stage_complete = function() {
    self.ready = true;
    place(self.current);
  };

  var wire = function() {
    $.subscribe('bds_move', on_move);
    $.subscribe('bds_stage_complete', on_stage_complete);

    $die
      .on('click', roll)
      .hover(function() {

      },
      function() {

      });
  };

  // API
  self.roll = roll;
  self.current = 1;
  self.place = place;

  // init
  wire();
  place(1); // init die to 1
  
  return self;
}

///////////////////////////
// start button constructor
// 
bds.make_start = function($container, app) {
  var self = {},
      $start = $('<div>START</div>')
      app = app
      ;

  var start = function() {
    $.publish('bds_start');
    disable();
  };

  var style = function() {
    $start.css('width', '100px')
          .css('height', '50px')
          .css('background-color', '#33efe4')
          .css('padding', '4px');
    return this;
  };

  var wire = function() {
    $start.on('click', start);
  };

  var disable = function() {
    $start.css('background-color', 'silver')
          .css('border', '1px dashed black')
          .off('click');
  };

  // API
  self.start = start;

  // init
  style();
  wire();
  $start.appendTo($container);

  return self;
};

// ///////////////////
// move button ctr
// 
bds.make_move = function($container, app) {
  var self = {},
      $move = $('<div>MOVE</div>')
      app = app;

  var move = function() {
    if (! app.started) return;
    if (! app.moveable) return;
    $.publish('bds_move'); 
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

  // init
  wire();
  style();
  return self;
};
