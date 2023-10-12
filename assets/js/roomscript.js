

// Initialize Firebase (replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function submitRoom() {
  const roomInput = document.getElementById("roomInput");
  const roomNumber = roomInput.value;

  // Fetch the coordinates from Firebase based on the room number
  db.collection("coordinates")
    .doc(roomNumber)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const coordinates = doc.data().coordinates;

        // Display the coordinates on the webpage
        document.getElementById("coordinatesDisplay").innerText = `Coordinates: ${coordinates}`;
      } else {
        // Handle the case where room number doesn't exist in the database
        document.getElementById("coordinatesDisplay").innerText = "Coordinates not found";
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

// WebSocket code (if needed) remains the same

function convertRoomToCoordinates(roomNumber) {
  // Replace this with your actual conversion logic
  // Example: Convert room number to coordinates
  return `X: ${roomNumber * 10}, Y: ${roomNumber * 5}`;
}
