<?php
require_once 'config.php';

session_start();

if (empty($_GET['token']) || empty($_GET['id'])) {
    http_response_code(400);
    return;
}

if (!hash_equals($_SESSION['token'], $_GET['token'])) {
    http_response_code(403);
    return;
}

$id = $_GET['id'];

header("Access-Control-Allow-Origin: *");

$redis = new Redis();
$redis->connect(REDIS_HOST, REDIS_PORT);

$meta = $redis->hgetall('meta_'.$id);

if ($meta != false) {
    echo json_encode($meta);
}
