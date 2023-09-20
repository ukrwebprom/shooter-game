import {Soldier} from '../js/soldier';
import { updatePosition } from '../js/websocket';
import { collide } from '../js/walls-manager';
const position = {}
const speed = 100;
let lastInterval = null;


let moveIntervalID = null;

const gameArea = document.querySelector('#game-area');
const area = {
    width:gameArea.clientWidth,
    height:gameArea.clientHeight
}

const container = document.querySelector('#player');
const player = new Soldier('my player');

const initPlayer = ({x, y}) => {
    position.x = x*100;
    position.y = y*100;
    container.style.left = position.x;
    container.style.top = position.y;
    player.spawn(container);
    moveToCenter();

}

const moveToCenter = () => {
    const offsetX = Math.min((position.x-area.width/2)*-1, 0);
    const offsetY = Math.min((position.y-area.height/2)*-1, 0);
    shiftGround(offsetX, offsetY)
}
const rotate = direction => {
    const motion = {x:0, y:0};
    switch(direction) {
        case 'ArrowUp':
            container.style.transform = 'rotate(0turn)';
            motion.y = -1;
            break;
        case 'ArrowDown':
            if(container.style.transform === 'rotate(-0.25turn)')
            container.style.transform = 'rotate(-0.5turn)';
            else
            container.style.transform = 'rotate(0.5turn)';
            motion.y = 1;
            break;
        case 'ArrowRight':
            container.style.transform = 'rotate(0.25turn)';
            motion.x = 1;
            break;
        case 'ArrowLeft':
            if(container.style.transform === 'rotate(0.5turn)')
            container.style.transform = 'rotate(0.75turn)';
            else
            container.style.transform = 'rotate(-0.25turn)';
            motion.x = -1;
            break;
    }
    return motion;
}


const checkBorders = () => {
    if(position.x > shift.x*-1 + area.width - 100) {
        shiftGround((position.x-100)*-1, shift.y);
        return;
    }
    if(position.x < shift.x*-1 + 100 && shift.x < 0) {
        shiftGround(Math.min((position.x - area.width + 100)*-1, 0), shift.y);
        return;
    }
    if(position.y > shift.y*-1 + area.height - 100) {
        shiftGround(shift.x, (position.y-100)*-1);
        return;
    }
    if(position.y < shift.y*-1 + 100 && shift.y < 0) {
        shiftGround(shift.x, Math.min((position.y - area.height + 100)*-1,0));
        return;
    }
}

const letsGo = direction => {
    if(moveIntervalID) clearInterval(moveIntervalID);
    const vector = rotate(direction);
    player.walk();
    let sincCounter = 0;
    moveIntervalID = setInterval(() => {
        const Delta = lastInterval? Date.now() - lastInterval : 30;
        const offset = speed * Delta * 0.001;
        lastInterval = Date.now();
        position.x += vector.x * offset;
        position.y += vector.y * offset;
        container.style.left = position.x;
        container.style.top = position.y;
        collide(Math.floor(position.x / 100), Math.floor(position.y / 100), 'player');
        checkBorders();
        sincCounter += 1;
        if(sincCounter === 10) {
            updatePosition(position);
            sincCounter = 0;
        }
    }, 30);
}

const letsStop = () => {
    player.stopWalking();
    clearInterval(moveIntervalID);
    moveIntervalID = null;
    lastInterval = null;
    updatePosition(getPosition());
}

const getPosition = () => {
    const pos = {
        x:position.x,
        y:position.y
    }
    return pos;
}
export {
    initPlayer,
    letsGo,
    letsStop,
    getPosition
}