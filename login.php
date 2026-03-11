<?php
require_once 'config.php';
$page_title = "Login | Forever Young Tours";
$page_description = "Member and Advisor login.";
$active_nav = "login";
require __DIR__ . "/includes/header.php";
?>
<section class="container section">
  <div class="section-head">
    <h1>Login</h1>
    <p>Member and Advisor portal access (Phase 2 implementation).</p>
  </div>
  <div class="grid cards-2">
    <div class="card">
      <h2>Member Login</h2>
      <p>Access referrals, QR code, testimonials, bookings, and member deals.</p>
      <a class="btn primary" href="<?= $base_url ?>membership.php">Become a Member</a>
    </div>
    <div class="card">
      <h2>Advisor Login</h2>
      <p>Access training, asset library, and lead registration tools.</p>
      <a class="btn primary" href="<?= $base_url ?>become-an-advisor.php">Apply as an Advisor</a>
    </div>
  </div>
</section>
<?php require __DIR__ . "/includes/footer.php"; ?>