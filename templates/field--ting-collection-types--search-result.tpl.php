<?php

/**
 * @file field.tpl.php
 * removed ":"
 */
?>
<div class="availability content">
  <?php if (!$label_hidden): ?>
      <strong><?php print $label ?></strong>
  <?php endif; ?>
  <?php foreach ($items as $delta => $item): ?>
    <?php print render($item); ?>
  <?php endforeach; ?>
</div>