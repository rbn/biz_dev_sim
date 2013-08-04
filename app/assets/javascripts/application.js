// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require d3.v3
//= require jquery.simplemodal-1.4.4
//= require jquery-bds
//= require_tree .

$(function() {

  $('.remove_fields').on('click', function(event) { 
    event.preventDefault();
    var $link = $(this),
        $hidden = $(this).prev("input[type=hidden]");

    $hidden.val("1");
    $link.closest('.fields').hide();
  });

 $('.add_fields').on('click', function(event) {
   event.preventDefault();
   var $link = $(this),
       association = $link.data('association'),
       content = $link.data('content'),
       hideChildAdds = $link.data('hidechildadds'), // don't show 'add <xyz>' for children
       new_id = new Date().getTime(),
       regex = new RegExp("new_" + association, "g");

     var $div = $('<div style="display:none">');
     $div.append(content.replace(regex, new_id))
         .insertBefore($link)
         .slideDown('slow');

   if ( hideChildAdds ) {
    $div.find('.childAdds').hide(); 
   }
 });

});
