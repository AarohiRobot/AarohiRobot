// JavaScript to capture button clicks and publish messages to HiveMQ Cloud MQTT broker
const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Define your HiveMQ Cloud broker connection details
const mqttBroker = "62aa3c9521834e62b0fbdd628046ee46.s1.eu.hivemq.cloudt"; // Replace with your HiveMQ Cloud instance URL and port
const mqttClient = new Paho.MQTT.Client(mqttBroker, "web_" + parseInt(Math.random() * 100, 10));

mqttClient.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
};

mqttClient.connect({
    onSuccess: onConnect,
    useSSL: true, // Set to true for secure communication
    userName: "aarohi", // Replace with your HiveMQ Cloud username
    password: "Aarohi@pro1", // Replace with your HiveMQ Cloud password
});

function onConnect() {
    console.log("Connected to HiveMQ Cloud MQTT broker");

    // Subscribe to MQTT topics (if needed)
    // mqttClient.subscribe("your_topic");
}

function sendCommand(command) {
    // Publish the command to a specific MQTT topic
    const message = new Paho.MQTT.Message(command);
    message.destinationName = "your_topic"; // Replace with the topic you want to publish to
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
