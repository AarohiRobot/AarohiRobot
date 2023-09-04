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
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    stick.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px)`;
    angleDisplay.textContent = `Angle: ${angle.toFixed(2)}°`;
}
