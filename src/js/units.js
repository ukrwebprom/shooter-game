const meter = 50; // pixels per metere
const scale = 1; 
const cellSize = 100; // size of cell in pixels

const getCellSize = () => {
    return cellSize * scale;
}
const Pixels = n => {
    return n*meter*scale;
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
const setScale = n => {
    scale = n;
}

export {
    Pixels,
    CellsToMeter,
    MetersToCells,
    CellsToPix,
    getCellSize,
    cellSize 
  };