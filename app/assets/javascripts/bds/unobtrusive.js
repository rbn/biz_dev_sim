$(function() {

  // stage button - back to board
  var stage_id = $('input#stage_id').val();
  $('input#back_to_board').on('click', function() {
    // handle this through bds
   var arr = JSON.parse(localStorage.completed);
   arr.push( stage_id ); 
   localStorage.completed = JSON.stringify(arr);

    $('#stage').fadeOut(1200, function() {
      $('#thediv').html('');
      start_bds(false, function() {
        // get from hidden input? or url?
        bds.app.hydrate(stage_id, true);
        $('#thediv').fadeIn(4000);
      });
    });
  });


  $('form#stage')
    .on('ajax:beforeSend', function(e, xhr, settings) {
      var $button = $(this).find('input[name="submit"]');
      $button.data('origText', $button.val() );
      $button.val( 'validating ... ');
    })
    
    .on('ajax:success', function(e, data, status, xhr) {
      var $form = $(this),
          $result = $form.find('div.stage_result'),
          $explanation = $form.find('div.explanation'),
          result = data.result;

      // $(this).find('input:text,textarea').val('');
      // $(this).find('validation-error').empty();

        var $msg = $('<p>' + result.message + '</p>');

        $result
          .html('')
          .append($msg);

        if ( result.explanation ) {
          $explanation
            .prepend('<p>' + result.explanation + '</p>')
            .slideDown('slow');
        }

    setTimeout(function() {
      $('div.back_to_board').slideDown('slow');
    }, 3000);



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
