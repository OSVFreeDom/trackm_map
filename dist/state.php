<?php
require_once 'config.php';

session_start();

if (empty($_GET['token'])) {
    http_response_code(400);
    return;
}

if (!hash_equals($_SESSION['token'], $_GET['token'])) {
    http_response_code(403);
    return;
}

header("Access-Control-Allow-Origin: *");

$redis = new Redis();
$redis->connect(REDIS_HOST, REDIS_PORT);

$data = array();

$entities = $redis->sMembers('entities');

foreach ($entities as $entity) {
    $item = [
        "name" => $redis->hGet('meta_'.$entity, 'name'),
        "pos" => $redis->hGet('meta_'.$entity, 'pos'),
        "icon" => $redis->hGet('meta_'.$entity, 'icon'),
    ];
    $data[$entity] = $item;
}

echo json_encode($data);