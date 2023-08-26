import { getMap } from "./api";
import { getTiles } from "./tiles";
import groundTiles from '../images/ground-sprite.jpg';
import partsTiles from '../images/parts-sprite.png';
import { initPlayer } from "./player-manager";
import { initEnemies } from "./enemies-manager";
import { enterRoom } from "./websocket";

const ground = document.querySelector('#ground');
const loader = document.querySelector('#loading');
let currentRoom = null;
const canvas = document.querySelector('#ground-canvas');
const canvasContext = canvas.getContext('2d');
let shift = {x:0, y:0};
const shiftGround = (x, y) => {
    ground.style.transform = `translate(${x}px, ${y}px)`;
    shift = {x, y};
}
const drawGround = sprite => {
    const mapSizeY = 100;
    const mapSizeX = 100;
    const tileSize = 100;
    canvas.width = mapSizeX * tileSize;
    canvas.height = mapSizeY * tileSize;
    for(let x=0; x<mapSizeX; x+=1)
        for(let y=0; y<mapSizeY; y+=1) {
            const randomTileOffset = Math.floor(Math.random() * (7+1)) * 200;
            canvasContext.drawImage(sprite, randomTileOffset, 0, 200, 200, x*tileSize, y*tileSize, tileSize, tileSize);
        }
}
const drawMap = async (map, tiles) => {
    const tileSize = 100;
    canvasContext.shadowColor = 'rgba(0, 0, 0, 0.7)';
    canvasContext.shadowOffsetX = 5;
    canvasContext.shadowOffsetY = 3;
    canvasContext.shadowBlur = 15;
    for(let y=0; y<map.length; y+=1)
    for(let x=0; x<map[y].length; x+=1) {
        if(map[y][x] > 0) 
        canvasContext.drawImage(tiles, map[y][x]*200, 0, 200, 200, x*tileSize, y*tileSize, tileSize, tileSize);
    }
}
const init = async(n) => {
    const tile = await getTiles(groundTiles);
    drawGround(tile);
    const parts = await getTiles(partsTiles);
    const data = await getMap(n);
    currentRoom = data.id;
    if(data.map) {
        drawMap(data.map, parts);
        loader.style.display = 'none';
        initPlayer(data.start);
        initEnemies(data.enemies);
        enterRoom(currentRoom);
    }
}
const getCurrentRoom = () => {
    return currentRoom;
}
export {
    shiftGround,
    shift,
    init,
    getCurrentRoom
  };