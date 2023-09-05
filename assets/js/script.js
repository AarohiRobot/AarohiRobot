/* styles.css */
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

.joystick-container {
    position: relative;
}

.joystick {
    width: 150px;
    height: 150px;
    background-color: #3498db;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stick {
    width: 50px;
    height: 50px;
    background-color: #e74c3c;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
}
