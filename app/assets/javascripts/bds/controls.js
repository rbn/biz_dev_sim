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

  $container.html($die);
  return self;
}

///////////////////////////
// roller button ctr
//
// TODO: can these control elems user a factory?
bds.make_roller = function($container) {
  var self = {},
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
  $container.html($roller);

  return self;
};

///////////////////////////
// start button constructor
// 
bds.make_start = function($container) {
  var self = {},
      $start = $('<a href="#"></a>')
      ;

  var on = function() {
    $start.html('').append('<img src="/assets/controls/start.jpg" />');
  };

  var off = function() {
    $start.html('').append('<img src="/assets/controls/start_gray.jpg" />');
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
  $container.html($start);
  return self;
};

// ///////////////////
// go button ctr
// 
bds.make_go = function($container) {
  var self = {},
      $go = $('<a href="#"></a>');

  var go = function() {
    $.publish('bds_go'); 
  };

  var on = function() {
    $go.html('').append('<img src="/assets/controls/go.png" />');
  };

  var off = function() {
    $go.html('').append('<img src="/assets/controls/go_gray.png" />');
  };

  var wire = function() {
    $go.on('click', go);
  };

  // API
  self.on = on;
  self.off = off;

  // init
  wire();
  off();
  $container.html($go);

  return self;
};

//////////////////////////
// score ctr
//
bds.make_score = function($container) {
  var self = {},
      $div = $('<div>'),
      $label = $('<div>Score</div>'),
      $value = $('<div>');

  var on = function() {
    var current_score = bds.db.get('score') || 0;
    $value.text( current_score );
  };

  var update = function() {
    $value.slideUp('slow', function() {
      on();
      $value.slideDown('slow');
    });
  };

  // API
  self.on = on;
  self.update = update;

  on();
  $div.append($label).append('<br />').append($value);
  $div.css('height', '100%');
  $label.css('font-size', '14px').css('padding', '4px');
  $value.css('font-size', '36px').css('margin', 'auto').css('text-align', 'center');
  $container.html($div);

  return self;
};


//////////////////////////////
//  start over
//
bds.make_start_over = function($container) {
  var self = {},
      $div = $('<div>');

  // init
  $div.css('padding', '10px').css('background-color', 'silver');
  $div.append('start over!');
  $container.html($div);

  return self;
};


//////////////////////////////
//  start over
//
bds.make_show_potentials = function($container) {
  var self = {},
      $div = $('<div>');



  // init
  $div.on('click', function() {
    $.publish('bds_show_potentials');
  });

  $div.css('padding', '10px').css('background-color', 'silver');
  $div.append('show potential next moves');
  $container.html($div);

  return self;
};

