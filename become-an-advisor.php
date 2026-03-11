<?php
require_once 'config.php';
$page_title = "Become a FYT Travel Advisor | Build a Travel Business";
$page_description = "Apply to become a FYT Travel Advisor. Access training, marketing assets, support systems, and a structured pathway to earn by sharing tours.";
$active_nav = "advisor";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Become a Travel Advisor</h1>
    <p>Share unforgettable experiences. Build a travel business with training, structured support, and marketing assets—under a clear code of conduct.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h2>What advisors do</h2>
      <p>Advisors introduce travelers to curated FYT experiences, support prospects with clarity, and operate under brand and compliance standards.</p>
      <ul class="list">
        <li>Share approved tour offers</li>
        <li>Register leads and coordinate handoff</li>
        <li>Follow messaging and conduct standards</li>
        <li>Participate in training and updates</li>
      </ul>
    </div>

    <div class="card highlight">
      <h2>What you’ll receive</h2>
      <ul class="list">
        <li>Advisor portal access (assets + lead registration)</li>
        <li>Marketing asset library and scripts</li>
        <li>Onboarding training modules</li>
        <li>Support and escalation process</li>
        <li>Recognition and performance incentives</li>
      </ul>
    </div>
  </div>

  <div class="card section">
    <h2>Approval requirements</h2>
    <p>Advisors are approved to protect brand quality and traveler trust. Verification is required before activation.</p>
    <ul class="list">
      <li>Identity verification</li>
      <li>Acceptance of compliance and messaging standards</li>
      <li>Completion of onboarding modules</li>
    </ul>

    <div class="btn-row">
      <a class="btn primary" href="<?= $base_url ?>contact.php">Apply Now</a>
      <a class="btn secondary" href="<?= $base_url ?>login.php">Advisor Login</a>
    </div>
    <p class="tiny muted">Approval required before earning.</p>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>