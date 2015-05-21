/* 
 * Integrates the google translation bar into the site.
 * It injects a translation link that opens into a dialog where you can select
 * the language.
 */
jQuery(document).ready(function(){
    
    if(typeof Drupal.settings.oc_template_overwrites !== 'undefined' &&
    Drupal.settings.oc_template_overwrites.google_translate_enabled == 1 )
    {
        googleTranslateElementInit();
    }
    setTimeout(function(){ 
    if(!jQuery('#google_translate_element').length || jQuery('#google_translate_element').is(':empty') )
    {
        /*
         * This is required only for IE. The callback function is not always triggerd
         * But the translate object is loaded fine and we can just init it then.
         * the timeout can be tweaked for bedst possible user experiance.
         */
        //Add the link to top of page.
        //CloseTranslationDialogHooks = false;
        if(typeof Drupal.settings.oc_template_overwrites !== 'undefined' &&
               Drupal.settings.oc_template_overwrites.google_translate_enabled == 1 )
        {
            googleTranslateElementInit();
        }
    }
    
    }, 1000);
});
//Callback after google translate init.
function googleTranslateElementInit() {
    if(typeof Drupal.settings.oc_template_overwrites !== 'undefined' &&
    Drupal.settings.oc_template_overwrites.google_translate_enabled == 1 )
{
    if(!jQuery('#Translation_Menu_Addon').length)
    {
         var TranslateLink = jQuery("#page").children();
        TranslateLink.first().prepend('<div id="Translation_Menu_Addon" class="grid-inner" style=""><a onclick="ShowTranslationDialog()" >'+ 'Translate'+'</a>\n\
                                   </div><div onclick="" id="Translation_dialog" title="Vælg Sprog" style="display:none;"><div id="google_translate_element"></div>\n\
                                   <br/><div style="font-size:12px;">'+Drupal.t('Vi gør opmærksom på, at denne funktion er en maskinel oversættelse og derfor ikke altid er helt korrekt.')+'</div></div>');
    }
    var languages = '';
    try {
        languages = Drupal.settings.oc_template_overwrites.google_translate_languages;
        new google.translate.TranslateElement({pageLanguage: 'da', includedLanguages: languages, autoDisplay: false, gaTrack: true, gaId: 'UA-3030685-7'}, 'google_translate_element');  
    } catch (e) {
        
    }  
}
    
}
function ShowTranslationDialog(e)
{
   jQuery('.goog-te-combo').on('change',function(){
       jQuery( "#Translation_dialog" ).dialog( "close" );
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

