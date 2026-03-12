<?php
$page_title = $page_title ?? "Forever Young Tours";
$page_description = $page_description ?? "";
$active_nav = $active_nav ?? "";

function nav_active(string $key, string $active_nav): string {
  return $key === $active_nav ? ' aria-current="page"' : "";
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title><?= htmlspecialchars($page_title) ?></title>
  <meta name="description" content="<?= htmlspecialchars($page_description) ?>" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/react-icons@5.0.0/index.es.js"></script>
  <link rel="stylesheet" href="<?= $base_url ?>assets/css/styles.css" />
  <script defer src="<?= $base_url ?>assets/js/main.js"></script>
</head>
<body>

<!-- TOP BAR WITH ROTATING MESSAGES -->
<div class="topbar" id="topbar">
  <div class="topbar-container">
    <div class="topbar-messages" id="topbarMessages">
      <div class="topbar-message active">Explore amazing tours coming to Africa next season!</div>
      <div class="topbar-message">Join thousands of travelers on premium curated experiences.</div>
      <div class="topbar-message">Book your adventure today and unlock exclusive member benefits.</div>
      <div class="topbar-message">Limited spots available—secure your journey now.</div>
    </div>
  </div>
</div>

<!-- UNIVERSAL NAVBAR - ODIECLOUD²π ECOSYSTEM -->
<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="<?= $base_url ?>index.php" class="brand">
        <img src="<?= $base_url ?>assets/images/logo.png" alt="Forever Young Tours" class="logo">
        <div>
          <div class="navbar-title">Forever Young Tours</div>
          <div class="tagline">Live Bold. Stay Forever Young.</div>
        </div>
      </a>

      <nav class="nav">
        <a href="<?= $base_url ?>solutions.php"<?= nav_active("solutions",$active_nav) ?>><i class="fas fa-lightbulb"></i>Solutions</a>
        <a href="<?= $base_url ?>tours.php"<?= nav_active("tours",$active_nav) ?>><i class="fas fa-map-marked-alt"></i>Tours</a>
        <a href="<?= $base_url ?>travel.php"<?= nav_active("travel",$active_nav) ?>><i class="fas fa-compass"></i>Travel</a>
        <a href="<?= $base_url ?>calendar.php"<?= nav_active("calendar",$active_nav) ?>><i class="fas fa-calendar-alt"></i>Calendar</a>
        <a href="https://shop.iforeveryoungtours.com" target="_blank" rel="noopener"><i class="fas fa-shopping-bag"></i>Shop</a>
        <a href="<?= $base_url ?>membership.php"<?= nav_active("membership",$active_nav) ?>><i class="fas fa-crown"></i>Membership</a>
      </nav>

      <div class="header-actions">
        <a class="btn btn-primary" href="<?= $base_url ?>login.php">Login</a>
        <button type="button" class="icon-btn" aria-label="Choose country / language" title="Languages">
          <i class="fas fa-globe"></i>
        </button>
        <a class="icon-btn" href="<?= $base_url ?>contact.php" aria-label="Email" title="Contact">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  </div>
</header>

<main class="main">

<script>
document.addEventListener('DOMContentLoaded', function() {
  const messages = document.querySelectorAll('.topbar-message');
  let currentIndex = 0;
  
  setInterval(function() {
    messages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % messages.length;
    messages[currentIndex].classList.add('active');
  }, 4000);
});
</script>