const ground = document.querySelector('#ground');
const pointers = [];

const makePointer = (x, y) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 10;
    canvas.height = 10;
    context.beginPath();  
    context.moveTo(5, 0);
    context.lineTo(5, 10);
    context.moveTo(0, 5);
    context.lineTo(10, 5);
    context.strokeStyle = 'red'; // Устанавливаем цвет линии
    context.lineWidth = 2;       // Устанавливаем ширину линии (по умолчанию 1)
    context.stroke();             // Рисуем линию
    context.closePath();
    canvas.style.position = 'absolute';
    canvas.style.top = x;
    canvas.style.left = y;
    ground.appendChild(canvas);
    return canvas;
}

const setPointer = (n, x, y) => {
    pointers[n].style.left = x;
    pointers[n].style.top = y;
}

pointers.push(makePointer(0,0));
pointers.push(makePointer(0,0));

export {
    setPointer
};
