<?php
$host = 'localhost';
$dbname = 'todo_db';
$username = 'root'; //default username & pass for a db
$password = '';

try { //connecting to the db, pdo= php db objects 
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
