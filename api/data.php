<?php
/**
 * Eklavya Group Tution - Data API
 * Handles saving and loading data for the admin panel
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Data directory (relative to this file)
$dataDir = __DIR__ . '/../data/';

// Ensure data directory exists
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Valid data types and their files
$validTypes = [
    'achievements' => 'achievements.json',
    'faculty' => 'faculty.json',
    'events' => 'events.json',
    'gallery' => 'gallery.json',
    'stats' => 'stats.json',
    'main_faculty' => 'main_faculty.json'
];

// Get request type
$type = '';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $type = $_GET['type'] ?? '';
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    $type = $input['type'] ?? '';
    $data = $input['data'] ?? null;
}

// Validate type
if (!isset($validTypes[$type])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid data type. Valid types: ' . implode(', ', array_keys($validTypes))
    ]);
    exit;
}

$filePath = $dataDir . $validTypes[$type];

// GET - Read data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($filePath)) {
        $content = file_get_contents($filePath);
        echo $content;
    } else {
        // Return empty array/object based on type
        if ($type === 'stats' || $type === 'main_faculty') {
            echo '{}';
        } else {
            echo '[]';
        }
    }
    exit;
}

// POST - Save data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No data provided']);
        exit;
    }
    
    // Save data
    $result = file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result !== false) {
        echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save data. Check file permissions.']);
    }
    exit;
}

// Invalid method
http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
?>
