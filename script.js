const container = document.querySelector('.canvasContainer');
const resetButton = document.getElementById('resetButton');
const blackButton = document.getElementById('blackButton');
const rainbowButton = document.getElementById('rainbowButton');
const eraserButton = document.getElementById('eraserButton');
const canvasSizeSlider = document.getElementById('slider');
const canvasSizeSliderText = document.querySelector('.slidertext');
const showGridLinesCheckbox = document.getElementById('checkbox');

let canvas;
let color = 'black';
let intervalID = 0; // for rainbow mode

// Allow drawing when holding click
let mouseDown = 0;
document.body.onmousedown = () => ++mouseDown;
document.body.onmouseup = () => --mouseDown;

// Start with a 16x16 canvas
generateCanvas(16);

blackButton.addEventListener('click', () => {
    clearInterval(intervalID);
    color = 'black';
});

rainbowButton.addEventListener('click', () => {
    if (intervalID) {
        clearInterval(intervalID);
    }
    intervalID = setInterval(setRandomColor, 50);
});

eraserButton.addEventListener('click', () => {
    clearInterval(intervalID);
    color = 'white';
});

resetButton.addEventListener('click', () => {
    canvas.forEach((div) => {
        div.style.backgroundColor = `white`;
    });
});

showGridLinesCheckbox.addEventListener('click', () => {
    canvas.forEach((div) => {
        if (showGridLinesCheckbox.checked == true) {
            div.style.border = '1px solid #606060';
        }
        else {
            div.style.border = '';
        }
    });
});

canvasSizeSlider.oninput = () => {
    canvasSizeSliderText.textContent = canvasSizeSlider.value + " x " + canvasSizeSlider.value;
};

canvasSizeSlider.onchange = () => {
    container.textContent = '';
    generateCanvas(canvasSizeSlider.value);
};

function generateCanvas(canvasSize) {
    for (let i = 0; i < canvasSize ** 2; i++) {
        const div = document.createElement('div');
        if (showGridLinesCheckbox.checked == true) {
            div.style.border = '1px solid #606060';
        }
        else {
            div.style.border = '';
        }
        div.classList.add('undraggable'); // prevents a bug
        container.appendChild(div);
    }

    container.style.gridTemplateRows = `repeat(${canvasSize}, ${600 / canvasSize}px)`;
    container.style.gridTemplateColumns = `repeat(${canvasSize}, ${600 / canvasSize}px)`;

    canvas = document.querySelectorAll('.canvasContainer div');
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

// Set color to random hex value
function setRandomColor() {
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
}