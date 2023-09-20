import {initGround} from './ground-manager';
import { initWalls } from './walls-manager';
import { enterRoom } from './websocket';
import { getTiles } from './tiles';
import { playerId, getMap, getRoom } from './api';
import { initPlayer } from './player-manager';
import { initScreen } from './screen-manager';
import { initEnemies } from './enemies-manager';
import { CellsToMeter } from './units';

let currentRoom = null;
let maps = []
const loader = document.querySelector('#loading');

const startGame = async() => {
    currentRoom = await getRoom(currentRoom);
    const map = await getMap(currentRoom.mapId);
    console.log(currentRoom);
    console.log(map);
    //console.log(map.name.toUpperCase().replace(/ /g, '_'));
    initGround(map.ground);
    initWalls(map.walls);
    const player = initPlayer(playerId, {...map.start});
    initScreen(player);
    initEnemies(currentRoom.players);
    const {x, y} = map.start;
    enterRoom(currentRoom.roomId, {x:CellsToMeter(x), y:CellsToMeter(y)});
    loader.style.display = 'none';
}
startGame();