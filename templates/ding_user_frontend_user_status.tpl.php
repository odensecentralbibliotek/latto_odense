<?php
/**
 * @file
 * Template to render the user status block.
 */
?>
<div id="bruger-wrapper">
  <h2><?php print t('User menu'); ?></h2>
  <div id="ding-user-profile">
    <span><?php print l(t('My profile'), 'user/'); ?></span>
    <span style="float:right;"><?php print '<a href="javascript: Drupal.ninja_logout();">'.t('Logout').'</a>'; ?></span>
  </div>
  <div id="ding-user-loan-amount">
    <span class="label amount">(<?php print $loan_count; ?>)</span>
    <span ><?php print l(t('Loans:'), 'user/' . $user->uid . '/status'); ?></span>
  </div>
  <div id="ding-user-reservation-amount">
    <span class="label amount">(<?php print $reservation_count; ?>)</span>
    <span><?php print l(t('Reservations:'), 'user/' . $user->uid . '/status/reservations'); ?></span>
  </div>
  <div id="ding-user-debt-amount">
    <span class="label amount">(<?php print $debt_count; ?>)</span>
    <span><?php print l(t('Debts:'), 'user/' . $user->uid . '/status/debts'); ?></span>
  </div>
  <div id="ding-user-bookmark-amount">
    <span class="label amount">(<?php print $bookmark_count; ?>)</span>
    <span><?php print l(t('Bookmarks:'), 'user/' . $user->uid . '/bookmarks'); ?></span>
  </div>
</div>
