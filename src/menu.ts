namespace TrackM {
    export class Menu {
        menu: Element;
        header: HTMLHeadingElement;
        status: HTMLHeadingElement;

        entityList: HTMLUListElement;
        private selected: HTMLLIElement;

        detailBox: DetailBox;
        
        constructor(id: string, title: string) {
            this.menu = document.getElementById(id);
    
            this.header = document.createElement('h1');
            this.header.className = 'header';
            this.header.innerText = title;
            this.menu.appendChild(this.header);

            this.status = document.createElement('h4');
            this.status.className = 'status';
            this.status.innerText = 'Offline';
            this.status.hidden = true;
            this.menu.appendChild(this.status);

            let body = document.createElement('div');
            body.className = 'body';

            this.entityList = document.createElement('ul');
            this.entityList.className = 'entities';
            body.appendChild(this.entityList);

            this.menu.appendChild(body);

            this.detailBox = new DetailBox('detail');
        }

        setStatus(status: string) {
            if (status == undefined || status == "") {
                this.status.hidden = true;
            } else {
                this.status.innerText = status;
                this.status.hidden = false;
            }
        }
    
        setHeaderTitle(title: string) {
            this.header.innerText = title;
        }
    
        setHeaderColor(text: string, background: string) {
            this.header.style.color = text;
            this.header.style.backgroundColor = background;
        }
    
        addEntity(state: State, e: TrackM.Entity): HTMLLIElement {
            let li = document.createElement('li');
            li.className = 'entity';
            li.id = 'entity_' + e.id;
            li.onclick = function(e: Event){ this.selectEntity(state, e.currentTarget) }.bind(this);

            let img = document.createElement('img');
            img.className = 'icon';
            img.src = 'img/icon/icon_' + e.type + '.png'; 
            li.appendChild(img);

            let name = document.createElement('span');
            name.className = 'name';
            name.innerText = e.name;
            li.appendChild(name);

            this.entityList.appendChild(li);
            
            return li;
        }
    
        removeEntity(state: State, e: TrackM.Entity) {
            if (state.isSelected(e)) {
                this.detailBox.setHidden(true);
            }

            let li = document.getElementById('entity_' + e.id);
            li.remove();
        }

        selectEntity(state: State, target: HTMLLIElement): void {
            let id = target.id.substr(target.id.indexOf('_')+1);

            this.detailBox.entity = state.entities[id];
            this.detailBox.update();

            if (this.selected != null) {
                this.selected.classList.remove('selected');
            }

            if (this.selected == target) {
                this.selected = null;
                state.select(null);
                this.detailBox.setHidden(true);
                return;
            }

            target.classList.add('selected');

            this.selected = target;

            state.select(state.entities[id]);
            this.detailBox.setHidden(false);
        }
    }

    export class DetailBox {
        private box: HTMLElement;
        private name: HTMLHeadingElement;
        private table: HTMLTableElement;

        public entity: Entity;

        private reservedKeys = ["name", "pos", "icon"];

        constructor(id: string) {
            this.box = document.getElementById(id);
            this.box.hidden = true;

            this.name = document.createElement('h4');
            this.name.className = 'name';
            this.name.id = 'detail_name';
            this.box.appendChild(this.name);

            this.table = document.createElement('table');
            this.table.id = 'detail_meta';
            this.box.appendChild(this.table);
        }

        setHidden(hidden: boolean) {
            this.box.hidden = hidden;
        }

        update() {
            while (this.table.firstChild) {
                this.table.removeChild(this.table.firstChild);
            }

            this.name.innerText = this.entity.name;

            for (let key in this.entity.meta) {
                let isReserved = false;
                for (let i = 0; i < this.reservedKeys.length; i++) {
                    if (key == this.reservedKeys[i]) {
                        isReserved = true;
                        break;
                    }
                }
                if (isReserved) {
                    continue;
                }

                let val = this.entity.meta[key];

                let row = document.createElement('tr');
                
                let keyEl = document.createElement('td');
                keyEl.innerText = key;
                row.appendChild(keyEl);

                let valEl = document.createElement('td');
                valEl.innerText = val;
                row.appendChild(valEl);

                this.table.appendChild(row);
            }
        }
    }
}