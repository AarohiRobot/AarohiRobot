// JavaScript to capture button clicks and publish messages to Adafruit IO

const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Retrieve your Adafruit IO API key from an environment variable
const adafruitKey = process.env.aio_BihB20qUaVwCuSLXQIFhy5qRgEYE; // Replace with your environment variable name

// Define your Adafruit IO username and topic
const adafruitUsername = "aarohi"; // Replace with your Adafruit IO username
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
    userName: adafruitUsername,
    password: adafruitKey,
    useSSL: true,
});

function onConnect() {
    console.log("Connected to Adafruit IO MQTT broker");
}

function sendCommand(command) {
    const message = new Paho.MQTT.Message(command);
    message.destinationName = `/$aarohi/feeds/$your_topic`; // Publish to your Adafruit IO topic
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
