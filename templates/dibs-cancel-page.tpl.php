<?php

/**
 * @file dibs-cancel-page.tpl.php
 *
 * Theme implementation to display the dibs cancel page
 *
 * Available variables:
 * - $form:  The whole form element as a string.
 * - $settings: Full DIBS settings array.
 * - $transaction: Full transaction array with all info about
 *   the transaction.
 *
 * @see template_preprocess()
 * @see template_preprocess_dibs_cancel_page()
 */
global $user;
?>
<script>
jQuery(document).ready(function () {
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "<?php echo "/user" . $user->uid . "/status/debts/"; ?>";
    }, 2000);
});
</script>
<div id="dibs-cancel-page-<?php print $transaction['api_module']; ?>-<?php print $transaction['api_delta']; ?>" class="dibs-cancel-page clear-block">
  <p><?php print t('The payment was cancelled. Please click the button below to retry.'); ?></p>
</div>
