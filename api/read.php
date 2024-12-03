<?php
include '../config/db.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT * FROM tasks ORDER BY id DESC");
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($tasks);
?>