<?php
require_once 'config.php';
$page_title = "Travel Services | Flights, Hotels, Transfers, Visas & Resources";
$page_description = "FYT travel services and resources—planning support, concierge services, travel tips, and destination guidance.";
$active_nav = "travel";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Travel support beyond the tour</h1>
    <p>Planning assistance, concierge services, and resources to help you travel smoothly—before, during, and after your trip.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h2>Travel Services</h2>
      <p>Need help with logistics? We provide coordinated support for travel planning and itinerary builds.</p>
      <ul class="list">
        <li>Hotel selection support</li>
        <li>Airport transfers & local transport</li>
        <li>Travel insurance guidance (third-party)</li>
        <li>Visa and entry guidance (informational)</li>
        <li>Custom itinerary builds</li>
      </ul>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Request Travel Support</a>
    </div>

    <div class="card">
      <h2>Travel Resources</h2>
      <p>Practical guidance for confident travel—packing lists, cultural etiquette, and destination tips.</p>
      <a class="btn secondary" href="<?= $base_url ?>resources.php">Explore Resources</a>
    </div>
  </div>

  <div class="card highlight section">
    <h2>Create Your Own Tour</h2>
    <p>Tell us the destination, dates, group size, and travel style—our team will propose a structured plan.</p>
    <a class="btn primary" href="<?= $base_url ?>create-your-own-tour.php">Create Your Tour</a>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>