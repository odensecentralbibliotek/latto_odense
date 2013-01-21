<?php
/**
 * @file
 * Template to render the user status block.
 */
?>
<div id="bruger-wrapper">
  <h2><?php print t('User menu'); ?></h2>
  <div>
    <span ><?php print l(t('Loans:'), 'user/' . $user->uid . '/status'); ?></span>
    <span class="label">(<?php print $loan_count; ?>)</span>
  </div>
  <div>
    <span><?php print l(t('Reservations:'), 'user/' . $user->uid . '/status/reservations'); ?></span>
    <span class="label">(<?php print $reservation_count; ?>)</span>
  </div>
  <div>
    <span><?php print l(t('Debts:'), 'user/' . $user->uid . '/status/debts'); ?></span>
    <span class="label">(<?php print $debt_count; ?>)</span>
  </div>
  <div>
    <span><?php print l(t('Bookmarks:'), 'user/' . $user->uid . '/bookmarks'); ?></span>
    <span class="label">(<?php print $bookmark_count; ?>)</span>
  </div>
  <div>
    <span><?php print l(t('My profile'), 'user/'); ?></span>
  </div>
  <div>
    <span><?php print l(t('Logout'), 'user/logout/'); ?></span>
  </div>
</div>
