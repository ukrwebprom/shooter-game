import { getTiles } from "./tiles";
import sprite from '../images/soldier-sprite.png';

class Soldier {
    constructor(name) {
        this.name = name;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 100;
        this.canvas.height = 100;
        this.size = 100;
        this.ready = false;
        this.walkID = null;
        this.init();
    }

    async init() {
        this.img = await getTiles(sprite);
        this.ready = true;
        this.draw(0);
    }
    draw(step) {
        this.context.clearRect(0, 0, this.size+50, this.size+50);
        this.context.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.context.shadowOffsetX = 5;
        this.context.shadowOffsetY = 3;
        this.context.shadowBlur = 15;
        this.context.drawImage(this.img, 
            step * 200, 0,
            200, 200,
            0, 0,
            this.size, this.size);
    }

    spawn(container) {
        container.appendChild(this.canvas);
    }

    walk() {
        this.frame = 1;
        if(this.walkID === null)
        this.walkID = setInterval(() => {   
            this.frame += 1;
            if(this.ready) this.draw(this.frame);
            if(this.frame === 15) this.frame = 2;
            
        }, 45);
    }

    stopWalking() {
        clearInterval(this.walkID);
        this.walkID = null;
        this.draw(0);
    }
}

export {Soldier};