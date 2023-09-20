// JavaScript to capture button clicks and dynamic highlighting
const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Define your HiveMQ credentials
const brokerUrl = "2736c350aa8d44eba0062e18cc424905.s2.eu.hivemq.cloud";
const port = 8883;

// MQTT client setup
const mqttClient = new Paho.MQTT.Client(brokerUrl, port, "web_" + parseInt(Math.random() * 100, 10));

mqttClient.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
};

mqttClient.onMessageArrived = function (message) {
    console.log("Message arrived: " + message.payloadString);
    // Handle feedback from the robot here (if needed)
};

mqttClient.connect({ onSuccess: onConnect });

function onConnect() {
    console.log("Connected to MQTT broker");
}

function sendCommand(command) {
    const message = new Paho.MQTT.Message(command);
    message.destinationName = "robot/control"; // Publish to the control topic
    mqttClient.send(message);
    console.log("Sent command: " + command);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.id;
        output.textContent = `You clicked ${direction}`;
        
        if (selectedButton) {
            selectedButton.style.backgroundColor = "#fff"; // Reset previously selected button
        }
        
        selectedButton = button;
        selectedButton.style.backgroundColor = "#ff9900"; // Highlight the clicked button

        // Send the command via MQTT when a button is clicked
        sendCommand(direction);
    });
});
