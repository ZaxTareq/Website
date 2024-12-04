<?php

function pingServer($host, $port = 19132) {
    $timeout = 1;
    $socket = fsockopen("udp://$host", $port, $errno, $errstr, $timeout);
    if (!$socket) {
        return json_encode(['status' => 'offline']);
    }

    $pingPacket = "\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\xff\xff\x00\xfe\xfe\xfe\xfd\xff\xff\xff\xff";
    fwrite($socket, $pingPacket);
    $start = microtime(true);

    $response = fread($socket, 4096);
    $ping = round((microtime(true) - $start) * 1000);
    fclose($socket);

    if ($response) {
        return json_encode([
            'status' => 'online',
            'ping' => $ping,
            'players' => 'Unknown',
            'motd' => 'Minecraft Server'
        ]);
    } else {
        return json_encode(['status' => 'offline']);
    }
}

if (isset($_GET['host'])) {
    echo pingServer($_GET['host']);
}
?>
