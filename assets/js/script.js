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
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);  
    const maxDistance = rect.width / 2 - stick.clientWidth / 2;

    if (distance <= maxDistance) {
        stick.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px)`;
    } else {
        const angle = Math.atan2(deltaY, deltaX);
        const newX = Math.cos(angle) * maxDistance;
        const newY = Math.sin(angle) * maxDistance;
        stick.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;
    }

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angleDisplay.textContent = `Angle: ${angle.toFixed(2)}°`;
}
