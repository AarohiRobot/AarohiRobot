// JavaScript to capture button clicks and display output
const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.id;
        output.textContent = `You clicked ${direction}`;
    });
});
