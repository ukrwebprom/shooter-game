import {Soldier} from './soldier';

class Enemy {
    #id;
    #intervalID;
    #moveIntervalID = null;
    #lastInterval = null;
    #speed = 100;

    constructor(id, x, y) {
        this.#id = id;
        this.container = document.createElement('div');
        this.container.id = id;
        this.#intervalID = null;
        this.character = new Soldier(id);
        this.position_x = x*100;
        this.position_y = y*100;
        this.container.style.position = 'absolute';
        this.container.style.left = this.position_x;
        this.container.style.top = this.position_y;
        this.character.spawn(this.container);
    }

    spawn(container) {
        container.appendChild(this.container);
    }
    #rotate(direction){
        const motion = {x:0, y:0};
        switch(direction) {
            case 'ArrowUp':
                this.container.style.transform = 'rotate(0turn)';
                motion.y = -1;
                break;
            case 'ArrowDown':
                if(this.container.style.transform === 'rotate(-0.25turn)')
                this.container.style.transform = 'rotate(-0.5turn)';
                else
                this.container.style.transform = 'rotate(0.5turn)';
                motion.y = 1;
                break;
            case 'ArrowRight':
                this.container.style.transform = 'rotate(0.25turn)';
                motion.x = 1;
                break;
            case 'ArrowLeft':
                if(this.container.style.transform === 'rotate(0.5turn)')
                this.container.style.transform = 'rotate(0.75turn)';
                else
                this.container.style.transform = 'rotate(-0.25turn)';
                motion.x = -1;
                break;
        }
        return motion;
    }

    move(direction) {
        if(this.#moveIntervalID) clearInterval(this.#moveIntervalID);
        const vector = this.#rotate(direction);
        this.character.walk();
        this.#moveIntervalID = setInterval(() => {
            const Delta = this.#lastInterval? Date.now() - this.#lastInterval : 30;
            const offset = this.#speed * Delta * 0.001;
            this.#lastInterval = Date.now();
            this.position_x += vector.x * offset;
            this.position_y += vector.y * offset;
            this.container.style.left = this.position_x;
            this.container.style.top = this.position_y;
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
    get intervalID() {
        return this.#intervalID;
    }
    set intervalID(n) {
        this.#intervalID = n;
    }

}
export {Enemy};