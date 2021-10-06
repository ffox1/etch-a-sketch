const container = document.querySelector('.container');
const button = document.querySelector('button');
const slider = document.getElementById('slider');
const sliderText = document.querySelector('.slidertext');
sliderText.textContent = slider.value + " x " + slider.value;

button.addEventListener('click', reset);

generateGrid(16);

function generateGrid(gridSize) {
    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement('div');
        div.style.border = '1px solid black';
        container.appendChild(div);
    }
    container.style.gridTemplateRows = `repeat(${gridSize}, ${600 / gridSize}px)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, ${600 / gridSize}px)`;

    const canvas = document.querySelectorAll('.container div');
    canvas.forEach((div) => {
        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = 'blue';
        })
    })
}





function reset() {
    const canvas = document.querySelectorAll('.container div');
    canvas.forEach((div) => {
        div.style.backgroundColor = 'white';
    })
}
slider.oninput = () => {
    sliderText.textContent = slider.value + " x " + slider.value;
}

slider.onchange = () => {
    container.textContent = '';
    generateGrid(slider.value);
}