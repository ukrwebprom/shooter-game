import { sendMove, sendStop } from "./websocket";
import {playerId} from './api';

let lastbutton = null;
const arrowButtons = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

const initKeyboard = (move, stop) => {
    const handleKeyDown = event => {
        if(lastbutton === event.key) return;
        if(arrowButtons.includes(event.key)) {
            lastbutton = event.key;
            move(lastbutton);
            sendMove(lastbutton, playerId);
        } 
    }
    
    const handleKeyUp = event => {
        if(event.key === lastbutton) {
            stop();
            sendStop(playerId);
            lastbutton = null;
        }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

export {
    initKeyboard
}