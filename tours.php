<?php
require_once 'config.php';
$page_title = "Explore Our Tours | Forever Young Tours";
$page_description = "Discover curated travel experiences across continents. Adventure tours, cultural exchanges, cruises, city breaks, and premium group journeys.";
$active_nav = "tours";
require __DIR__ . "/includes/header.php";
require_once 'config/database.php';
require_once 'config/environment.php';

$continents = [];
try {
    $stmt = $pdo->prepare("SELECT r.id, r.name, COUNT(DISTINCT c.id) as country_count, COUNT(t.id) as tour_count 
                          FROM regions r 
                          LEFT JOIN countries c ON r.id = c.region_id AND c.status = 'active'
                          LEFT JOIN tours t ON c.id = t.country_id AND t.status = 'active'
                          WHERE r.status = 'active' 
                          GROUP BY r.id, r.name 
                          ORDER BY r.name");
    $stmt->execute();
    $continents = $stmt->fetchAll();
} catch (Throwable $e) {
    $continents = [];
}

$featured_tours = [];
try {
    $stmt = $pdo->prepare("SELECT t.*, c.name as country_name, r.name as region_name 
                          FROM tours t 
                          LEFT JOIN countries c ON t.country_id = c.id 
                          LEFT JOIN regions r ON c.region_id = r.id 
                          WHERE t.status = 'active' AND t.featured = 1 
                          ORDER BY t.created_at DESC 
                          LIMIT 6");
    $stmt->execute();
    $featured_tours = $stmt->fetchAll();
} catch (Throwable $e) {
    $featured_tours = [];
}
?>

<style>
.tours-hero {
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.85), rgba(34, 139, 34, 0.8)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&h=500&fit=crop');
    background-size: cover;
    background-position: center;
    padding: 100px 24px;
    text-align: center;
    color: var(--white);
    margin-bottom: 60px;
}

.tours-hero h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.tours-hero p {
    font-size: 1.3rem;
    max-width: 800px;
    margin: 0 auto 40px;
    line-height: 1.8;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.continent-card {
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(218, 165, 32, 0.12);
    transition: all 0.3s ease;
    text-decoration: none;
    display: block;
    height: 100%;
}

.continent-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(218, 165, 32, 0.2);
}

.continent-img {
    height: 200px;
    background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
    position: relative;
    overflow: hidden;
}

.continent-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.continent-body {
    padding: 24px;
    text-align: center;
}

.continent-body h3 {
    font-size: 1.5rem;
    color: var(--primary-gold);
    margin-bottom: 12px;
    font-weight: 800;
}

.continent-stats {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 16px;
}

.continent-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.continent-stat strong {
    font-size: 1.5rem;
    color: var(--primary-gold);
    font-weight: 900;
}

.continent-stat span {
    font-size: 0.85rem;
    color: var(--text-light);
}

.tour-types-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 40px;
}

.tour-type-card {
    background: var(--white);
    padding: 32px 24px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 16px rgba(218, 165, 32, 0.1);
    transition: all 0.3s ease;
}

.tour-type-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(218, 165, 32, 0.15);
}

.tour-type-icon {
    font-size: 3rem;
    margin-bottom: 16px;
}

.tour-type-card h4 {
    font-size: 1.1rem;
    color: var(--primary-gold);
    margin-bottom: 8px;
    font-weight: 700;
}

.tour-type-card p {
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.6;
}

.info-banner {
    background: linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(34, 139, 34, 0.1));
    padding: 48px 32px;
    border-radius: 16px;
    text-align: center;
    margin: 60px 0;
}

.info-banner h2 {
    font-size: 2rem;
    color: var(--primary-gold);
    margin-bottom: 16px;
    font-weight: 900;
}

.info-banner p {
    font-size: 1.1rem;
    color: var(--text-dark);
    max-width: 800px;
    margin: 0 auto 32px;
    line-height: 1.8;
}

@media (max-width: 768px) {
    .tours-hero h1 {
        font-size: 2rem;
    }
    .tour-types-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<div class="tours-hero">
    <h1>Discover Your Next Adventure</h1>
    <p>Explore curated travel experiences across continents. From cultural exchanges to adventure tours, cruises to city breaks—find your perfect journey.</p>
    <div class="btn-row">
        <a href="#destinations" class="btn primary">Browse Destinations</a>
        <a href="<?= $base_url ?>create-your-own-tour.php" class="btn secondary">Create Custom Tour</a>
    </div>
</div>

<section class="container section" id="destinations">
    <div class="section-head">
        <h2>Explore by Continent</h2>
        <p>Choose your destination and discover unforgettable experiences across the globe.</p>
    </div>

    <div class="grid cards-3">
        <?php if (!empty($continents)): ?>
            <?php 
            $continent_images = [
                'Africa' => 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
                'Asia' => 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
                'Europe' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
                'North America' => 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=400&h=300&fit=crop',
                'South America' => 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
                'Caribbean' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
                'Oceania' => 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop'
            ];
            ?>
            <?php foreach ($continents as $continent): ?>
                <a href="<?= $base_url ?>?continent=<?= urlencode(strtolower(str_replace(' ', '-', $continent['name']))) ?>" class="continent-card">
                    <div class="continent-img">
                        <img src="<?= $continent_images[$continent['name']] ?? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop' ?>" alt="<?= htmlspecialchars($continent['name']) ?>">
                    </div>
                    <div class="continent-body">
                        <h3><?= htmlspecialchars($continent['name']) ?></h3>
                        <p>Explore diverse cultures and landscapes</p>
                        <div class="continent-stats">
                            <div class="continent-stat">
                                <strong><?= (int)$continent['country_count'] ?></strong>
                                <span>Countries</span>
                            </div>
                            <div class="continent-stat">
                                <strong><?= (int)$continent['tour_count'] ?></strong>
                                <span>Tours</span>
                            </div>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="card">
                <h3>Destinations Coming Soon</h3>
                <p>We're adding new destinations. Check back soon!</p>
            </div>
        <?php endif; ?>
    </div>
</section>

<section class="container section">
    <div class="section-head">
        <h2>Tour Types & Experiences</h2>
        <p>Choose the travel style that matches your interests and preferences.</p>
    </div>

    <div class="tour-types-grid">
        <div class="tour-type-card">
            <div class="tour-type-icon">🏔️</div>
            <h4>Adventure Tours</h4>
            <p>Trekking, safari, and bold outdoor experiences</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🎭</div>
            <h4>Cultural Tours</h4>
            <p>Heritage sites, local traditions, and authentic experiences</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🚢</div>
            <h4>Cruises</h4>
            <p>Luxury ocean voyages and curated port experiences</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🏙️</div>
            <h4>City Breaks</h4>
            <p>Urban exploration, dining, and nightlife</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🌾</div>
            <h4>Agro Tours</h4>
            <p>Farm visits, sustainability, and local production</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🚌</div>
            <h4>Motorcoach Tours</h4>
            <p>Comfortable group journeys with scenic routes</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🚂</div>
            <h4>Rail Tours</h4>
            <p>Elegant train travel through stunning landscapes</p>
        </div>
        <div class="tour-type-card">
            <div class="tour-type-icon">🎯</div>
            <h4>Conferences</h4>
            <p>Business travel, networking, and professional events</p>
        </div>
    </div>
</section>

<?php if (!empty($featured_tours)): ?>
<section class="container section">
    <div class="section-head">
        <h2>Featured Tours</h2>
        <p>Handpicked experiences from our most popular destinations.</p>
    </div>

    <div class="grid cards-3">
        <?php foreach ($featured_tours as $tour): ?>
            <article class="tour-card">
                <div class="tour-img">
                    <?php $tour_image = !empty($tour['image_url']) ? $tour['image_url'] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop'; ?>
                    <img src="<?= htmlspecialchars($tour_image) ?>" alt="<?= htmlspecialchars($tour['title']) ?>" onerror="this.style.display='none';">
                </div>
                <div class="tour-body">
                    <h3><?= htmlspecialchars($tour['title']) ?></h3>
                    <p class="muted"><?= htmlspecialchars($tour['country_name'] ?? 'Destination') ?> • <?= htmlspecialchars($tour['region_name'] ?? '') ?></p>
                    <p><?= htmlspecialchars(mb_strimwidth(strip_tags($tour['description'] ?? ''), 0, 120, '...')) ?></p>
                    <a href="<?= $base_url ?>booking.php?tour_id=<?= urlencode($tour['id']) ?>" class="btn primary" style="margin-top: 16px;">Book This Tour</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<?php endif; ?>

<section class="container">
    <div class="info-banner">
        <h2>Why Travel With Forever Young Tours?</h2>
        <p>We curate premium travel experiences with attention to comfort, quality, and meaningful connections. Our expert advisors design journeys that go beyond typical tourism—creating memories that last forever.</p>
        <div class="btn-row">
            <a href="<?= $base_url ?>membership.php" class="btn primary">Join Our Community</a>
            <a href="<?= $base_url ?>about.php" class="btn secondary">Learn More</a>
        </div>
    </div>
</section>

<section class="container section">
    <div class="section-head">
        <h2>Ready to Start Your Journey?</h2>
        <p>Browse our destinations, create a custom tour, or speak with a travel advisor.</p>
    </div>
    <div class="btn-row" style="justify-content: center;">
        <a href="<?= $base_url ?>create-your-own-tour.php" class="btn primary">Create Custom Tour</a>
        <a href="<?= $base_url ?>contact.php" class="btn secondary">Contact an Advisor</a>
        <a href="<?= $base_url ?>membership.php" class="btn secondary">Membership Benefits</a>
    </div>
</section>

<?php require __DIR__ . "/includes/footer.php"; ?>
