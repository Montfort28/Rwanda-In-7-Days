<?php
require_once 'config.php';
$page_title = "Create Your Own Tour | Forever Young Tours";
$page_description = "Design a custom tour with Forever Young Tours. Tell us your destination, dates, and travel style.";
$active_nav = "create-tour";
require_once 'includes/header.php';
?>

<div class="container" style="padding: 48px 24px;">
  <h1>Create Your Own Tour</h1>
  <p>Tell us your destination, dates, group size, and travel style—our team will propose a structured plan.</p>
  <p style="margin-top: 24px;"><a href="<?= $base_url ?>contact.php" class="btn primary">Start Planning</a></p>
</div>

<?php require_once 'includes/footer.php'; ?>
