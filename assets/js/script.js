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
// JavaScript to capture button clicks and send messages using WebSocket

const buttons = document.querySelectorAll('.button');
const output = document.getElementById('output');
let selectedButton = null;

// Define the WebSocket server URL
const serverUrl = 'ws://192.168.149.245';

// Create a WebSocket instance
const websocket = new WebSocket("ws://192.168.149.245:8765");

websocket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
});

websocket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});

// Function to send commands
function sendCommand(command) {
  const direction = command.id;
  output.textContent = `You clicked ${direction}`;

  if (selectedButton) {
    selectedButton.style.backgroundColor = '#fff'; // Reset previously selected button
  }

  selectedButton = command;
  selectedButton.style.backgroundColor = '#ff9900'; // Highlight the clicked button

  // Send the command to the WebSocket server as a JSON message
  const message = { command: direction };
  websocket.send(JSON.stringify(message));
}

// Add click event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    sendCommand(button);
  });
});

// Handle messages received from the WebSocket server (optional)
websocket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  console.log('Received message from server:', message);

  // You can process messages received from the server here
});
