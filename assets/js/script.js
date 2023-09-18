// JavaScript to capture button clicks and dynamic highlighting
const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.id;
        output.textContent = `You clicked ${direction}`;
        
        if (selectedButton) {
            selectedButton.style.backgroundColor = "#fff"; // Reset previously selected button
        }
        
        selectedButton = button;
        selectedButton.style.backgroundColor = "#ff9900"; // Highlight the clicked button
    });
});
