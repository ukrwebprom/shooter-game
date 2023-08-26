import { Enemy } from "./enemy"
import { setEnemyCount } from "./display";
const enemies = [];
const container = document.querySelector('#enemies');
const initEnemies = (data) => {
    data.forEach(enemy => {
        const {x,y} = enemy.position;
        createEnemy(enemy.playerID, x, y); 
    })
}

const createEnemy = (id, x, y) => {
    const enemy = new Enemy(id, x, y);
    enemy.spawn(container);
    enemies.push(enemy);
    setEnemyCount(enemies.length);
}

const removeEnemy = id => {
    const index = enemies.findIndex(e => e.id === id);
    if(index !== -1) {
        enemies.splice(index, 1);
        const enemyElement = document.getElementById(id);
        enemyElement.remove();
        setEnemyCount(enemies.length);
    }
}

const letsEnemyGo = (direction, id) => {
    const enemy = enemies.find(e => e.id === id);
    enemy.move(direction);
}

const letsEnemyStop = (id) => {
    const enemy = enemies.find(e => e.id === id);
    enemy.stop();
}

const updateEnemyPosition = data => {
    data.forEach(d => {
        console.log(d);
        const enemy = enemies.find(e => e.id === d.playerID);
        const {x,y} = d.position;
        if(enemy) enemy.setPosition(x,y);
    })
}

export {
    initEnemies,
    createEnemy,
    removeEnemy,
    letsEnemyGo,
    letsEnemyStop,
    updateEnemyPosition
}