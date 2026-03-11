<?php

define('APP_NAME', 'Forever Young Tours');
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_DEBUG', APP_ENV === 'development');

function getImageUrl($path) {
    return BASE_URL . ltrim($path, '/');
}

function getCountryUrl($country_code) {
    return BASE_URL . '?country=' . strtoupper($country_code);
}

function getRegionUrl($region_slug) {
    return BASE_URL . '?continent=' . urlencode($region_slug);
}
