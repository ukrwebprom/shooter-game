import io from 'socket.io-client';
import { playerId } from './api';
import { URL } from './instance';
import { createEnemy, removeEnemy, letsEnemyGo, letsEnemyStop } from './enemies-manager';
import { getPosition } from './player-manager';


const socket = io.connect(URL);
let updateIntervalId = null;

const enterRoom = roomId => {
    socket.emit('enter', {roomId, playerId});
};
const sendMove = direction => {
    socket.emit('move', direction);
    if(!updateIntervalId) {
        updateIntervalId = setInterval(() => {
            const position = getPosition();
            socket.emit('updatePosition', {playerId, position})
        }, 1000);
    }
}
const sendStop = () => {
    console.log('stop');
    clearInterval(updateIntervalId);
    updateIntervalId = null;
    const position = getPosition();
    socket.emit('updatePosition', {playerId, position});
    socket.emit('stop');
}
socket.on('newEnemy', data => {
    console.log('new enemy:', data);
    const {x, y} = data.position;
    createEnemy(data.playerID, x, y);
})

socket.on('removeEnemy', data => {
    removeEnemy(data);
})

socket.on('move', data => {
    const {direction, playerId} = data;
    letsEnemyGo(direction, playerId);
    console.log(data);
})
socket.on('stop', data => {
    letsEnemyStop(data);
    console.log(data);
})
export {
    enterRoom,
    sendMove,
    sendStop
}