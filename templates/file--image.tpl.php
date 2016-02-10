<?php
/*
 * Add the image copyrigth to the title tag 
 * to Ensure that we adhere we copyrigth law
 */
if(isset($content['file']['#attributes']['title']) && !empty($content['file']['#attributes']['title']) && isset($field_kilde['und'][0]['value']))
{
    $content['file']['#title'] =  $content['file']['#attributes']['title'] . '\r\n'. "Photo: " . $field_kilde['und'][0]['value'];
}
else
{
    $content['file']['#title'] = isset($field_kilde['und'][0]['value']) && !empty($field_kilde['und'][0]['value']) ? "Photo: " . $field_kilde['und'][0]['value'] : '';
}
hide($content['links']);
print render($content);
