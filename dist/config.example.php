<?php

// Name displayed on the sidebar menu and title.
define('NAME', 'TrackM');

// URL is a valid base URL for the site.
// NOTE: it must NOT contain a trailing slash '/'.
define('SITE_URL', 'http://localhost:8080');

// Name of the directory in img/ where the map tiles are stored.
define('MAP_TYPE', 'road');

// Redis server hostname
define('REDIS_HOST', '127.0.0.1');
// Redis server port number
define('REDIS_PORT', 6379);

// How often the browser will check for position and metadata updates.
define('UPDATE_INTERVAL', 1000);

?>