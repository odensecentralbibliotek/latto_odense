jQuery(document).ready(function($) {
    $('#edit-name').keyup(function(e){
            if(!$('#edit-name').hasClass('hidetext') && $('#edit-name').val() != "")
            {
                $('#edit-name').addClass('hidetext');
            }
            else if( $('#edit-name').hasClass('hidetext') && $('#edit-name').val() == "")
            {
                $('#edit-name').removeClass('hidetext')
            }
            else if(e.which == 13)
            {
                $("#user-login-form").trigger("submit");
            }
    });
    $('#edit-name').on('blur input', function() {
            if(!$('#edit-name').hasClass('hidetext') &&  $('#edit-name').val() != "")
            {
                $('#edit-name').addClass('hidetext');
            }
    });
     $('#edit-name').focus(function(e){
         if( $('#edit-name').val() == "")
         {
             $('#edit-name').removeClass('hidetext');
         }
     });
     
     //password
     $('#edit-pass').keyup(function(e){
            if(!$('#edit-pass').hasClass('hidetext') && $('#edit-pass').val() != "")
            {
                $('#edit-pass').addClass('hidetext');
            }
            else if( $('#edit-pass').hasClass('hidetext') && $('#edit-pass').val() == "")
            {
                $('#edit-pass').removeClass('hidetext')
            }
            else if(e.which == 13)
            {
                $("#user-login-form").trigger("submit");
            }
    });
    $('#edit-pass').on('blur input', function() {
            if(!$('#edit-pass').hasClass('hidetext') &&  $('#edit-pass').val() != "")
            {
                $('#edit-pass').addClass('hidetext');
            }
    });
     $('#edit-pass').focus(function(e){
         if( $('#edit-pass').val() == "")
         {
             $('#edit-pass').removeClass('hidetext');
         }
     });
});


