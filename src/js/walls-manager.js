import { Wall } from "./objects/wall";
import { Pixels, CellsToMeter, MetersToCells, getCellSize } from "./units";
const canvas = document.querySelector('#walls-canvas');
canvas.width = getCellSize()*50;
canvas.height = getCellSize()*50;
const context = canvas.getContext('2d');

const walls = []

const initWalls = data => {
    for (const el of data) {
        const wallEl = new Wall(el.tile, el.x, el.y, context);
        walls.push(wallEl);
    }
/*     context.shadowColor = 'rgba(0, 0, 0, 0.7)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 3;
    context.shadowBlur = 15; */
}

const collide = (position, originator) => {
    let hit = false;
    const cellX = MetersToCells(position.x);
    const cellY = MetersToCells(position.y);
    const tile = walls.find(el => el.x === cellX && el.y == cellY);
    if(tile) hit = tile.collide(originator);
    return hit;
}

export {
    initWalls,
    collide
}