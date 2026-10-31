<?php
require __DIR__ . '/config.php';
date_default_timezone_set('Asia/Kolkata');
$e = clean(input());
$db = db();

$chk = $db->prepare('SELECT id FROM entry WHERE name = ? AND contactno = ?');
$chk->bind_param('ss', $e['name'], $e['contactno']);
$chk->execute();
if ($chk->get_result()->num_rows > 0) respond(409, ['message' => 'Already Submitted']);

$now = date('Y-m-d H:i:s');
$stmt = $db->prepare('INSERT INTO entry (name, contactno, arrangement, side, arrivaldate, arrivaltime, comingfrom, mode, flightno, trainname, adult, children, createdate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
$stmt->bind_param('ssssssssssiis', $e['name'], $e['contactno'], $e['arrangement'], $e['side'], $e['arrivaldate'], $e['arrivaltime'], $e['comingfrom'], $e['mode'], $e['flightno'], $e['trainname'], $e['adult'], $e['children'], $now);
if (!$stmt->execute()) respond(500, ['message' => 'Could not save. Please try again.']);
respond(200, ['message' => 'Submitted Successfully']);
