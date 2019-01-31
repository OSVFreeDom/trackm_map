namespace TrackM {
    export class State {
        baseURL: string;
        token: string;
        entities: { [key: string]: Entity };

        private selected: Entity;
        private xhr: XMLHttpRequest;
        private url: string;
        private map: Map;
        private menu: Menu;
        private connected: boolean = true;
        
        constructor(map: Map, menu: Menu, baseURL: string, token: string) {
            this.entities = {};

            this.map = map;
            this.menu = menu;
            this.baseURL = baseURL;
            this.token = token;
            this.url = baseURL + '/state.php?token=' + token;
            this.xhr = new XMLHttpRequest();
            this.xhr.onload = this.response.bind(this);
            this.xhr.ontimeout = this.failed.bind(this);
            this.xhr.onerror = this.failed.bind(this);
            
            this.xhr.open('GET', this.url);
            this.xhr.timeout = 900;
            this.xhr.send();
        }

        private failed() {
            if (this.connected) {
                this.connected = false;
                this.menu.setStatus("OFFLINE");
            }
        }

        update() {
            if (this.xhr != null || this.xhr != undefined) {
                this.xhr.open('GET', this.url);
                this.xhr.timeout = 900;
                this.xhr.send();
            }
            if (this.selected != undefined) {
                this.selected.updateMetadata();
                if (this.menu.detailBox != null) {
                    this.menu.detailBox.update();
                }
            }
        }

        select(e: Entity) {
            this.selected = e;
            this.map.centerOn(e);
        }

        isSelected(e: Entity): boolean {
            return this.selected == e;
        }

        private response() {
            if (!(this.xhr.readyState === XMLHttpRequest.DONE && this.xhr.status === 200)) {
                return;
            }

            if (!this.connected) {
                this.connected = true;
                this.menu.setStatus("");
            }

            let body = JSON.parse(this.xhr.responseText);

            let modified: { [id: string]: boolean } = {};

            for (let id in body) {
                let e: Entity;
                let make = this.entities[id] === undefined;

                if (make) {
                    e = new Entity(this, id);
                    this.entities[id] = e;
                } else {
                    e = this.entities[id];
                }
                
                for (let key in body[id]) {
                    let val = body[id][key];
                    switch (key) {
                        case 'pos':
                            let v = val.split(',');
                            e.position = new Vector2(v[0], v[1]);
                            break;
                        case 'name':
                            e.name = val;
                            break;
                        case 'icon':
                            e.type = val;
                            break;
                        default:
                            e.meta[key] = val;
                            break;
                    }
                }

                if (make) {
                    this.menu.addEntity(this, e);
                    this.map.addEntity(e);
                } else {
                    this.map.updateEntity(this, e);
                }

                modified[id] = true;
            }

            for (let id in this.entities) {
                if (modified[id] === undefined) {
                    let e = this.entities[id];

                    console.log('remove '  + id);

                    this.menu.removeEntity(this, e);
                    this.map.removeEntity(e);

                    delete this.entities[id];
                }
            }
        }
    }
}