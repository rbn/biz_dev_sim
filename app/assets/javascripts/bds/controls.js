// //////////////////
// dice constructor
//
// TODO: change container param to options hash, so we can use same variable name
// inside method w.o fear of name confusion (contain/container problem)
bds.make_dice = function($container) {
  var self = {},
      $die = $('<a href="#"></a>')
      ;

  var roll = function() {
    self.current_face =  Math.floor((Math.random()*3) + 1);
    on();
    $.publish('bds_rolled');
  };

  var on = function() {
    var img = '<img src="/assets/dice/Blue_';
    img += self.current_face;
    img += '.png" />';
    $die.html('').append(img);
  };

  var off = function() {
    var img = '<img src="/assets/dice/Blue_';
    img += self.current_face;
    img += '_frozen';
    img += '.png" />';
    $die.html('').append(img);
  };

  // API
  self.roll = roll;
  self.on = on;
  self.off = off;

  $die.appendTo($container);
  return self;
}

///////////////////////////
// roller button ctr
//
// TODO: can these control elems user a factory?
bds.make_roller = function($container) {
  var self = {},
      $contain = $container,
      $roller = $('<a href="#"></a>')
      ;

  var wire = function() {
    $roller.on('click', function() {
      $.publish('bds_rolling'); 
    });
  };
  
  var on = function() {
    $roller.html('').append('<img src="/assets/controls/roller1.jpg" />');
  };

  var off = function() {
    $roller.html('').append('<img src="/assets/controls/roller1_gray.jpg" />');
  };

  // API
  self.on = on;
  self.off = off;

  // init
  wire();
  off();
  $roller.appendTo($container);

  return self;
};

///////////////////////////
// start button constructor
// 
bds.make_start = function($container) {
  var self = {},
      $start = $('<div class="bds_button">START</div>')
      ;

  var on = function() {
    $start.removeClass('off').addClass('on');
  };

  var off = function() {
    $start.removeClass('on').addClass('off');
  };

  var wire = function() {
    $start.on('click',function() {
      $.publish('bds_start');
    });
  };

  // API
  self.on = on;
  self.off = off;

  // init
  wire();
  on();
  $start.appendTo($container);

  return self;
};

// ///////////////////
// move button ctr
// 
bds.make_move = function($container) {
  var self = {},
      $move = $('<a href="#"></a>');

  var move = function() {
    $.publish('bds_moving'); 
  };

  var on = function() {
    $move.html('').append('<img src="/assets/controls/go.png" />');
  };

  var off = function() {
    $move.html('').append('<img src="/assets/controls/go_gray.png" />');
  };

  var wire = function() {
    $move.on('click', move);
  };

  // API
  self.on = on;
  self.off = off;

  // init
  wire();
  off();
  $move.appendTo($container);

  return self;
};
