<?php
require_once 'config.php';
$page_title = "Travel + Opportunity | Trade, Expos, Delegations & Discovery";
$page_description = "Explore structured travel programs that connect discovery with business—trade delegations, expos, manufacturing sourcing visits, and curated introductions.";
$active_nav = "opportunities";
require __DIR__ . "/includes/header.php";
?>

<section class="container section">
  <div class="section-head">
    <h1>Travel with purpose: discovery, trade, and global connection</h1>
    <p>FYT offers structured programs that connect travel with conferences, expos, delegations, and verified introductions—built for clarity and responsible engagement.</p>
    <p class="muted tiny">This page is informational. Participation is subject to verification, capacity, and compliance standards.</p>
  </div>

  <div class="grid cards-2">
    <div class="card">
      <h2>Trade Delegations</h2>
      <p>Structured visits designed to meet vetted counterparts, understand markets, and explore partnerships through guided itineraries.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Request a Delegation Brief</a>
    </div>

    <div class="card">
      <h2>Conferences & Expos</h2>
      <p>Attend or exhibit with coordinated logistics, movement planning, and optional curated networking support.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Plan an Expo Trip</a>
    </div>

    <div class="card">
      <h2>Manufacturing & Sourcing Visits</h2>
      <p>On-the-ground discovery for manufacturing, sourcing, and supplier evaluation—through verified channels and structured scheduling.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Request Introductions</a>
    </div>

    <div class="card">
      <h2>Agro & Sustainability Discovery</h2>
      <p>Explore agriculture, sustainability, and enterprise ecosystems with guided access and responsible engagement standards.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Explore Programs</a>
    </div>

    <div class="card highlight">
      <h2>Investment Discovery Tours (Informational)</h2>
      <p>Briefings and introductions for qualified participants. No guarantees. Not investment advice.</p>
      <a class="btn primary" href="<?= $base_url ?>contact.php">Request Information</a>
      <p class="tiny muted">Informational only; no investment advice; subject to verification and policy.</p>
    </div>

    <div class="card">
      <h2>Want access to verified programs?</h2>
      <p>Request an introduction or join membership for priority program updates.</p>
      <div class="btn-row">
        <a class="btn primary" href="<?= $base_url ?>contact.php">Request an Introduction</a>
        <a class="btn secondary" href="<?= $base_url ?>membership.php">Join Membership</a>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>