<?php
require_once 'config.php';
$page_title = "Tour | Forever Young Tours";
$page_description = "Tour details and booking.";
require __DIR__ . "/includes/header.php";

$tours = json_decode(@file_get_contents(__DIR__ . "/data/tours.json"), true) ?? [];
$slug = isset($_GET["slug"]) ? trim($_GET["slug"]) : "";

$tour = null;
foreach ($tours as $t) {
  if ($t["slug"] === $slug) { $tour = $t; break; }
}

if (!$tour) {
  http_response_code(404);
  echo '<section class="container section"><div class="card"><h1>Tour not found</h1><p>Return to <a href="<?= $base_url ?>tours.php">Tours</a>.</p></div></section>';
  require __DIR__ . "/includes/footer.php";
  exit;
}

$page_title = $tour["title"] . " | Forever Young Tours";
?>

<section class="container section">
  <div class="tour-detail">
    <div class="tour-hero">
      <img src="<?= htmlspecialchars($tour["hero_image"]) ?>" alt="<?= htmlspecialchars($tour["title"]) ?>" onerror="this.style.display='none'">
      <div class="hero-placeholder">
        <strong>Tour Hero Image</strong>
        <p>Add an image at <?= htmlspecialchars($tour["hero_image"]) ?></p>
      </div>
    </div>

    <div class="tour-info">
      <h1><?= htmlspecialchars($tour["title"]) ?></h1>
      <p class="muted"><?= htmlspecialchars($tour["country"]) ?> • <?= (int)$tour["duration_days"] ?> days • <?= htmlspecialchars($tour["type"]) ?> • Rating <?= htmlspecialchars((string)$tour["rating"]) ?></p>
      <p><?= htmlspecialchars($tour["summary"]) ?></p>

      <div class="price-box">
        <div>
          <strong>From</strong>
          <div class="price">$<?= number_format((float)$tour["from_price_usd"], 0) ?></div>
        </div>
        <a class="btn primary" href="<?= htmlspecialchars($tour["booking_url"]) ?>" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="card">
        <h3>What’s included (placeholder)</h3>
        <ul class="list">
          <li>Curated itinerary and guided flow</li>
          <li>Premium accommodation options</li>
          <li>On-trip operational support</li>
          <li>Local experiences and cultural immersion</li>
        </ul>
      </div>

      <div class="card">
        <h3>Itinerary (placeholder)</h3>
        <p>Add your day-by-day itinerary here, or link to a dedicated itinerary section.</p>
      </div>

      <div class="card">
        <h3>Refer a friend</h3>
        <p>Members can generate a referral link + QR code inside the Membership portal.</p>
        <a class="btn secondary" href="<?= $base_url ?>membership.php">Become a Member</a>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>