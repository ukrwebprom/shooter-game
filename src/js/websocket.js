import io from 'socket.io-client';
import { playerId } from './api';
import { URL } from './instance';
import { createEnemy, removeEnemy, letsEnemyGo, letsEnemyStop, updateEnemyPosition } from './enemies-manager';
import { getPosition } from './player-manager';
import { getCurrentRoom } from './ground-manager';


const socket = io.connect(URL);

const getUpdate = () => {
    const roomId = getCurrentRoom();
    socket.emit('getEnemyPositions', {roomId});
}

const enterRoom = roomId => {
    socket.emit('enter', {roomId, playerId});
};
const updatePosition = position => {
    socket.emit('updatePosition', {playerId, position});
}

const sendMove = direction => {
    socket.emit('move', direction);
}

const sendStop = () => {
    console.log('stop');
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