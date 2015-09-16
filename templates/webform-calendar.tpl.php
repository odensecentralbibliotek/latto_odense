<?php
/**
* This replaces the webform date selectors with a single text box & date popup.
*/
/** Recursive function to return an array containing form_keys of component and all parent components **/
// end of function getFormKeys($components, $component);
$node = node_load($component['nid']);
$form_keys = getFormKeys($node->webform['components'], $component);
$form_key = join('-', $form_keys);
$form_key = str_replace('_', '-', $form_key);
?>
<input type="text" id="edit-submitted-<?php print $form_key ?>" class="form-text <?php print implode(' ', $calendar_classes); ?>" alt="<?php print t('Open popup calendar'); ?>" title="<?php print t('Open popup calendar'); ?>" />
<script type="text/JavaScript">
(function ($) {
  $('#edit-submitted-<?php print $form_key; ?>').datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'dd-mm-yy',
    onSelect: function() {
      var mydate = $('#edit-submitted-<?php print $form_key; ?>').datepicker("getDate");
      $('#edit-submitted-<?php print $form_key; ?>-day').val(mydate.getDate());
      $('#edit-submitted-<?php print $form_key; ?>-year').val(mydate.getFullYear());
      $('#edit-submitted-<?php print $form_key; ?>-month').val(mydate.getMonth() + 1);
    }
  });
  var myYear = $('#edit-submitted-<?php print $form_key; ?>-year').val();
  var myMonth = $('#edit-submitted-<?php print $form_key; ?>-month').val();
  var myDate = $('#edit-submitted-<?php print $form_key; ?>-day').val();
  if((myYear != '') && (myMonth != '') && (myDate != '')) {
    var pad = "00";
    var paddedMonth = pad.substring(0, pad.length - myMonth.length) + myMonth;
    var paddedDate = pad.substring(0, pad.length - myDate.length) + myDate;
    $('#edit-submitted-<?php print $form_key; ?>').val(myYear + '-' + paddedMonth + '-' + paddedDate);
  }
})(jQuery);
</script>