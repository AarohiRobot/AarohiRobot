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
    // Here, you can send a stop command to your robot (set all wheel speeds to 0).
});

function moveStick(e) {
    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Calculate linear velocity (Vx) and angular velocity (Omega) based on joystick position
    // You'll need to map joystick position to robot velocities here

    // Example: Map joystick position to linear velocity and angular velocity
    const maxJoystickDistance = rect.width / 2;
    const maxLinearVelocity = 1.0; // Adjust as needed
    const maxAngularVelocity = 1.0; // Adjust as needed

    // Scale the joystick position to match your robot's requirements
    const scaledDeltaX = (deltaX / maxJoystickDistance);
    const scaledDeltaY = (deltaY / maxJoystickDistance);
    
    // Apply scaling to Vx and Omega
    const Vx = scaledDeltaY * maxLinearVelocity;
    const Omega = scaledDeltaX * maxAngularVelocity;

    // Display the calculated angle
    angleDisplay.textContent = `Angle: ${angle.toFixed(2)}°`;

    // Here, you can send the calculated Vx and Omega to control your robot.
    // You may need to communicate with your robot's hardware or software to send commands.
}
