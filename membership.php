<?php
require_once 'config.php';
$page_title = "FYT Membership | Community, Deals, Private Trips & Perks";
$page_description = "Join the FYT Travel Community—member pricing, early access, private trips, referrals, events, and premium travel perks.";
$active_nav = "membership";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Join the travel community</h1>
    <p>Membership is how travelers stay connected, travel smarter, and unlock exclusive access—without losing freedom.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h2>Why become a member?</h2>
      <p>Membership brings structure to your travel lifestyle: better pricing, curated trips, private community access, and organized opportunities to travel more often.</p>
      <ul class="list">
        <li>Member pricing and early access</li>
        <li>Private trips and community events</li>
        <li>Referral rewards and recognition</li>
        <li>Priority support (higher tiers)</li>
      </ul>
    </div>

    <div class="card highlight">
      <h2>Member Portal (Phase 2)</h2>
      <p>Referral link + QR code, testimonial submission, saved tours, events, and member-only offers.</p>
      <a class="btn primary" href="<?= $base_url ?>login.php">Login</a>
      <p class="tiny muted">Portal features can be built as a secure dashboard.</p>
    </div>
  </div>

  <div class="section-head section">
    <h2>Membership tiers</h2>
    <p>Choose the tier that matches your travel frequency and lifestyle.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h3>Explorer (Free)</h3>
      <p><strong>Best for:</strong> staying informed and getting started</p>
      <ul class="list">
        <li>Community preview access</li>
        <li>Newsletter + tour updates</li>
        <li>Early announcements (limited)</li>
      </ul>
      <a class="btn secondary" href="<?= $base_url ?>contact.php">Join Free</a>
    </div>

    <div class="card">
      <h3>Traveler</h3>
      <p><strong>Best for:</strong> frequent travelers</p>
      <ul class="list">
        <li>Member pricing</li>
        <li>Early access to departures</li>
        <li>Private travel group invitations</li>
        <li>Referral rewards</li>
      </ul>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Become a Traveler</a>
    </div>

    <div class="card">
      <h3>Ambassador</h3>
      <p><strong>Best for:</strong> premium travel lifestyle</p>
      <ul class="list">
        <li>Priority support</li>
        <li>Exclusive trip invites</li>
        <li>Member-only briefings and events</li>
        <li>Enhanced referral rewards</li>
      </ul>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Become an Ambassador</a>
    </div>

    <div class="card">
      <h3>Global Ambassador (Invitation)</h3>
      <p><strong>Best for:</strong> VIP and private travel circles</p>
      <ul class="list">
        <li>VIP concierge handling</li>
        <li>Priority access to private delegations</li>
        <li>Curated introductions via verified channels</li>
        <li>Invitation-only experiences</li>
      </ul>
      <a class="btn secondary" href="<?= $base_url ?>contact.php">Request Invitation</a>
    </div>
  </div>

  <div class="card section">
    <h2>Ready to travel with the community behind you?</h2>
    <div class="btn-row">
      <a class="btn primary" href="<?= $base_url ?>contact.php">Become a Member</a>
      <a class="btn secondary" href="<?= $base_url ?>tours.php">Browse Tours</a>
    </div>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>