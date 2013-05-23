bds.make_app = function(svg, json, options) {
  var self = {},
      _playable = false
      ;

  var playable = function(v) {
    _playable = v;
  };

  var is_playable = function() {
    return _playable;
  };

  var on_start = function() {
    if ( self.started ) return;
    self.started = true;
    playable(true); 
    bds.circles.first();
    bds.start.off(); 
    $.publish('bds_play', [null, 3000]);
  };

  var on_moving = function() {
    if (! self.started) return;
    if (! self.moveable) return;
    bds.circles.leave_and_land(bds.dice.current_face);
    self.moveable = false;
    bds.move.off();
    bds.dice.off();
    playable(true);
    $.publish('bds_play', [null, 3000]);
  };

  var on_stage_complete = function(e) {
    self.rollable = true;
    playable(false);
    bds.circles.complete_stage(function() {
      bds.roller.on(); 
    });
  };

  var on_rolling = function() {
    if (! self.rollable ) return;
    bds.dice.roll();
    self.rollable = false
    self.moveable = true;
  };

  var on_rolled = function() {
    self.rollable = false;
    bds.roller.off();
    bds.move.on();
  };

  var on_play = function(e, id, delay) {
    if (! is_playable() ) return;

    if ( id ) {
      if (! bds.circles.is_current(id) )  
        return;
    }

    var delay = delay || 0;
    setTimeout(function() {
      bds.circles.current.play();
    }, delay);
  };

  // change params to option hash
  var hydrate = function(id, passed) {
    self.started = true;
    completed = bds.db.get( 'completed' );
    bds.circles.current = bds.circles.get(id);

    $.each(completed, function(k, v) {
      bds.circles.get(v).complete(null, true);  
    });

    bds.circles.current.pop(function() {
      if (passed) {
        $.publish('bds_stage_complete');
      }
    });

    bds.start.off();
  };

  var on_score_change = function() {
    bds.score.update();      
  };

  var wire = function() {
    $.subscribe('bds_start', on_start);
    $.subscribe('bds_moving', on_moving);
    $.subscribe('bds_stage_complete', on_stage_complete);
    $.subscribe('bds_rolled', on_rolled);
    $.subscribe('bds_rolling', on_rolling);
    $.subscribe('bds_play', on_play);
    $.subscribe('bds_score_change', on_score_change);
  };

  // API
  self.hydrate = hydrate;

  // init
  wire();
  bds.make_board(svg, json, options);

  if ( options.fresh ) {
    bds.db.wipe()
          .save('completed', []);
  }

  self.started = false;
  self.moveable = false;
  self.rollable = false;
  
  return self;
};
