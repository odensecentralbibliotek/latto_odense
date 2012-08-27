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
      $form['search_block_form']['#attributes']['placeholder'] = t('Search');
      $form['actions']['#suffix'] = '<div class="clearfix"></div>';
      break;

    case 'user_login_block':
      $form['name']['#prefix'] = '<span class="login-text">' . t('Log in:') . '</span>';
      unset($form['name']['#title']);
      $form['name']['#attributes']['placeholder'] = t('cpr. or card no.');
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
?>
