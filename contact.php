<?php
require_once 'config.php';
$page_title = "Contact | Forever Young Tours";
$page_description = "Contact Forever Young Tours.";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Contact</h1>
    <p>Send us your request and our team will respond.</p>
  </div>

  <div class="card">
    <form method="post" action="<?= $base_url ?>contact.php">
      <div class="grid cards-2">
        <div>
          <label>Full Name</label>
          <input name="name" required style="width:100%;margin-top:6px" class="input" />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" required style="width:100%;margin-top:6px" class="input" />
        </div>
      </div>
      <div style="margin-top:12px">
        <label>Message</label>
        <textarea name="message" required style="width:100%;margin-top:6px;min-height:140px"></textarea>
      </div>
      <div class="btn-row" style="margin-top:12px">
        <button class="btn primary" type="submit">Send</button>
        <a class="btn secondary" href="<?= $base_url ?>tours.php">Browse Tours</a>
      </div>
      <p class="tiny muted" style="margin-top:10px">Form handler can be wired to email/CRM/webhook.</p>
    </form>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>