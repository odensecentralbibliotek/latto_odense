jQuery(document).ready(function($) {
    $('#edit-name').keyup(function(e){
            debugger;
            if(!$('#edit-name').hasClass('hidetext') && $('#edit-name').val() != "")
            {
                debugger;
                $('#edit-name').addClass('hidetext');
            }
            else if( $('#edit-name').hasClass('hidetext') && $('#edit-name').val() == "")
            {
                debugger;
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
});


