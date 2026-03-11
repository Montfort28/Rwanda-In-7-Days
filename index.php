<?php

require_once 'config.php';
$page_title = "Forever Young Tours | Live Bold. Stay Forever Young.";
$page_description = "Curated global tours, cultural experiences, cruises, sports travel, conferences, and premium travel solutions across Africa, the Caribbean, and beyond.";

require_once 'config/database.php';
require_once 'config/environment.php';

$country_filter = null;
$continent_filter = null;

if (isset($_GET['country'])) {
    $country_code = strtoupper($_GET['country']);
    $stmt = $pdo->prepare("SELECT id, name FROM countries WHERE country_code = ? AND status = 'active'");
    $stmt->execute([$country_code]);
    $country = $stmt->fetch();

    if ($country) {
        $_SESSION['subdomain_country_id'] = $country['id'];
        $_SESSION['subdomain_country_name'] = $country['name'];
        $country_filter = $country['id'];
        $page_title = "Visit " . $country['name'] . " | Forever Young Tours";
        $page_description = "Explore " . $country['name'] . "'s best tours, travel experiences, and curated departures with Forever Young Tours.";
    }
} elseif (isset($_GET['continent'])) {
    $continent_slug = $_GET['continent'];
    $stmt = $pdo->prepare("SELECT id, name FROM regions WHERE LOWER(REPLACE(name, ' ', '-')) = ? AND status = 'active'");
    $stmt->execute([$continent_slug]);
    $continent = $stmt->fetch();

    if ($continent) {
        $_SESSION['continent_filter'] = $continent['name'];
        $continent_filter = $continent['id'];
        $page_title = "Explore " . $continent['name'] . " | Forever Young Tours";
        $page_description = "Discover amazing tours and destinations across " . $continent['name'] . " with Forever Young Tours.";
    }
} elseif (isset($_SESSION['subdomain_country_id'])) {
    $country_filter = $_SESSION['subdomain_country_id'];
    $page_title = "Visit " . $_SESSION['subdomain_country_name'] . " | Forever Young Tours";
    $page_description = "Explore " . $_SESSION['subdomain_country_name'] . "'s best tours and destinations with Forever Young Tours.";
}

if ($country_filter) {
    $stmt = $pdo->prepare("SELECT t.*, c.name as country_name, r.name as region_name FROM tours t LEFT JOIN countries c ON t.country_id = c.id LEFT JOIN regions r ON c.region_id = r.id WHERE t.status = 'active' AND t.country_id = ? ORDER BY t.created_at DESC LIMIT 6");
    $stmt->execute([$country_filter]);
} elseif ($continent_filter) {
    $stmt = $pdo->prepare("SELECT t.*, c.name as country_name, r.name as region_name FROM tours t LEFT JOIN countries c ON t.country_id = c.id LEFT JOIN regions r ON c.region_id = r.id WHERE t.status = 'active' AND c.region_id = ? ORDER BY t.created_at DESC LIMIT 6");
    $stmt->execute([$continent_filter]);
} else {
    $stmt = $pdo->prepare("SELECT t.*, c.name as country_name, r.name as region_name FROM tours t LEFT JOIN countries c ON t.country_id = c.id LEFT JOIN regions r ON c.region_id = r.id WHERE t.status = 'active' AND t.featured = 1 ORDER BY t.created_at DESC LIMIT 6");
    $stmt->execute();
}
$featured_tours = $stmt->fetchAll();

if ($country_filter) {
    $stmt = $pdo->prepare("SELECT c.*, r.name as region_name, COUNT(t.id) as tour_count FROM countries c JOIN regions r ON c.region_id = r.id LEFT JOIN tours t ON c.id = t.country_id WHERE c.id = ? AND c.status = 'active' GROUP BY c.id LIMIT 1");
    $stmt->execute([$country_filter]);
} else {
    $stmt = $pdo->prepare("SELECT c.*, r.name as region_name, COUNT(t.id) as tour_count FROM countries c JOIN regions r ON c.region_id = r.id LEFT JOIN tours t ON c.id = t.country_id WHERE c.featured = 1 AND c.status = 'active' GROUP BY c.id ORDER BY tour_count DESC LIMIT 8");
    $stmt->execute();
}
$featured_destinations = $stmt->fetchAll();

$stmt = $pdo->prepare("SELECT COUNT(*) as total_bookings FROM bookings");
$stmt->execute();
$total_bookings = (int)($stmt->fetch()['total_bookings'] ?? 0);

$stmt = $pdo->prepare("SELECT COUNT(*) as total_users FROM users WHERE role IN ('client', 'advisor')");
$stmt->execute();
$total_users = (int)($stmt->fetch()['total_users'] ?? 0);

$stmt = $pdo->prepare("SELECT COUNT(*) as total_tours FROM tours WHERE status = 'active'");
$stmt->execute();
$total_tours = (int)($stmt->fetch()['total_tours'] ?? 0);

$stmt = $pdo->prepare("SELECT COUNT(*) as total_countries FROM countries WHERE status = 'active'");
$stmt->execute();
$total_countries = (int)($stmt->fetch()['total_countries'] ?? 0);

$announcements = [];
try {
    $stmt = $pdo->query("SELECT ts.scheduled_date, t.id as tour_id, t.title as tour_name, c.name as country_name FROM tour_schedules ts JOIN tours t ON ts.tour_id = t.id LEFT JOIN countries c ON t.country_id = c.id WHERE ts.scheduled_date >= CURDATE() AND ts.status = 'active' AND t.status = 'active' ORDER BY ts.scheduled_date ASC LIMIT 8");
    $announcements = $stmt->fetchAll();
} catch (Throwable $e) {
    $announcements = [];
}

include 'includes/header.php';
?>

<style>
:root {
    --primary-gold: #DAA520;
    --secondary-gold: #F1C40F;
    --dark-gold: #B8860B;
    --light-gold: #FFD700;
    --primary-green: #228B22;
    --secondary-green: #32CD32;
}

.hero-section {
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.7), rgba(34, 139, 34, 0.65)), url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&h=700&fit=crop');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 160px 24px;
    border-radius: 20px;
    margin-bottom: 60px;
    box-shadow: 0 30px 80px rgba(218, 165, 32, 0.25);
    position: relative;
    overflow: hidden;
    text-align: center;
    border: none;
}

.hero-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.hero-content {
    width: 100%;
}

.hero-content h1 {
    font-size: 3.8rem;
    font-weight: 900;
    color: var(--white);
    margin-bottom: 24px;
    line-height: 1.15;
    text-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
}

.hero-content p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.99);
    margin-bottom: 48px;
    line-height: 1.8;
    font-weight: 500;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.btn-row {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 48px;
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 0;
}

.stat-item {
    background: rgba(255, 255, 255, 0.2);
    padding: 24px 16px;
    border-radius: 12px;
    border: none;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.stat-item:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
}

.stat-item strong {
    display: block;
    font-size: 2.2rem;
    color: var(--white);
    margin-bottom: 8px;
    font-weight: 900;
}

.stat-item span {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
}

.hero-visual {
    display: none;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 80px 24px;
    }
    .hero-content h1 {
        font-size: 2.2rem;
    }
    .hero-content p {
        font-size: 1rem;
        margin-bottom: 32px;
    }
    .hero-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    .btn-row {
        flex-direction: column;
    }
}
</style>

<main class="main">
    <section class="hero-section">
        <div class="hero-grid">
            <div class="hero-content">
                <h1>Live Bold. Stay Forever Young.</h1>
                <p>Curated travel experiences, tours, cruises, cultural exchanges, conferences, and premium group journeys across Africa, the Caribbean, Europe, and beyond.</p>
                <div class="btn-row">
                    <a href="<?= $base_url ?>pages/packages.php" class="btn primary">Plan Your Next Trip</a>
                    <a href="<?= $base_url ?>auth/register.php" class="btn secondary">Join Our Community</a>
                </div>
                <div class="hero-stats">
                    <div class="stat-item">
                        <strong><?= number_format($total_tours) ?></strong>
                        <span>Active Tours</span>
                    </div>
                    <div class="stat-item">
                        <strong><?= number_format($total_countries) ?></strong>
                        <span>Destinations</span>
                    </div>
                    <div class="stat-item">
                        <strong><?= number_format($total_users) ?></strong>
                        <span>Travelers</span>
                    </div>
                    <div class="stat-item">
                        <strong><?= number_format($total_bookings) ?></strong>
                        <span>Bookings</span>
                    </div>
                </div>
            </div>
            <div class="hero-visual"></div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-head">
                <h2>Travel Categories Designed for Every Journey</h2>
                <p>Discover premium, systems-driven travel experiences structured around comfort, curation, destination quality, and meaningful outcomes.</p>
            </div>
            <div class="grid cards-3">
                <div class="card"><h3>Adventure Tours</h3><p>Wild landscapes, trekking, safari moments, and bold itineraries.</p></div>
                <div class="card"><h3>Agro Tours</h3><p>Discover agriculture, local production, sustainability, and enterprise ecosystems.</p></div>
                <div class="card"><h3>City Breaks</h3><p>Short escapes with strong culture, dining, nightlife, and guided experiences.</p></div>
                <div class="card"><h3>Cruises</h3><p>Relaxed luxury, curated ports, and ocean experiences with premium flow.</p></div>
                <div class="card"><h3>Cultural Exchanges</h3><p>Programs focused on people, learning, heritage, and meaningful connection.</p></div>
                <div class="card"><h3>Motorcoach Tours</h3><p>Comfortable road journeys with group structure and scenic routes.</p></div>
                <div class="card"><h3>Rail Tours</h3><p>Scenic train-based travel for elegant movement and slow discovery.</p></div>
                <div class="card"><h3>Conferences & Expos</h3><p>Business travel, networking events, delegation logistics, and structured access.</p></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-head">
                <h2>Featured Tours</h2>
                <p>Database-powered packages from your current structure.</p>
            </div>
            <div class="grid cards-3">
                <?php if (!empty($featured_tours)): ?>
                    <?php foreach ($featured_tours as $tour): ?>
                        <article class="tour-card">
                            <div class="tour-img">
                                <?php $tour_image = !empty($tour['image_url']) ? $tour['image_url'] : 'assets/images/default-tour.jpg'; ?>
                                <img src="<?= htmlspecialchars($tour_image) ?>" alt="<?= htmlspecialchars($tour['title']) ?>" onerror="this.style.display='none';">
                            </div>
                            <div class="tour-body">
                                <h3><?= htmlspecialchars($tour['title']) ?></h3>
                                <p><?= htmlspecialchars(mb_strimwidth(strip_tags($tour['description'] ?? ''), 0, 160, '...')) ?></p>
                                <a href="<?= $base_url ?>booking.php?tour_id=<?= urlencode($tour['id']) ?>" class="btn primary">Book this trip</a>
                            </div>
                        </article>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No featured tours yet. Add active featured tours in the admin to populate this section.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-head">
                <h2>Featured Destinations</h2>
                <p>Destinations from your current country/region structure.</p>
            </div>
            <div class="grid cards-3">
                <?php if (!empty($featured_destinations)): ?>
                    <?php foreach ($featured_destinations as $destination): ?>
                        <?php
                        $dest_country_codes = ['visit-rw' => 'rw', 'rwanda' => 'rw', 'kenya' => 'ke', 'tanzania' => 'tz', 'uganda' => 'ug', 'egypt' => 'eg', 'morocco' => 'ma', 'south-africa' => 'za', 'botswana' => 'bw', 'namibia' => 'na', 'zimbabwe' => 'zw', 'ethiopia' => 'et', 'ghana' => 'gh', 'nigeria' => 'ng', 'senegal' => 'sn', 'tunisia' => 'tn'];
                        $dest_code = $dest_country_codes[$destination['slug']] ?? strtolower(substr($destination['country_code'] ?? $destination['name'], 0, 2));
                        $dest_url = getCountryUrl($dest_code);
                        $dest_image = $destination['image_url'] ?: 'assets/images/default-destination.jpg';
                        ?>
                        <a href="<?= htmlspecialchars($dest_url) ?>" class="card">
                            <h3><?= htmlspecialchars($destination['name']) ?></h3>
                            <p><?= htmlspecialchars(mb_strimwidth(strip_tags($destination['tourism_description'] ?? ''), 0, 110, '...')) ?></p>
                            <p class="tiny muted"><?= (int)$destination['tour_count'] ?> Tours • <?= htmlspecialchars($destination['region_name']) ?></p>
                        </a>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No featured destinations yet. Activate featured countries to populate this section.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-head">
                <h2>Upcoming Departures</h2>
                <p>Browse scheduled tours and book your next adventure.</p>
            </div>
            <div class="card">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div>
                        <h3>Calendar</h3>
                        <div id="fyt-calendar-days" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 16px;"></div>
                    </div>
                    <div id="selectedDateTours">
                        <h3>Select a date</h3>
                        <p>Click on a highlighted day to view scheduled tours.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="card highlight">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;">
                    <div>
                        <h2>Join Our Newsletter</h2>
                        <p>Get travel updates, destination highlights, and curated offers. Stay connected to upcoming tours, events, and featured departures across the Forever Young Tours network.</p>
                        <form class="btn-row" style="margin-top: 24px;">
                            <input type="email" class="input" placeholder="Your email address" required style="flex: 1;">
                            <button type="submit" class="btn primary">Subscribe</button>
                        </form>
                    </div>
                    <div style="height: 300px; background: linear-gradient(135deg, rgba(218, 165, 32, 0.2), rgba(34, 139, 34, 0.2)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'); background-size: cover; background-position: center; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);"></div>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
(function() {
    const items = document.querySelectorAll('#fytTopbarRotator .fyt-topbar-item');
    if (!items.length) return;
    let current = 0;
    setInterval(() => {
        items[current].classList.remove('active');
        current = (current + 1) % items.length;
        items[current].classList.add('active');
    }, 4200);
})();

let currentDate = new Date();
const tourDates = <?php
try {
    $stmt = $pdo->query("SELECT DISTINCT scheduled_date as date FROM tour_schedules WHERE scheduled_date >= CURDATE() AND status = 'active' ORDER BY scheduled_date LIMIT 120");
    echo json_encode($stmt->fetchAll(PDO::FETCH_COLUMN));
} catch (Throwable $e) {
    echo json_encode([]);
}
?>;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthLabel = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    document.getElementById('current-month').textContent = monthLabel;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const container = document.getElementById('fyt-calendar-days');
    let html = '';
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="fyt-day other">${daysInPrevMonth - i}</div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasTours = tourDates.includes(dateStr);
        html += `<div class="fyt-day ${hasTours ? 'has-tour' : ''}" onclick="selectDate('${dateStr}', this)">${day}${hasTours ? '<span class="fyt-day-dot"></span>' : ''}</div>`;
    }
    container.innerHTML = html;
}

function previousMonth() { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); }

function selectDate(date, el) {
    document.querySelectorAll('.fyt-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    fetch(`admin/get_scheduled_tours.php?date=${date}`).then(r => r.json()).then(data => {
        const container = document.getElementById('selectedDateTours');
        if (data.tours && data.tours.length > 0) {
            container.innerHTML = `<div class="fyt-grid fyt-grid-3">${data.tours.map(tour => `<div class="fyt-card"><div class="fyt-card-body"><div class="fyt-meta"><span class="fyt-pill">${tour.duration_days} days</span><span class="fyt-pill">${tour.available_slots - tour.booked_slots} slots left</span></div><h3>${tour.tour_name}</h3><p>${tour.destination}</p><div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:16px;"><strong style="font-size:1.2rem;color:var(--primary-gold);">$${tour.price}</strong><a class="fyt-btn fyt-btn-primary" href="<?= $base_url ?>booking.php?tour_id=${tour.tour_id}&date=${date}">Book</a></div></div></div>`).join('')}</div>`;
        } else {
            container.innerHTML = `<div class="fyt-card"><div class="fyt-card-body"><h3>No tours scheduled</h3><p>There are currently no active scheduled departures for ${new Date(date).toLocaleDateString()}.</p></div></div>`;
        }
    }).catch(() => {
        document.getElementById('selectedDateTours').innerHTML = `<div class="fyt-card"><div class="fyt-card-body"><h3>Unable to load tours</h3><p>Please try again or contact support for departure information.</p></div></div>`;
    });
}

renderCalendar();
</script>

<?php include 'pages/inquiry-modal.php'; ?>
<?php include 'includes/footer.php'; ?>
