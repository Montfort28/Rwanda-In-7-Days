<?php
require_once 'config.php';
$page_title = "FYT Solutions | Tours, Corporate Travel, Expos & Delegations";
$page_description = "Explore FYT travel solutions—signature tours, group travel, corporate logistics, conferences & expos, sports travel, cultural exchange, and opportunity programs.";
$active_nav = "solutions";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Travel solutions built for experience, comfort, and outcomes</h1>
    <p>Whether you’re traveling for adventure, community, business, or global discovery—FYT delivers structured travel programs with disciplined execution.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h2>Signature Tours & Experiences</h2>
      <p>Curated itineraries with premium accommodations, guided experiences, and consistent operational support.</p>
      <a class="btn primary" href="<?= $base_url ?>tours.php">Browse Tours</a>
    </div>

    <div class="card">
      <h2>Group Travel & Private Clubs</h2>
      <p>Private groups, reunions, alumni trips, and curated travel circles—customized and managed end-to-end.</p>
      <a class="btn primary" href="<?= $base_url ?>create-your-own-tour.php">Create Your Group Trip</a>
    </div>

    <div class="card">
      <h2>Corporate Travel & Executive Logistics</h2>
      <p>Reliable, time-sensitive coordination for executives and teams—hotels, transfers, scheduling, and on-site support.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Request Corporate Support</a>
    </div>

    <div class="card">
      <h2>Conferences, Expos & Delegations</h2>
      <p>Attend or exhibit with confidence—structured logistics, movement planning, and itinerary control.</p>
      <a class="btn primary" href="<?= $base_url ?>calendar.php">View Upcoming Events</a>
    </div>

    <div class="card">
      <h2>Sports Travel & Athlete Programs</h2>
      <p>Team travel, fan travel, tournaments, training camps, and sports events—built for performance and timing discipline.</p>
      <a class="btn primary" href="<?= $base_url ?>tours.php?type=Sports%20Tours">Explore Sports Travel</a>
    </div>

    <div class="card">
      <h2>Cultural Exchange & Education Travel</h2>
      <p>Purpose-driven travel connecting people and institutions through cultural experiences and structured exchange.</p>
      <a class="btn primary" href="<?= $base_url ?>tours.php?type=Cultural%20Exchanges">Explore Exchanges</a>
    </div>
  </div>
</section>

<section class="container section">
  <div class="section-head">
    <h2>Travel + Opportunity Programs</h2>
    <p>For qualified participants, FYT facilitates structured discovery programs—trade exposure, manufacturing insights, curated introductions, and briefings—through verified partners and defined standards.</p>
  </div>

  <div class="card highlight">
    <h3>Explore Opportunities</h3>
    <p>Request access to verified programs and introductions.</p>
    <a class="btn primary" href="<?= $base_url ?>opportunities.php">Explore Opportunities</a>
    <p class="tiny muted">Informational only. Introductions are subject to verification and policy.</p>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>