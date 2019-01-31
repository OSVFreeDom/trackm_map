namespace TrackM {
    export class Entity {
        id: string;
        name: string;
        type: string;
        position: Vector2;
        velocity: Vector3;
        meta: { [key: string]: string };
        properties: { [key: string]: any };

        private state: State;
        private metaRequest: XMLHttpRequest;
    
        constructor(state: State, id: string) {
            this.state = state;
            this.id = id;
            this.meta = {};
            this.properties = {};

            this.metaRequest = new XMLHttpRequest();
            this.metaRequest.onreadystatechange = this.metadataResponse.bind(this);
        }

        updateMetadata() {
            this.metaRequest.open('GET', this.state.baseURL + '/meta.php?id=' + this.id + '&token=' + this.state.token, true);
            this.metaRequest.send();
        }

        private metadataResponse() {
            if (!(this.metaRequest.readyState === 4 && this.metaRequest.status === 200)) {
                return;
            }

            delete this.meta;
            this.meta = {};

            let body = JSON.parse(this.metaRequest.responseText);

            for (let key in body) {
                this.meta[key] = body[key];
            }
        }
    }
}