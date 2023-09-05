// script.js
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
const angleDisplay = document.getElementById("angle");

let isDragging = false;

joystick.addEventListener("mousedown", startDrag);
joystick.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", moveStick);
document.addEventListener("touchmove", moveStick);

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function startDrag(e) {
    isDragging = true;
    joystick.style.transition = "none";
    stick.style.transition = "none";
    moveStick(e);
}

function moveStick(e) {
    if (isDragging) {
        const rect = joystick.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let clientX, clientY;

        if (e.type === "touchmove") {
            // Use touch event coordinates
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            // Use mouse event coordinates
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.min(Math.hypot(deltaX, deltaY), rect.width / 2 - stick.clientWidth / 2);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        const newX = centerX + distance * Math.cos(angle);
        const newY = centerY + distance * Math.sin(angle);

        stick.style.transform = `translate(-50%, -50%) translate(${newX - centerX}px, ${newY - centerY}px)`;
        angleDisplay.textContent = `Angle: ${angle.toFixed(2)}°`;

        e.preventDefault(); // Prevent scrolling on touch devices
    }
}

function stopDrag() {
    isDragging = false;
    joystick.style.transition = "all 0.2s ease";
    stick.style.transition = "all 0.2s ease";
    stick.style.transform = "translate(-50%, -50%)";
}
