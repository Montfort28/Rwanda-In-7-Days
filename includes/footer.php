<?php
// /includes/footer.php
?>
</main>

<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <img src="<?= $base_url ?>assets/images/logo.png" alt="Forever Young Tours" style="height: 50px; width: auto;">
        <div>
          <h4 style="margin: 0 0 4px 0;">Forever Young Tours</h4>
          <p style="margin: 0; font-size: 0.9rem; color: var(--light-gray);">Live Bold. Stay Forever Young.</p>
        </div>
      </div>
      <p>Curated global tours, cultural discovery, and premium travel experiences—built for explorers who live bold.</p>
    </div>

    <div>
      <h4>Company</h4>
      <a href="<?= $base_url ?>about.php">About Us</a>
      <a href="<?= $base_url ?>contact.php">Contact Us</a>
      <a href="<?= $base_url ?>blog.php">Blog</a>
      <a href="<?= $base_url ?>resources.php">Resources</a>
    </div>

    <div>
      <h4>Programs</h4>
      <a href="<?= $base_url ?>create-your-own-tour.php">Create Your Own Tour</a>
      <a href="<?= $base_url ?>become-an-advisor.php">Become An Advisor</a>
      <a href="<?= $base_url ?>membership.php">Become A Member</a>
      <a href="<?= $base_url ?>opportunities.php">Opportunities</a>
    </div>

    <div>
      <h4>Legal</h4>
      <a href="<?= $base_url ?>privacy.php">Privacy Policy</a>
      <a href="<?= $base_url ?>terms.php">Terms & Conditions</a>
      <a href="<?= $base_url ?>disclaimers.php">Disclaimers</a>
    </div>
  </div>

  <div class="container footer-bottom" style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; text-align: left;">
    <div>
      <p>All Oderson Holdings subsidiaries are Members of the ODIECLOUD²π Ecosystem.</p>
      <p class="muted">ODIECLOUD²π, ODIEBOARD, Oπ, ODIEXA, and AUREX are Registered Trademark and Service Marks of Oderson Holdings Ltd.</p>
    </div>
    <div style="text-align: right;">
      <p style="margin-bottom: 8px;"><strong>Powered By ODIEBOARD</strong></p>
      <p class="muted">© <?= date("Y") ?> Forever Young Tours. All rights reserved.</p>
    </div>
  </div>
</footer>

</body>
</html>