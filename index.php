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

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

.hero-section {
    background: #ffffff;
    padding: 60px 24px;
    margin-bottom: 0;
    min-height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.hero-container {
    background: linear-gradient(to bottom right, #1e3a8a 0%, #1e40af 50%, #06b6d4 100%);
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    position: relative;
    max-width: 1300px;
    width: 100%;
    transition: all 0.3s ease;
}

.hero-container:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    padding: 50px 60px;
    position: relative;
    z-index: 10;
}

.hero-content {
    width: 100%;
}

.hero-content h1 {
    font-size: 3.2rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 20px;
    line-height: 1.15;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.hero-content p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 32px;
    line-height: 1.7;
    font-weight: 500;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.btn-row {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    animation: float 3s ease-in-out infinite;
}

.circular-container {
    position: relative;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1;
}

.circle-main {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%);
    border: 1px solid rgba(255, 255, 255, 0.26);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
}

.circle-border {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 22px solid rgba(255, 255, 255, 0.28);
    border-top-color: rgba(255, 255, 255, 0.85);
    border-right-color: rgba(255, 255, 255, 0.55);
    transform: rotate(34deg);
    transition: transform 0.5s ease;
}

.circle-main:hover .circle-border {
    transform: rotate(44deg);
}

.orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.24) 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.orb-large {
    width: 48px;
    height: 48px;
    right: -24px;
    top: 33.33%;
}

.orb-small {
    width: 32px;
    height: 32px;
    left: 8px;
    top: -16px;
}

.circle-main:hover .orb {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.circle-main:hover .orb:hover {
    transform: scale(1.1);
}

.stat-item {
    display: none;
}

.hero-stats {
    display: none;
}

@media (max-width: 1024px) {
    .hero-grid {
        grid-template-columns: 1fr;
        padding: 40px 40px;
        gap: 30px;
    }
    
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .hero-visual {
        min-height: 280px;
    }
}

@media (max-width: 768px) {
    .hero-section {
        padding: 40px 16px;
        min-height: auto;
    }
    
    .hero-container {
        border-radius: 16px;
    }
    
    .hero-grid {
        grid-template-columns: 1fr;
        padding: 30px 20px;
        gap: 20px;
    }
    
    .hero-content h1 {
        font-size: 2rem;
    }
    
    .hero-content p {
        font-size: 1rem;
        margin-bottom: 24px;
    }
    
    .btn-row {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        text-align: center;
    }
    
    .hero-visual {
        min-height: 200px;
    }
    
    .circular-container {
        max-width: 220px;
    }
}
</style>

<main class="main">
    <section class="hero-section">
        <div class="hero-container">
            <div class="hero-grid">
                <div class="hero-content">
                    <h1>Live Bold. Stay Forever Young.</h1>
                    <p>Curated travel experiences, tours, cruises, cultural exchanges, conferences, and premium group journeys across Africa, the Caribbean, Europe, and beyond.</p>
                    <div class="btn-row">
                        <a href="<?= $base_url ?>pages/packages.php" class="btn primary">Plan Your Next Trip</a>
                        <a href="<?= $base_url ?>auth/register.php" class="btn secondary">Join Our Community</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="circular-container">
                        <div class="circle-main">
                            <div class="circle-border">
                                <div class="orb orb-large"></div>
                                <div class="orb orb-small"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="section-head">
                <h2>Travel Categories Designed for Every Journey</h2>
                <p>Discover premium, systems-driven travel experiences structured around comfort, curation, destination quality, and meaningful outcomes.</p>
            </div>
            <div class="grid cards-3">
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/adventure tours 1.jpg" alt="Adventure Tours" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Adventure Tours</h3>
                        <p>Wild landscapes, trekking, safari moments, and bold itineraries.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/adventure tours.jpg" alt="Agro Tours" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Agro Tours</h3>
                        <p>Discover agriculture, local production, sustainability, and enterprise ecosystems.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/City Break.jpg" alt="City Breaks" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>City Breaks</h3>
                        <p>Short escapes with strong culture, dining, nightlife, and guided experiences.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/Cruises.jpg" alt="Cruises" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Cruises</h3>
                        <p>Relaxed luxury, curated ports, and ocean experiences with premium flow.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/Cultural Exchanges.jpg" alt="Cultural Exchanges" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Cultural Exchanges</h3>
                        <p>Programs focused on people, learning, heritage, and meaningful connection.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/Motorcoach Tours.jpg" alt="Motorcoach Tours" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Motorcoach Tours</h3>
                        <p>Comfortable road journeys with group structure and scenic routes.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/Rail Tours.jpg" alt="Rail Tours" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Rail Tours</h3>
                        <p>Scenic train-based travel for elegant movement and slow discovery.</p>
                    </div>
                </div>
                <div class="category-card">
                    <div class="category-img">
                        <img src="<?= $base_url ?>public/images/Conferences & Expos.jpg" alt="Conferences & Expos" onerror="this.src='<?= $base_url ?>assets/images/default-tour.jpg'">
                    </div>
                    <div class="category-content">
                        <h3>Conferences & Expos</h3>
                        <p>Business travel, networking events, delegation logistics, and structured access.</p>
                    </div>
                </div>
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
                    <div style="height: 300px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.2)), url('<?= $base_url ?>public/images/news letter 2.jpg'); background-size: cover; background-position: center; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);"></div>
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
