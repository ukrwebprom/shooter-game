const meter = 50; // pixels per metere
const SCALE = 1; 
const cellSize = 100; // size of cell in pixels

const getCellSize = () => {
    return cellSize * SCALE;
}
const Pixels = n => {
    return n*meter*SCALE;
}
const CellsToMeter = n => {
    return n*2;
}
const CellsToPix = n => {
    return Pixels(n * cellSize);
}
const MetersToCells = n => {
    return Math.floor(n / cellSize);
}

export {
    Pixels,
    CellsToMeter,
    MetersToCells,
    CellsToPix,
    getCellSize,
    cellSize 
  };