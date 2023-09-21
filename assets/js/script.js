/*import mqtt from './assets/js/mqtt.js'; // Adjust the path to the correct location of mqtt.js
// JavaScript to capture button clicks and publish messages using MQTT.js

const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;    
     
// Define the MQTT broker URL and port (for HiveMQ Cloud)        
const brokerUrl = "62aa3c9521834e62b0fbdd628046ee46.s1.eu.hivemq.cloud";
    
// Create an MQTT client instance  
const mqttClient = mqtt.connect(brokerUrl);

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
*/
import mqtt from 'mqtt';

const options = {
    host: '62aa3c9521834e62b0fbdd628046ee46.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Aryan',
    password: 'AryanMore123'
}

// Initialize the MQTT client
const client = mqtt.connect(options);

// Setup the callbacks
client.on('connect', () => {
    console.log('Connected to HiveMQ Cloud MQTT broker');
    // Subscribe to a topic if needed
    // client.subscribe('your-topic');
});

client.on('error', (error) => {
    console.error('MQTT error:', error);
});

client.on('message', (topic, message) => {
    // Called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// Publish a message to a topic
client.publish('encyclopedia/temperature', 'Hello');
