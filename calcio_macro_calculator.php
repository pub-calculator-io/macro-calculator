<?php
/*
Plugin Name: Macro Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/macro-calculator/
Description: Discover your ideal daily macronutrient intake with our free Macro Calculator. Get personalized protein, carb, and fat ratios to hit your fitness goals faster!
Version: 1.0.0
Author: www.calculator.io / Macro Calculator
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: calcio_macro_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Macro Calculator by www.calculator.io";

function calcio_macro_calculator_shortcode(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Macro Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="calcio_macro_calculator_iframe"></iframe></div>';
}


add_shortcode( 'calcio_macro_calculator', 'calcio_macro_calculator_shortcode' );