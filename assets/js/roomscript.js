// Initialize Firebase
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

var form = document.getElementById("room-form");
var roomNumberInput = document.getElementById("room-number");
var output = document.getElementById("output");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var roomNumber = roomNumberInput.value;
    var databaseRef = firebase.database().ref("room-coordinates/" + roomNumber);

    databaseRef.once("value", function(snapshot) {
        var coordinates = snapshot.val();
        if (coordinates) {
            output.textContent = "Coordinates: " + coordinates;
        } else {
            output.textContent = "Coordinates not found.";
        }
    });
});
