<?php

function latto_odense_preprocess_html(&$variables) {

  $path = drupal_get_path_alias();
  $pattern = "event-category/*\nnews-category/*";
  if (drupal_match_path($path, $pattern)) {
     drupal_add_js(drupal_get_path('theme', 'latto_odense') .'/js/jquery.fastLiveFilter.min.js',array('weight' => 999));
  }  
  if(strpos($GLOBALS['base_url'],'odensebib.dk') !== false )
  {
      /*Add Questionaire code to all pages , in case of direct links.*/
      //drupal_add_css("https://popin.survey-xact.dk/popin/popin.css", 'external');
      //drupal_add_js(drupal_get_path('theme', 'latto_odense') . "/js/popintest.js");
      //drupal_add_js("https://popin.survey-xact.dk/dynjs/8MK7X6PX921J/popin.js", 'external');
      //drupal_add_js("https://popin.survey-xact.dk/cookies.js" , 'external');
      //drupal_add_js(drupal_get_path('theme', 'latto_odense') ."/js/survey.js");
  }
  //Google translate
    $element = array(
      '#type' => 'markup',
      '#markup' => '<meta name="google-translate-customization" content="fdb71287571f3a3f-c9706368dadbbb25-g267b673532f38d5e-10"></meta>',
    );
  drupal_add_html_head($element, "Google translate");  
  drupal_add_js("https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit", 'external');
  drupal_add_css('https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css','external'); //This is needed for the dialog to show with styling on all pages. the Jquery module seems to have issue.
    /* Add custom disable of the tableselect field for when using tablesort , it makes no sense to sort it.
   * Requires tablesort metatag enabled.
   * 
   */
   drupal_add_js("
   jQuery('.select-all').toggleClass('{sorter: false}');",
    array('type' => 'inline', 'scope' => 'footer', 'weight' => 5)
  ); 
}
function latto_odense_webform_submission_render_alter(&$renderable) {
  /**
   * Double space %email_values in webform emails
   */
    foreach (element_children($renderable) as $key) {   
      $renderable[$key]['#title'] = "<br>" . $renderable[$key]['#title'];
      if (isset($renderable[$key]['#webform_component']['type']) && $renderable[$key]['#webform_component']['type'] == 'fieldset') {
        $fieldset = &$renderable[$key];     
        foreach (element_children($fieldset) as $key2) {
          $fieldset[$key2]['#title'] = "</br>" . $fieldset[$key2]['#title'];
      }
    }
  }
}
/*
 * Implements hook_preprocess_table().
 * adds classes table table-striped
 */
function latto_odense_query_alter($query) {

  if (isset($query->alterMetaData)) {
    if (isset($query->alterMetaData['view'])) {
      if($query->alterMetaData['view']->name == 'ding_node_search' || 'node_search_counter') {
        $fields =& $query->getGroupBy();
        // Tried various fields to check which was the field creating the problem.
        unset($fields['score']);
        $query->groupBy('nid');
      }
    }
  }
}
function latto_odense_preprocess_table(&$variables) {
  if (isset($variables['attributes']['class']) && is_string($variables['attributes']['class'])) {
    // Convert classes to an array.
    $variables['attributes']['class'] = explode(' ', $variables['attributes']['class']);
  }

  $variables['attributes']['class'][] = 'table table-striped';
}

/**
 * Implements hook_cache_actions_panels_cache_key_alter.
 *
 * Add user roles to the cache key.
 */
function latto_odense_cache_actions_panels_cache_key_alter($cache) {
  switch ($cache->pane->type) {
    case 'campaign':
      global $user;
      $cache->key .= serialize($user->roles);
      break;
  }
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
      $form['basic']['keys']['#attributes']['spellcheck'] = 'true';
      
      $form['basic']['adv-shortcut']['#prefix'] = '<div class="btn" onClick=\'jQuery(".search-wrapper .fieldset-title").click()\'><a href="#">';
      $form['advanced']['actions']['reset']['#markup'] = '<input id="adv-reset" class="btn-info" type="button" value='.t('reset').' />';  
      $form['advanced']['ccl']['#maxlength'] = 256;
      $form['basic']['adv-shortcut']['#markup'] = 'Avanceret søgning';
      $form['basic']['adv-shortcut']['#suffix'] = '</a></div>';
      $form['basic']['adv-shortcut']['#weight'] = -1;
      $form['basic']['submit']['#attributes']['class'][] = 'btn';
      $form['basic']['submit']['#attributes']['class'][] = 'btn-large';
      $form['basic']['submit']['#attributes']['class'][] = 'btn-info';
      $form['basic']['submit']['#weight'] = -2;
      break;

    case 'user_login_block':
      if (variable_get('oc_fbs_enabled', 0)) {
      unset($form['name']);
        unset($form['pass']);
      unset($form['nemid']);
      $form['links']['#markup'] = 'Grundet skifte til nyt bibliotekssystem kan du den 6/6 og 6/7 ikke bruge alle funktioner på hjemmesiden. <a href="/news/d-6-7-juni-kan-hverken-besoege-biblioteket-soege-litteratur-via-vores-hjemmeside">Se mere her.</a>';
      unset($form['actions']['submit']);
      }
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
      if (isset($form['#token'])) {
        $form_state['input']['form_token'] = drupal_get_token($form['#token']);
      }
      $form['submit']['#attributes']['class'][] = 'btn';
      break;
    
    case 'ding_facetbrowser_form':
      $form['span']['#expand-more']['class'][] = 'btn';
      break;
    case 'user_profile_form':
       $form['account']['mail']['#required'] = false; 
      break;
    case 'user-login':
        $form['name']['#type'] = 'password';
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
function latto_odense_menu_tree__main_menu($vars) {
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
function latto_odense_preprocess_field(&$vars) {
    if($vars['element']['#bundle'] == "ding_library")
    {
        /*
         * Add no translate css class to fields rendered 
         * in library information pages.
         * prevents funny street names when using google translate.
         */
         $notranslate_fields = array('field_ding_library_addresse','field_ding_library_mail',
        'field_ding_library_phone_number','field_ding_library_cvr'
        ,'field_ding_library_cvr');
         
        if(in_array($vars['element']['#field_name'],$notranslate_fields))
        {
            $content_classes = &$vars['classes_array'];
            $content_classes[] = "notranslate";
        }
    }
    return;
}

/**
 * Implements hook_theme().
 */
function latto_odense_theme($existing, $type, $theme, $path) {
  return array(
    'opening_hours_presentation' => array(
      'variables' => array(),
      'path' => $path . '/templates',
      'template' => 'opening_hours_presentation',
    ),
  );
}
/*
 * Helper function for webform calender fields
 * to make them display like node date field.
 */
function getFormKeys($components, $component) {
  $myReturn = array();
  $pid = $component['pid'];
  if(!empty($pid)) {
    try
    {
      $myReturn = array_merge($myReturn,getFormKeys($components, $components[$pid]));
    } catch (Exception $ex) {

    }
  }// end of if(!empty($pid));
  array_push($myReturn,$component['form_key']);
  return $myReturn;
}
/*
 * Alter the breadcrumb home text.
 */
function latto_odense_menu_breadcrumb_alter(&$active_trail, $item){
$active_trail[0]['title'] = t('Forside');
}