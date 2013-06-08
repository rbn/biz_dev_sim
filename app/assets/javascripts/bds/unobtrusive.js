$(function() {

  // stage button - back to board
  $('input#back_to_board').on('click', function() {
    alert('test!!!');
    
    // handle this through bds
    var arr = JSON.parse(localStorage.completed);
    // arr.push( <%= @stage.id %> ); 
    localStorage.completed = JSON.stringify(arr);

    $('#stage').fadeOut(1200, function() {
      $('#thediv').html('');
      start_bds(false, function() {
        // get from hidden input? or url?
        // bds.app.hydrate(<%= @stage.id %>, true);
        $('#thediv').fadeIn(4000);
      });
    });
  });

  // stage button - submit answer
  $('input#answer_submit').on('click', function() {
    $('.answer').slideDown('slow');
    setTimeout(function() {
      $('div.back_to_board').slideDown('slow');
    }, 3000);
  });

});
