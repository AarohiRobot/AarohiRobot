// script.js
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
const angleDisplay = document.getElementById("angle");

let isDragging = false;

joystick.addEventListener("mousedown", (e) => {
    isDragging = true;
    joystick.style.transition = "none";
    stick.style.transition = "none";
    moveStick(e);
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        moveStick(e);
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    joystick.style.transition = "all 0.2s ease";
    stick.style.transition = "all 0.2s ease";
    stick.style.transform = "translate(-50%, -50%)";
});

function moveStick(e) {
    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.min(Math.hypot(deltaX, deltaY), rect.width / 2 - stick.clientWidth / 2);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const newX = centerX + distance * Math.cos(angle);
    const newY = centerY + distance * Math.sin(angle);

    stick.style.transform = `translate(-50%, -50%) translate(${newX - centerX}px, ${newY - centerY}px)`;
    angleDisplay.textContent = `Angle: ${angle.toFixed(2)}°`;
}
