<?php
require_once 'config.php';
require_once 'token.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title><?php echo NAME; ?></title>

    <link rel= "stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="favicon.ico">
  </head>
  <body>
    <script type="application/javascript" src="js/trackm.min.js"></script>

    <div id="detail"></div>
    <div id="menu"></div>
    <div id="map"></div>

    <!--[if lte IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.10/es5-shim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
    <![endif]-->
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>
    <script>
        var map = new TrackM.Map('map', '<?php echo MAP_TYPE; ?>');
        var menu = new TrackM.Menu('menu', '<?php echo NAME; ?>');
        let state = new TrackM.State(map, menu, '<?php echo SITE_URL; ?>', '<?php echo $_SESSION['token']; ?>');
        setInterval(function() { state.update() }.bind(state), <?php echo UPDATE_INTERVAL; ?>);
    </script>
  </body>
</html>