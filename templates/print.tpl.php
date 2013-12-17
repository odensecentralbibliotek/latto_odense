<?php

/**
 * @file
 * Default print module template
 *
 * @ingroup print
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php print $print['language']; ?>" xml:lang="<?php print $print['language']; ?>">
  <head>
    <?php print $print['head']; ?>
    <?php print $print['base_href']; ?>
    <title><?php print $print['title']; ?></title>
    <?php print $print['scripts']; ?>
    <?php print $print['sendtoprinter']; ?>
    <?php print $print['robots_meta']; ?>
    <?php print $print['favicon']; ?>
    <?php print $print['css']; ?>
  </head>
  <body>
    <?php if (!empty($print['message'])) {
      print '<div class="print-message">'. $print['message'] .'</div><p />';
    } ?>
    <div class="print-logo"><?php print $print['logo']; ?></div>
    <div class="print-site_name"><?php print $print['site_name']; ?></div>
    <p />
    <div class="print-breadcrumb"><?php print $print['breadcrumb']; ?></div>
    <hr class="print-hr" />
    <div class="print-content"><?php print $title; ?></div>
    <?php if ($print['node']->field_ding_news_title_image['und'][0]['uri']) : ?>
    <p class="print-content"><img src='<?php print file_create_url($print['node']->field_ding_news_title_image['und'][0]['uri']); ?>' style='width:240px; height:240px;' /></p>
    <?php endif; ?>
    <?php if ($print['node']->field_ding_event_title_image['und'][0]['uri']) : ?>
    <p class="print-content"><img src='<?php print file_create_url($print['node']->field_ding_event_title_image['und'][0]['uri']); ?>' style='width:240px; height:240px;' /></p>
    <?php endif; ?>
    <?php if ($print['node']->field_ding_page_title_image['und'][0]['uri']) : ?>
      <p class="print-content"><img src='<?php print file_create_url($print['node']->field_ding_page_title_image['und'][0]['uri']); ?>' style='width:240px; height:240px;' /></p>
    <?php endif; ?>
    <p class="print-content label label-info"><?php print $print['node']->field_ding_news_category['und'][0][taxonomy_term]->name; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_news_lead['und'][0]['value']; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_event_lead['und'][0]['value']; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_page_lead['und'][0]['value']; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_news_body['und'][0]['value']; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_event_body['und'][0]['value']; ?></p>
    <p class="print-content"><?php print $print['node']->field_ding_page_body['und'][0]['value']; ?></p>
    
    <div class="print-footer"><?php print $print['footer_message']; ?></div>
    <hr class="print-hr" />
    <div class="print-source_url"><?php print $print['source_url']; ?></div>
    <div class="print-links"><?php print $print['pfp_links']; ?></div>
    <?php print $print['footer_scripts']; ?>
  </body>
</html>
