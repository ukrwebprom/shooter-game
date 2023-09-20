import {Soldier} from './soldier';
import { getCellSize } from './units';
import { updateScreen } from './screen-manager';

class Character {
    #id;
    #intervalID;
    #moveIntervalID = null;
    #lastInterval = null;
    #speed = 2; // 2 meters per second
    #position;
    #vector = {
        ArrowUp: {x:0, y:-1},
        ArrowDown: {x:0, y:1},
        ArrowRight: {x:1, y:0},
        ArrowLeft: {x:-1, y:0},
    }

    constructor(id, x, y) {
        this.#id = id;
        console.log('ID:', this.#id);
        this.container = document.createElement('div');
        this.container.id = id;
        this.#intervalID = null;
        this.character = new Soldier(id);
        this.size = getCellSize();
        this.container.style.position = 'absolute';
        this.container.style.transition = 'transform 0.5s ease-in-out';
        this.container.style.transform = 'translate(-50%, -50%)';
        this.container.style.transformOrigin = 'center';
        this.position = {x, y};
        
        this.character.spawn(this.container);
    }

    spawn(container) {
        container.appendChild(this.container);
        updateScreen(this.#id, this.#position);
    }

    move(direction) {
        if(this.#moveIntervalID) clearInterval(this.#moveIntervalID);
        this.character.rotate(direction);
        this.character.walk();
        this.#moveIntervalID = setInterval(() => {
            const Delta = this.#lastInterval? Date.now() - this.#lastInterval : 30;
            const offset = this.#speed * Delta * 0.001;
            this.#lastInterval = Date.now();
            
            const {x,y} = this.position;
            const newPosition = {x:x + this.#vector[direction].x * offset, y:y + this.#vector[direction].y * offset}
            if(updateScreen(this.#id, newPosition))
                this.position = newPosition;
        }, 30);
    }
    
    stop(){
        this.character.stopWalking();
        clearInterval(this.#moveIntervalID);
        this.#moveIntervalID = null;
        this.#lastInterval = null;
    }

    get id() {
        return this.#id;
    }
    set id(n) {
        this.#id = n;
    }

    get intervalID() {
        return this.#intervalID;
    }
    set intervalID(n) {
        this.#intervalID = n;
    }
    set position(pos) {
        this.#position = pos;
    }
    get position() {
        return this.#position;
    }

}
export {Character};