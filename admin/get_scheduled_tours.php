<?php

require_once '../config.php';
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_GET['date'])) {
    echo json_encode(['tours' => []]);
    exit;
}

$date = $_GET['date'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            ts.id as schedule_id,
            t.id as tour_id,
            t.title as tour_name,
            t.price,
            t.duration_days,
            c.name as destination,
            ts.available_slots,
            COALESCE(COUNT(b.id), 0) as booked_slots
        FROM tour_schedules ts
        JOIN tours t ON ts.tour_id = t.id
        LEFT JOIN countries c ON t.country_id = c.id
        LEFT JOIN bookings b ON ts.id = b.schedule_id AND b.status != 'cancelled'
        WHERE ts.scheduled_date = ? AND ts.status = 'active' AND t.status = 'active'
        GROUP BY ts.id, t.id
    ");
    $stmt->execute([$date]);
    $tours = $stmt->fetchAll();

    echo json_encode(['tours' => $tours]);
} catch (Exception $e) {
    echo json_encode(['tours' => [], 'error' => $e->getMessage()]);
}
