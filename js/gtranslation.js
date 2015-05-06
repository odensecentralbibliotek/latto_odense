/* 
 * Integrates the google translation bar into the site.
 * It injects a translation link that opens into a dialog where you can select
 * the language.
 */
jQuery(document).ready(function(){
    //Add the link to top of page.
    //CloseTranslationDialogHooks = false;
    if(typeof Drupal.settings.oc_template_overwrites !== 'undefined' &&
           Drupal.settings.oc_template_overwrites.google_translate_enabled == 1 )
    {
        var TranslateLink = jQuery("#page").children();
        TranslateLink.first().prepend('<div id="Translation_Menu_Addon" class="grid-inner" style=""><a onclick="ShowTranslationDialog()" >'+ Drupal.t('Translate')+'</a>\n\
                                   </div><div onclick="" id="Translation_dialog" title="Vælg Sprog" style="display:none;"><div id="google_translate_element"></div></div>');
    }
    
});
//Callback after google translate init.
function googleTranslateElementInit() {
    var languages = '';
    try {
        languages = Drupal.settings.oc_template_overwrites.google_translate_languages;
    } catch (e) {
        
    }  
    new google.translate.TranslateElement({pageLanguage: 'da', includedLanguages: languages, layout: google.translate.TranslateElement.InlineLayout.SIMPLE,autoDisplay: false, gaTrack: true, gaId: 'UA-3030685-7'}, 'google_translate_element');  
}
function ShowTranslationDialog(e)
{
    var Languages = jQuery('.goog-te-menu-frame').contents().find('.goog-te-menu2-item');
    jQuery.each(Languages,function(index,value){
        value.addEventListener("click", function(){
         jQuery( "#Translation_dialog" ).dialog( "close" );
     });
    });
    jQuery( "#Translation_dialog" ).dialog({
        modal: true,
        buttons: {
        Luk: function() {
                jQuery( this ).dialog( "close" );
            }
         }
    });
}

