const container = document.querySelector('.container');

const resetButton = document.getElementById('resetButton');
const blackButton = document.getElementById('blackButton');
const rainbowButton = document.getElementById('rainbowButton');
const pickerButton = document.getElementById('pickerButton');
const eraserButton = document.getElementById('eraserButton');

const slider = document.getElementById('slider');
const sliderText = document.querySelector('.slidertext');
const checkbox = document.getElementById('checkbox');
sliderText.textContent = slider.value + " x " + slider.value;

let color = 'black';

/*TODO: 
fix const canvas

code buttons

refactor code

blackButton.addEventListener('click');
rainbowButton.addEventListener('click');
pickerButton.addEventListener('click');
eraserButton.addEventListener('click');
*/

resetButton.addEventListener('click', reset);


checkbox.addEventListener('click', showGridLines);

generateGrid(16);

function generateGrid(gridSize) {
    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement('div');
        div.style.border = '1px solid #606060';
        div.classList.add('undraggable'); // prevents a bug
        container.appendChild(div);
    }
    container.style.gridTemplateRows = `repeat(${gridSize}, ${600 / gridSize}px)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, ${600 / gridSize}px)`;

    const canvas = document.querySelectorAll('.container div');
    canvas.forEach((div) => {
        div.addEventListener('mousedown', () => {
                div.style.backgroundColor = `${color}`;
        });

        div.addEventListener('mouseenter', () => {
            if (mouseDown) {
                div.style.backgroundColor = `${color}`;
            }

        });
    })
}

function reset() {
    const canvas = document.querySelectorAll('.container div');
    canvas.forEach((div) => {
        div.style.backgroundColor = `${color}`;
    });
}

slider.oninput = () => {
    sliderText.textContent = slider.value + " x " + slider.value;
};

slider.onchange = () => {
    container.textContent = '';
    generateGrid(slider.value);
};

function showGridLines() {
    const canvas = document.querySelectorAll('.container div');
    canvas.forEach((div) => {
        if (checkbox.checked == true) {
            div.style.border = '1px solid #606060';
        }
        else {
            div.style.border = '';
        }
    });
}

let mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
}
document.body.onmouseup = function () {
    --mouseDown;
}
