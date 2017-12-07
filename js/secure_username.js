var current_username = "";
jQuery(document).ready(function($) {

    //is username already autofilled ?
    var data = $('edit-name').val();
      //register events  
     $('#edit-name').keypress(function(e){
           if (e.which && e.which != 8 && e.which != 46 && e.which != 13) {
               e.preventDefault();
               
                 var charStr = String.fromCharCode(e.which);
                 current_username += charStr;
                 $('#edit-name').val($('#edit-name').val() + "•")
            }
            else if(e.which == 46 || e.which == 13)
            {
                var tmp = $('#edit-name').val();
                if(tmp.indexOf("•") == -1)
                {
                    current_username = tmp;
                    var mask = "";
                    for(var i = 0;i < tmp.length;i++)
                    {
                        mask += "•";
                    }
                    $('#edit-name').val(mask);

                }
                trigger_loginSpinner();
                $('#user-login-form').trigger("submit");
            }
       });
       $('#edit-name').change(function(){
          var tmp = $('#edit-name').val();
          if(tmp.indexOf("•") == -1)
          {
              current_username = tmp;
              var mask = "";
              for(var i = 0;i < tmp.length;i++)
              {
                  mask += "•";
              }
              $('#edit-name').val(mask);
              
          }
       });
     $('#user-login-form').submit(function(){
         var hidden_input = $('<input>').attr('name','name').attr("type","hidden").val(current_username);
         $(this).append(hidden_input);
     });
});


