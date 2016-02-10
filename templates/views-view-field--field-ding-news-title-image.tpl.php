<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if($output != "" &&
   isset($row->field_field_ding_news_title_image[0]['raw']['field_kilde']['und'][0]['value']))
{
    $dom = new DOMDocument();
    $dom->loadHTML($output);

    foreach ($dom->getElementsByTagName('img') as $item) {
        $photo_source = $row->field_field_ding_news_title_image[0]['raw']['field_kilde']['und'][0]['value'];
        if($item->hasAttribute('title'))
        {
            $old_string =  $item->getAttribute('title');
            $old_string = $old_string ."\r\n" .t('Photo: ') . $photo_source;
            $item->setAttribute('title', $old_string);
        }
        else
        {
           $item->setAttribute('title', t('Photo: ') . $photo_source);
        }
        
        echo $dom->saveHTML();
        break;
    }
}
else
{
    echo $output;
}


