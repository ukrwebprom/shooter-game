import { Character } from "./character"
import { initKeyboard } from "./keyboard-manager";
import {updatePosition} from './websocket';
import {CellsToMeter} from './units'
const container = document.querySelector('#players');
let player = null;
let updateInterval;

const initPlayer = (id, {x, y}) => {
    player = new Character(id, CellsToMeter(x), CellsToMeter(y));
    player.spawn(container);
    initKeyboard(letsPlayerGo, letsPlayerStop);
    return player;
}

const letsPlayerGo = (direction) => {
    player.move(direction);
    updateInterval = setInterval(() => {
        updatePosition(player.position);
    }, 1000)
}

const letsPlayerStop = () => {
    player.stop();
    clearInterval(updateInterval);
}

export {
    initPlayer,
    letsPlayerGo,
    letsPlayerStop
}