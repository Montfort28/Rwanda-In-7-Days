<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', dirname(__FILE__) . '/');
define('BASE_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/foreveryoung/');

$base_path = BASE_PATH;
$base_url = BASE_URL;

// Timezone
date_default_timezone_set('UTC');
