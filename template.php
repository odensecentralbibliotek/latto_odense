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
       unset($form['search_block_form']['#default_value']);
      $form['actions']['#suffix'] = '<div class="clearfix"></div>';
      break;

    case 'user_login_block':
      unset($form['name']['#title']);
      $form['name']['#attributes']['placeholder'] = t('Cpr- eller kortnummer:');
      $form['pass']['#attributes']['placeholder'] = t('Adgangskode:');
      unset($form['pass']['#title']);
      $form['links']['#markup'] = "";
      $form['actions']['submit']['#attributes']['class'][] = 'btn';

      $form['actions']['submit']['#attributes']['class'][] = 'btn-info';
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
 * Implements theme_menu_tree().
 *
 * Addes wrapper clases for the default menu.
 */
function latto_odense_menu_tree__menu_block__1($vars) {
  return '<ul class="main-menu">' . $vars['tree'] . '</ul>';
}


function latto_odense_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  
  $element['#attributes']['class'][] = 'level-' . $element['#original_link']['depth'];
 
 
  if (isset($element['#original_link']['options']['attributes']['class'])) {
    $array_class = $element['#original_link']['options']['attributes']['class'];
    $count = count($array_class);
   
    for ($i=0; $i <= $count; $i++){     
      if (substr($array_class[$i], 0, 5) == 'icon-' ){
        $icon = '<i class="' . $array_class[$i] . '"></i>';
        $output = '<a href="';
        if (isset($element['#original_link']['options']['attributes']['rel']) != 'nofollow') {
          $output .=  $element['#href']; // If rel is set to 'nofollow' I don't need the link because I use it to activate Javascript. Remove these line if not a needed function...
        }
       
        $output .= '" title="' . $element['#title'] . '">' . $element['#title'] .'<br/><br/>'. $icon . '</a>';
       
        return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
      }
    }
  }
  else {
    $output = l($element['#title'], $element['#href'], $element['#localized_options']);
   
    if ($element['#below']) {
        $sub_menu = drupal_render($element['#below']);
      }
     
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
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
