import { getTiles } from "../tiles";
import { getCellSize } from "../units";
import sprite from '../../images/wall-sprite.png'
class Wall {
    constructor(type, x, y, ctx) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.type = type;
        this.ctx = ctx;
        this.init(type)
    }
    async init(n) {
        this.img = await getTiles(sprite);
        this.draw(n);
    }

    draw(type) {
        this.ctx.drawImage(this.img, 
            type * 200, 0,
            200, 200,
            this.x*getCellSize(), this.y * getCellSize(),
            getCellSize(), getCellSize());
    }

    collide(originator) {
        console.log(originator);
        return this.type !== 1;
    }
}

export {Wall}