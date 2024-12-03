<?php
include '../config/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $completed = $data['completed'] ? 1 : 0; // convert true/false to 1/0 for database

    $stmt = $pdo->prepare("UPDATE tasks SET completed = ? WHERE id = ?");

    $stmt->execute([$completed, $id]);
    echo json_encode(['success' => true]);
}
?>