// JavaScript to capture button clicks
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.id;
        alert(`You clicked ${direction}`);
    });
});
