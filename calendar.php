<?php
require_once 'config.php';
$page_title = "FYT Calendar | Upcoming Departures, Events, Expos & Delegations";
$page_description = "View upcoming tours, group departures, conferences, expos, sports events, and community meetups.";
$active_nav = "calendar";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>What’s coming up</h1>
    <p>Tours, departures, conferences, expos, sports events, and community gatherings—organized in one calendar.</p>
  </div>

  <div class="card">
    <h2>Calendar (placeholder)</h2>
    <p>Integrate your preferred calendar tool here (custom table, Google Calendar embed, or internal event DB).</p>
    <div class="grid cards-3">
      <div class="card">
        <h3>Upcoming Tours</h3>
        <p>Scheduled departures and group trips.</p>
      </div>
      <div class="card">
        <h3>Conferences & Expos</h3>
        <p>Attend or exhibit with structured logistics.</p>
      </div>
      <div class="card">
        <h3>Delegations & Discovery</h3>
        <p>Programs require verification and capacity approval.</p>
      </div>
    </div>

    <div class="btn-row">
      <a class="btn primary" href="<?= $base_url ?>contact.php">Subscribe to Updates</a>
      <a class="btn secondary" href="<?= $base_url ?>opportunities.php">Explore Opportunities</a>
    </div>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>