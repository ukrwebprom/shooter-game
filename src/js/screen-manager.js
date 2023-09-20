import { Pixels, getCellSize } from './units';
import { setPointer } from './pointer';
import { collide } from './walls-manager';


const ground = document.querySelector('#ground');

let shift = {x:0, y:0};

const shiftGround = (x, y) => {
    ground.style.transform = `translate(${x}px, ${y}px)`;
    shift = {x, y};
}

const gameArea = document.querySelector('#game-area');
const area = {
    width:gameArea.clientWidth,
    height:gameArea.clientHeight
}
const initScreen = player => {
    moveToCenter({x:Pixels(player.position.x), y:Pixels(player.position.y)})
    setInterval(() => {
        checkBorders({x:Pixels(player.position.x), y:Pixels(player.position.y)})
    }, 1000);
}

const moveToCenter = (pos) => {
    const offsetX = Math.min((pos.x-area.width/2)*-1, 0);
    const offsetY = Math.min((pos.y-area.height/2)*-1, 0);
    shiftGround(offsetX, offsetY)
}

const checkBorders = (pos) => {
    if(pos.x > shift.x*-1 + area.width - 100) {
        shiftGround((pos.x-100)*-1, shift.y);
        return;
    }
    if(pos.x < shift.x*-1 + 100 && shift.x < 0) {
        shiftGround(Math.min((pos.x - area.width + 100)*-1, 0), shift.y);
        return;
    }
    if(pos.y > shift.y*-1 + area.height - 100) {
        shiftGround(shift.x, (pos.y-100)*-1);
        return;
    }
    if(pos.y < shift.y*-1 + 100 && shift.y < 0) {
        shiftGround(shift.x, Math.min((pos.y - area.height + 100)*-1,0));
        return;
    }
}
const checkPosition = (id, pos) => {
    setPointer(0, Pixels(pos.x), Pixels(pos.y));
    const hit1 = collide({x:Pixels(pos.x), y:Pixels(pos.y)}, id);
    const hit2 = collide({x:Pixels(pos.x) + getCellSize(), y:Pixels(pos.y)}, id);
    const hit3 = collide({x:Pixels(pos.x), y:Pixels(pos.y) + getCellSize()}, id);
    const hit4 = collide({x:Pixels(pos.x) + getCellSize(), y:Pixels(pos.y) + getCellSize()}, id);
    return !hit1 && !hit2 && !hit3 && !hit4;
}

const updateScreen = (id, pos) => {
    const actor = document.getElementById(id);
    if(actor) {
        const isOk = checkPosition(id, pos);
        if(isOk) {
            actor.style.left = Pixels(pos.x)+getCellSize()/2;
            actor.style.top = Pixels(pos.y)+getCellSize()/2;
        }
        return isOk;
    } 
}

export {
    initScreen,
    updateScreen
}