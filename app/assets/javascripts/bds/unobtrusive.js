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

  $('form#stage')
    .on('ajax:beforeSend', function(e, xhr, settings) {
      var $button = $(this).find('input[name="submit"]');
      $button.data('origText', $button.val() );
      $button.val( 'validating ... ');
    })
    
    .on('ajax:success', function(e, data, status, xhr) {
      var $form = $(this);

      alert(JSON.stringify(data));
      $(this).find('input:text,textarea').val('');
      $(this).find('validation-error').empty();

      // $form.find('textarea,input[type="text"],input[type="file"]').val('');
      // $form.find('div.validation-error').empty();
    })

    .on('ajax:complete', function(e, xhr, status) {
      var $button = $(this).find('input[name="submit"]');
      $button.val( $button.data('origText') );
    })

    .on('ajax:error', function(e, xhr, status, error) {
      var dataFormat = $(this).data('format');


      
      // var $form = $(this),
      //     errors, errorText;

      // try {
      //   errors = $.parseJSON(xhr.responseText);
      // } catch (err) {
      //   errors = { message: 'Please reload the page and try again.' };
      // }

      // errorText = 'There were errors with the submission: \n<ul>';

      // for(error in errors) {
      //   errorText += '<li>' + error  + ' : ' + errors[error] + '</li>';
      // }

      // errorText += '</ul>';

      // $form.find('div.validation-error').html(errorText);
    })
    
    ;

});
