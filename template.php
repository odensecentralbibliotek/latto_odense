<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * alters forms.
 */
function latto_odense_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'search_block_form':
      $form['search_block_form']['#attributes']['placeholder'] = t('Søge');
       unset($form['search_block_form']['#default_value']);
      $form['actions']['#suffix'] = '<div class="clearfix"></div>';
      break;

    case 'user_login_block':
      unset($form['name']['#title']);
      $form['name']['#attributes']['placeholder'] = t('Cpr- eller kortnummer:');
      $form['pass']['#attributes']['placeholder'] = t('Adgangskode:');
      unset($form['pass']['#title']);
      $form['links']['#markup'] = "";
      break;

    case 'comment_node_ding_news_form':
      $form['actions']['submit']['#prefix'] = '<div>';
      $form['actions']['submit']['#suffix'] = '</div>';
      $form['actions']['preview']['#prefix'] = '<div>';
      $form['actions']['preview']['#suffix'] = '</div>';
      $form['subject']['#type'] = 'hidden';
      break;
  }
}

/**
 * Implements HOOK_theme().
 */
/*
function latto_odense_theme() {
  return array(
    'nomarkup' => array(
      'render element' => 'element',
    ),
  );
}

function theme_nomarkup($variables){
  $output = '';
    //Render the items.
    foreach ($variables['items'] as $delta => $item){
  $output .= drupal_render($item);
 }
  return $output;
  }
  
*/
?>
