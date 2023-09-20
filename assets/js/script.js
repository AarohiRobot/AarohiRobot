// JavaScript to capture button clicks and publish messages to Adafruit IO

const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Define your Adafruit IO credentials
const adafruitUsername = "aarohi"; // Replace with your Adafruit IO username
const adafruitKey = "aio_FDwv252tYJJXN8rkTQ9XJ7d4TsGi"; // Replace with your Adafruit IO key
const adafruitTopic = "your_topic"; // Replace with your desired Adafruit IO topic

// MQTT client setup for Adafruit IO
const brokerUrl = "io.adafruit.com";
const port = 8883;

const clientId = "web_" + parseInt(Math.random() * 100, 10);
const mqttClient = new Paho.MQTT.Client(brokerUrl, port, clientId);

mqttClient.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
};

mqttClient.connect({
    onSuccess: onConnect,
    userName: aarohi,
    password: aarohi,
    useSSL: true,
});

function onConnect() {
    console.log("Connected to Adafruit IO MQTT broker");

    // Subscribe to your desired Adafruit IO topic (if needed)
    // mqttClient.subscribe(adafruitTopic);
}

function sendCommand(command) {
    const message = new Paho.MQTT.Message(command);
    message.destinationName = `/${adafruitUsername}/feeds/${adafruitTopic}`; // Publish to your Adafruit IO topic
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
