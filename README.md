<h1 align="center">
    TrackM
    <small>&mdash; Live Map for FiveM</small>
</h1>
TrackM is an entity tracking live map for FiveM game servers.

**NOTE: There are two parts to a TrackM server: the FiveM script and the web interface. This repositiory only contains the web interface.**

## Install

### Requirements
* A configured web server (Apache, nginx, etc.)
* PHP 5.6+ with the [phpredis](https://pecl.php.net/package/redis) extension.
* Redis 2.8+ server.
* A FiveM server running the [TrackM](https://github.com/randomsean/TrackM) script.

### From a release build
* From the [releases](https://github.com/randomsean/trackm_map/releases) page, download the latest zip or tar.gz file.
* Unzip or untar the file to a public web directory.
* [Download](https://github.com/randomsean/maps/releases) or use your own map images.
* Create map tiles from a large map image using [tiler](https://github.com/randomsean/tiler) and copy them to `img/map/[type]`.
* See [Configuration](#Configuration) for further set up.

## Configuration

The TrackM web interface is configured in the `config.php` file.
The following settings are available:
| Name              | Type     | Default                   | Description                                              |
| ----------------- | -------- | ------------------------- | -------------------------------------------------------- |
| `NAME`            | `string` | `'TrackM'`                | Name that appears on the side menu and tab.              |
| `SITE_URL`        | `string` | `'http://127.0.0.1:8080'` | Base URL for the site. (Note: omit trailing slash `/`)   |
| `MAP_TYPE`        | `string` | `'road'`                  | Map tile directory in `img/`                             |
| `REDIS_HOST`      | `string` | `'127.0.0.1'`             | Redis server hostname                                    |
| `REDIS_PORT`      | `int`    | `6379`                    | Redis server port
| `UPDATE_INTERVAL` | `int`    | `1000`                    | Frequency the client will query for data (milliseconds). |