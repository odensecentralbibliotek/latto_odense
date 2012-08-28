<div id="page<?php print $css_id ? " $css_id" : ''; ?>" class="<?php print $classes; ?>">

  <?php if (!empty($content['branding'])): ?>
    <div class="branding">
      <div class="grid-inner">
        <?php print render($content['branding']); ?>
      </div>
    </div>
  <?php endif; ?>

  <?php if (!empty($content['header'])): ?>
    <header class="grid-full">
      <div class="grid-inner clearfix">
        <?php print render($content['header']); ?>
      </div>
    </header>
  <?php endif; ?>

  <article class="grid-full">
    <div class="grid-inner">
      <?php print render($content['content']); ?>
      </div>
  </article>

  <?php if (!empty($content['footer'])): ?>
    <footer class="grid-full">
      <div class="grid-inner clearfix">
        <?php print render($content['footer']); ?>
      </div>
    </footer>
  <?php endif; ?>
  
  <?php if (!empty($content['bottom'])): ?>
    <div class="grid-full bottom">
      <div class="grid-inner">
        <?php print render($content['bottom']); ?>
      </div>
    </div>
  <?php endif; ?>

</div>
