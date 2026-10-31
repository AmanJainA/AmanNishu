<?php
// Same database as the original site. Override with environment variables in production.
function db(): mysqli {
    mysqli_report(MYSQLI_REPORT_OFF);
    $conn = new mysqli(
        getenv('DB_HOST') ?: 'localhost',
        getenv('DB_USER') ?: 'root',
        getenv('DB_PASS') ?: '',
        getenv('DB_NAME') ?: 'data'
    );
    if ($conn->connect_error) { respond(500, ['message' => 'Database unavailable']); }
    $conn->set_charset('utf8mb4');
    return $conn;
}

function respond(int $code, array $body): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($body);
    exit;
}

function input(): array {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['message' => 'POST only']);
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function clean(array $d): array {
    $s = fn($k) => trim((string)($d[$k] ?? ''));
    $e = [
        'name' => $s('name'), 'contactno' => $s('contactno'), 'arrangement' => $s('arrangement'),
        'side' => $s('side'), 'arrivaldate' => $s('arrivaldate'), 'arrivaltime' => $s('arrivaltime'),
        'comingfrom' => $s('comingfrom'), 'mode' => $s('mode'), 'flightno' => $s('flightno'),
        'trainname' => $s('trainname'), 'adult' => (int)($d['adult'] ?? 1), 'children' => (int)($d['children'] ?? 0),
    ];
    if (!preg_match('/^[6789][0-9]{9}$/', $e['contactno'])) respond(422, ['message' => 'Please enter valid contact number']);
    if ($e['name'] === '' || !in_array($e['arrangement'], ['Yes', 'No'], true)) respond(422, ['message' => 'Please fill all required fields']);
    return $e;
}
