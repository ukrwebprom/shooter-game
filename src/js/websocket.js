import io from 'socket.io-client';
import { playerId } from './api';
import { URL } from './instance';
import { createEnemy, removeEnemy, letsEnemyGo, letsEnemyStop, updateEnemyPosition } from './enemies-manager';


const socket = io.connect(URL);
let currentRoom = null;

const getUpdate = () => {
    socket.emit('getEnemyPositions', {roomId:currentRoom});
}

const enterRoom = (roomId, startPos) => {
    currentRoom = roomId;
    socket.emit('enter', {roomId, startPos, playerId});
};
const updatePosition = position => {
    socket.emit('updatePosition', {playerId, position});
}

const sendMove = (direction, playerId) => {
    socket.emit('move', {direction, playerId});
}

const sendStop = (playerId) => {
    console.log('stop');
    //const position = getPosition();
    //socket.emit('updatePosition', {playerId, position});
    socket.emit('stop', playerId);
}
socket.on('newEnemy', data => {
    console.log('new enemy:', data);
    const {x, y} = data.position;
    createEnemy(data.playerId, x, y);
})

socket.on('removeEnemy', data => {
    console.log('enemy leaved:', data);
    removeEnemy(data);
})

socket.on('move', data => {
    const {direction, playerId} = data;
    letsEnemyGo(direction, playerId);
})
socket.on('stop', data => {
    letsEnemyStop(data);
})
socket.on('update', data => {
    updateEnemyPosition(data);
})

window.addEventListener('focus', getUpdate);

export {
    enterRoom,
    sendMove,
    sendStop,
    updatePosition
}