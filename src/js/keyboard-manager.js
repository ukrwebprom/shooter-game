import { letsGo, letsStop } from "./player-manager";
import { sendMove, sendStop } from "./websocket";
let lastbutton = null;
const arrowButtons = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

const handleKeyDown = event => {
    if(lastbutton === event.key) return;
    if(arrowButtons.includes(event.key)) {
        lastbutton = event.key;
        letsGo(lastbutton);
        sendMove(lastbutton);
    } 
}

const handleKeyUp = event => {
    if(event.key === lastbutton) {
        letsStop();
        sendStop();
        lastbutton = null;
    }
}





document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);