import { getTiles } from "./tiles";
import { getCellSize } from "./units";
import groundTiles from '../images/ground-sprite.jpg';


const canvas = document.querySelector('#ground-canvas');
const canvasContext = canvas.getContext('2d');

const drawMap = async (map, tiles) => {
    const size = map.length;
    canvas.width = size * getCellSize();
    canvas.height = size * getCellSize();
    for(let y=0; y<size; y+=1)
    for(let x=0; x<size; x+=1) {
        canvasContext.drawImage(tiles, map[y][x]*200, 0, 200, 200, 
        x*getCellSize(), y*getCellSize(), 
        getCellSize(), getCellSize());
    }
}
const initGround = async(data) => {
    const tile = await getTiles(groundTiles);
    if(data) drawMap(data, tile);
}

export {
    initGround,
  };