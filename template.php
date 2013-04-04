<?php
/**
 * Implements hook_form_FORM_ID_alter().
 */
function latto_odense_form_user_profile_form_alter(&$form, &$form_state) {

  $account = $form_state['user'];

  $form['mail'] = array(
    '#title' => t('Email'),
    '#type' => 'textfield',
    '#default_value' => $account->mail,
    '#weight' => 0,
    '#required' => TRUE,
  );

  $updates = array(
    'mail' => $form['mail']['#default_value'],
  );

  user_save($account, $updates);
}

/**
 * Implementation of hook_menu_alter().
 */
function latto_odense_menu_alter(&$items, $account) {
  global $user;
  if (ding_user_is_provider_user($user)) {
    unset($items['user/%user/edit']);
    $items['user/%user/edit']['type'] = MENU_CALLBACK;

    $items['user/%user/provider_alma'] = array(
      'title' => 'Edit user profile',
      'page callback' => 'latto_odense_redirect_add_listing',
      'access callback' => TRUE,
      'type' => MENU_LOCAL_TASK,
    );
  }
  return $items;
}
/**
* Page callback which redirects to the /edit/provider_alma
*/
function latto_odense_redirect_add_listing() {
$path_parts = explode('/', drupal_get_path_alias($_GET['q']));
drupal_goto('user/'.$path_parts[1]. '/edit/provider_alma');
}
/**
 * Implements hook_preprocess_table().
 * adds classes table table-striped
 */
function latto_odense_preprocess_table(&$variables) {
  if (isset($variables['attributes']['class']) && is_string($variables['attributes']['class'])) {
    // Convert classes to an array.
    $variables['attributes']['class'] = explode(' ', $variables['attributes']['class']);
  }

  $variables['attributes']['class'][] = 'table table-striped';
}

/**
 * alters forms.
 */
function latto_odense_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'search_form':
      
      $form['actions']['reset'] = array(
      '#markup' => '<i value='.t('reset').' id="reset" class="icon-remove-sign fixed-icon-remove-sign"></i>', 
      '#weight' => -1,
      ); 
      
      $path_parts = explode('/', drupal_get_path_alias($_GET['q']));
      /* @var $path_parts type */
      if (isset($path_parts[1]) && $path_parts[1] == 'node') {
        $default_value = 1;
      }
      else {
        $default_value = 0;
      }
      $form['search_type'] = array(
        '#type' => 'radios',
        '#weight' => -1,
        '#default_value' => $default_value,
        '#options' => array(
          '0' => t('Materialer'),
          '1' => t('Hjemmeside')),
      );
      $form['basic']['submit']['#submit'][] = 'search_form_alter_submit';
      unset($form['basic']['keys']['#title']);
      $form['basic']['keys']['#attributes']['title'] = t('Søg efter materialer fra biblioteket..');
      $form['basic']['keys']['#suffix'] = '<i class="icon-search fixed-icon-search"></i>';      
      $form['basic']['keys']['#attributes']['placeholder'] = t('Søg efter materialer fra biblioteket..');
      $form['basic']['adv-shortcut']['#prefix'] = '<div class="btn" onClick=\'jQuery(".search-wrapper .fieldset-title").click()\'><a href="#">';
      $form['advanced']['actions']['reset']['#markup'] = '<input id="adv-reset" class="btn-info" type="button" value='.t('reset').' />';  
      $form['basic']['adv-shortcut']['#markup'] = 'Avanceret søgning';
      $form['basic']['adv-shortcut']['#suffix'] = '</a></div>';
      $form['basic']['adv-shortcut']['#weight'] = -1;
      $form['basic']['submit']['#attributes']['class'][] = 'btn';
      $form['basic']['submit']['#attributes']['class'][] = 'btn-large';
      $form['basic']['submit']['#attributes']['class'][] = 'btn-info';
      $form['basic']['submit']['#weight'] = -2;
      break;

    case 'user_login_block':
      $form['name']['#prefix']= '<i class="icon-user"></i>';
      unset($form['name']['#title']);
      $form['name']['#attributes']['placeholder'] = t('Cpr- eller kortnummer:');
      $form['name']['#type'] = 'password';
      $form['pass']['#attributes']['placeholder'] = t('Adgangskode:');
      $form['pass']['#prefix']= '<i class="icon-lock"></i>';
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

    case 'flag_confirm':
      $form['actions']['submit']['#attributes']['class'][] = 'btn';
      break;

    case 'ding_reservation_reserve_form':
      $form['submit']['#attributes']['class'][] = 'btn';
      break;
    
    case 'ding_facetbrowser_form':
      $form['span']['#expand-more']['class'][] = 'btn';
      break;
}
}

/**
 * Implements callback search_form_alter_submit().
 *
 */
function search_form_alter_submit($form, &$form_state) {

  if ($form_state['input']['search_type'] == '0') {
    return ting_search_submit($form, $form_state);
  }
  elseif ($form_state['input']['search_type'] == '1') {
    $form_state['redirect'] = 'search/node/' . trim($form_state['values']['keys']);
    return;
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

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  // Class attributes by menu_attributes
  if (isset($element['#localized_options']['attributes']['class'])) {
    $array_class = $element['#localized_options']['attributes']['class'];
    foreach ($array_class as $i => $class) {
      if (substr($class, 0, 5) == 'icon-') {
        // Don't put the class on the <a> tag!
        unset($element['#localized_options']['attributes']['class'][$i]);
        // It should go on a <i> tag (FontAwesome)!
        $icon = '<i class="' . $class . '"></i>';
      }
    }
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  if (!empty($icon)) {
    // Insert the icons (<i> tags) into the <a> tag.
    $output = substr_replace($output, $icon, -4, 0);
  }

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Implements hook_menu_local_task()
 *
 * @param array $variables
 *
 * return string with html
 */
function latto_odense_menu_local_tasks(&$variables) {
  $output = '';
  $has_access = user_access('access contextual links');
  if (!empty($variables['primary'])) {

    // Only display contextual links if the user has the correct permissions enabled.
    // Otherwise, the default primary tabs will be used.
    $variables['primary']['#prefix'] = '<ul class="nav nav-tabs">';

    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {

    $variables['secondary']['#prefix'] = '<ul class="nav nav-tabs">';

    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }
  return $output;
}

function latto_odense_links__library_menu($variables) {
  $links = $variables['links'];
  $attributes = $variables['attributes'];
  $heading = $variables['heading'];
  global $language_url;
  $output = '';

  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {
        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
          'text' => $heading,
          // Set the default level of the heading.
          'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul class="nav nav-tabs">';


    $num_links = count($links);
    $i = 1;

    foreach ($links as $key => $link) {
      $class = array($key);

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class[] = 'first';
      }
      if ($i == $num_links) {
        $class[] = 'last';
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
          && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $class[] = 'active';
      }
      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ul>';
  }

  return $output;
}

?>
