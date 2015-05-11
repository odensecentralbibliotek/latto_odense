<?php
  // Hide elements so we can render them later.
  hide($content['comments']);
  hide($content['links']);
?>
<div class="<?php print $classes; ?>">
   <?php if($node->type != "poll"){ ?>
  <h1 class="page-title"><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h1>
   <?php }else{
    /*
     * This heading is only used when a poll is embedded inside content.
     * Due to the nature of entity reference , it does not trigger the usual template.
     * and thus heading is always h1.
     */
?>
  <h3 class="page-title"><?php print $title; ?></h3>
  
<?php } ?>
  <div class="content"<?php print $content_attributes; ?>>
    <?php print render($content); ?>
  </div>

</div>
