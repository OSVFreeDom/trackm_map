namespace TrackM {
    const MapWidth = 8192;
    const MapHeight = 8192;
    const TileSize = 256;

    export class Map {
        private map: ol.Map;
        private icons: ol.source.Vector;

        private readonly xScale = 0.6582967910711797;
        private readonly xOffset = -341;
        private readonly yScale = 0.658570431755639;
        private readonly yOffset = -1432;
        
        constructor(id: string, type: string) {
            var projection = new ol.proj.Projection({
                code: 'ZOOMIFY',
                units: 'pixels',
                extent: [-(MapWidth / 2), -(MapHeight / 2), MapWidth / 2, MapHeight / 2]
            });
        
            var projectionExtent = projection.getExtent();
            var maxResolution = ol.extent.getWidth(projectionExtent) / TileSize;
        
            var resolutions = [];
            for (var z = 1; z <= 5; z++) {
                resolutions[z-1] = maxResolution / Math.pow(2, z);
            }
        
            var tileLayer = new ol.layer.Tile({
                source: new ol.source.TileImage({
                    tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                        return ('img/' + type + '/{z}_{x}_{y}.png')
                            .replace('{z}', (tileCoord[0] + 1).toString())
                            .replace('{x}', (tileCoord[1]).toString())
                            .replace('{y}', ((-tileCoord[2]) - 1).toString());
                    },
                    wrapX: true,
                    projection: projection,
                    tileGrid: new ol.tilegrid.TileGrid({
                        origin: ol.extent.getTopLeft(projectionExtent),
                        resolutions: resolutions,
                        tileSize: TileSize
                    })
                }),
                extent: projectionExtent
            });
        
            var view = new ol.View({
                projection: projection,
                center: [0, 0],
                extent: projectionExtent,
                zoom: 1,
                resolutions: resolutions
            });
        
            this.icons = new ol.source.Vector();
            var entityLayer = new ol.layer.Vector({
                source: this.icons,
                updateWhileAnimating: true,
                updateWhileInteracting: true,
                style: function(feature, resolution) {
                    var type = feature.getProperties()['type'];
                    return new ol.style.Style({
                        image: new ol.style.Icon({
                            crossOrigin: 'anonymous',
                            src: 'img/icon/icon_' + type + ".png",
                            scale: (this.map.map.getView().getResolutionForZoom(3) / resolution) / 2
                        })
                    });
                }
            });
        
            this.map = new ol.Map({
                target: id,
                view: view,
                layers: [tileLayer, entityLayer],
                controls: []
            });

            let el = document.getElementById(id);
            el.className = 'map_' + type;
        }

        private displayCoords(p: Vector2): [number, number] {
            return [p.x * this.xScale + this.xOffset, p.y * this.yScale + this.yOffset];
        }

        removeEntity(e: Entity) {
            this.icons.removeFeature(e.properties.feature);
            e.properties.feature = null;
        }

        centerOn(e: Entity) {
            if (e != null) {
                this.map.getView().setCenter(this.displayCoords(e.position));
            }
        }

        addEntity(e: Entity) {
            let feature = new ol.Feature();
            feature.setProperties({'type': e.type});
            feature.setGeometry(new ol.geom.Point(this.displayCoords(e.position)));
            this.icons.addFeature(feature);
            e.properties.feature = feature;
        }

        updateEntity(state: State, e: Entity) {
            e.properties.feature.setGeometry(new ol.geom.Point(this.displayCoords(e.position)));
            if (state.isSelected(e)) {
                this.centerOn(e);
                return;
            }
        }
    }
}