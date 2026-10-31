<?php
require __DIR__ . '/config.php';
date_default_timezone_set('Asia/Kolkata');
$e = clean(input());
$now = date('Y-m-d H:i:s');
$stmt = db()->prepare('UPDATE entry SET name=?, arrangement=?, side=?, arrivaldate=?, arrivaltime=?, comingfrom=?, mode=?, flightno=?, trainname=?, adult=?, children=?, updatedate=? WHERE contactno=?');
$stmt->bind_param('sssssssssiiss', $e['name'], $e['arrangement'], $e['side'], $e['arrivaldate'], $e['arrivaltime'], $e['comingfrom'], $e['mode'], $e['flightno'], $e['trainname'], $e['adult'], $e['children'], $now, $e['contactno']);
if (!$stmt->execute()) respond(500, ['message' => 'Could not update. Please try again.']);
respond(200, ['message' => 'Updated Successfully']);
