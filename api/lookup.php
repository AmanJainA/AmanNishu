<?php
require __DIR__ . '/config.php';
$d = input();
$contact = trim((string)($d['contactno'] ?? ''));
$stmt = db()->prepare('SELECT name, contactno, arrangement, side, arrivaldate, arrivaltime, comingfrom, mode, flightno, trainname, adult, children FROM entry WHERE contactno = ? LIMIT 1');
$stmt->bind_param('s', $contact);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();
respond(200, ['entry' => $row ?: null]);
