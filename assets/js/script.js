const mqtt = require('mqtt');

// JavaScript to capture button clicks and publish messages to HiveMQ Cloud MQTT broker
const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Define your HiveMQ Cloud MQTT credentials
const mqttUsername = "aarohi"; // Replace with your HiveMQ Cloud username
const mqttPassword = "Aarohi@pro1"; // Replace with your HiveMQ Cloud password
const clientId = "web_" + parseInt(Math.random() * 100, 10);

// Define the MQTT broker URL and port (for HiveMQ Cloud)
const brokerUrl = "62aa3c9521834e62b0fbdd628046ee46.s1.eu.hivemq.cloud";

// Create an MQTT client instance
const mqttClient = mqtt.connect(brokerUrl, {
  username: aarohi,
  password: Aarohi@pro1,
  clientId: 62aa3c9521834e62b0fbdd628046ee46,
  clean: true // Set to true to start with a clean session
});

mqttClient.on('connect', () => {
  console.log('Connected to HiveMQ Cloud MQTT broker');
});

mqttClient.on('error', (error) => {
  console.error('MQTT error:', error);
});

// Function to send commands
function sendCommand(command) {
  const direction = command.id;
  output.textContent = `You clicked ${direction}`;

  if (selectedButton) {
    selectedButton.style.backgroundColor = "#fff"; // Reset previously selected button
  }

  selectedButton = command;
  selectedButton.style.backgroundColor = "#ff9900"; // Highlight the clicked button

  // Publish the command to an MQTT topic (e.g., "your-topic")
  mqttClient.publish("your-topic", direction, { qos: 0 });
}

// Add click event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    sendCommand(button);
  });
});
