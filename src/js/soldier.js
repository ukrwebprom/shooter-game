import { getTiles } from "./tiles";
import { Pixels, getCellSize } from "./units";
import sprite from '../images/soldier-sprite.png';

class Soldier {
    constructor(name) {
        this.name = name;
        this.rotation = 0;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.size = getCellSize();
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.canvas.style.transformOrigin = 'center center';
        this.canvas.style.transition = 'transform 0.5s ease-in-out';
        this.hint = document.createElement('p');
        this.hint.innerText = name;
        this.hint.classList.add('hint');
        
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
        this.context.clearRect(0, 0, this.size*1.5, this.size*1.5);
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
/*         container.appendChild(this.hint); */
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

    rotate(to) {
        switch(to) {
            case 'ArrowUp':
                this.rotation = 0;
                break;
            case 'ArrowDown':
                this.rotation = 0.5;
                break;
            case 'ArrowRight':
                this.rotation = 0.25;
                break;
            case 'ArrowLeft':
                this.rotation = -0.25;
                break;
        }
        this.canvas.style.transform = `rotate(${this.rotation}turn)`;
    }
}

export {Soldier};