<?php
$page_title = $page_title ?? "Forever Young Tours";
$page_description = $page_description ?? "";
$active_nav = $active_nav ?? "";

function nav_active(string $key, string $active_nav): string {
  return $key === $active_nav ? ' aria-current="page" class="active"' : "";
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title><?= htmlspecialchars($page_title) ?></title>
  <meta name="description" content="<?= htmlspecialchars($page_description) ?>" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="<?= $base_url ?>assets/css/styles.css" />
  <script defer src="<?= $base_url ?>assets/js/main.js"></script>
</head>
<body>

<header class="site-header">
  <div class="container header-inner">
    <a href="<?= $base_url ?>index.php" class="logo">
      <img src="<?= $base_url ?>assets/images/logo.png" alt="Forever Young Tours" style="height: 50px; width: auto;">
    </a>

    <nav class="nav" style="flex: 1; justify-content: center;">
      <a href="<?= $base_url ?>solutions.php"<?= nav_active("solutions",$active_nav) ?>>Solutions</a>
      <a href="<?= $base_url ?>tours.php"<?= nav_active("tours",$active_nav) ?>>Tours</a>
      <a href="<?= $base_url ?>travel.php"<?= nav_active("travel",$active_nav) ?>>Travel</a>
      <a href="<?= $base_url ?>calendar.php"<?= nav_active("calendar",$active_nav) ?>>Calendar</a>
      <a href="https://shop.iforeveryoungtours.com" target="_blank" rel="noopener">Shop</a>
      <a href="<?= $base_url ?>membership.php"<?= nav_active("membership",$active_nav) ?>>Membership</a>
      <a href="<?= $base_url ?>login.php"<?= nav_active("login",$active_nav) ?>>Login</a>
    </nav>

    <div class="header-actions">
      <button type="button" class="icon-btn" aria-label="Choose country / language" onclick="toggleLangMenu()"><i class="fas fa-globe"></i></button>
      <a class="icon-btn" href="<?= $base_url ?>contact.php" aria-label="Email"><i class="fas fa-envelope"></i></a>
      <a class="btn primary" href="<?= $base_url ?>membership.php">Become a Member</a>
    </div>
  </div>

  <div id="langMenu" class="lang-menu hidden">
    <div class="container lang-inner">
      <strong>Country / Language</strong>
      <div class="lang-grid">
        <button type="button" onclick="setLang('en')">English</button>
        <button type="button" onclick="setLang('fr')">Français</button>
        <button type="button" onclick="setLang('sw')">Swahili</button>
      </div>
      <small>Translation can be wired to your preferred service later.</small>
    </div>
  </div>
</header>

<main class="main">
