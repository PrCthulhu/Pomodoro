// Define a Timer class that manages a countdown timer with work and break times.
class Timer {
    constructor([workTime, breakTime]) {
        // Initialize timer properties.
        this.counter = workTime; // Initialize the timer to the work time.
        this.seconds = 0; // Initialize seconds.
        this.minutes = 0; // Initialize minutes.
        this.stage = [workTime, breakTime]; // Store work and break times.
        this.index = 0; // Initialize the stage index (0 for work, 1 for break).
        this.isRunning = false; // Initialize the timer as not running.
    }

    // Function to switch between work and break times.
    nextIndex = () => {
        this.index = (this.index + 1) % 2; // Toggle between 0 and 1 (work and break).
        console.log(this.index);
        this.counter = this.stage[this.index]; // Set the timer to the current stage.
        console.log(this.counter);
        this.start(); // Start the timer.

        // Update the UI based on the current stage (work or break).
        if (this.index === 0) {
            document.getElementById("status").textContent = "workTime";
            document.getElementById('body').style.backgroundColor = "rgba(184, 104, 144)";
            document.getElementById('buttonStart').style.backgroundColor = "rgba(184, 104, 144)";
            document.getElementById('status').style.backgroundColor = "rgb(189, 35, 176)";
        } else {
            document.getElementById("status").textContent = "breakTime";
            document.getElementById('body').style.backgroundColor = "rgba(104, 139, 184)";
            document.getElementById('buttonStart').style.backgroundColor = "rgba(104, 139, 184)";
            document.getElementById('status').style.backgroundColor = "rgb(35, 102, 189)";
        }
    }

    // Function to decrement the timer by one second.
    addSecond = () => {
        this.counter -= 1; // Decrease the counter by 1 second.
        this.seconds = this.counter % 60; // Calculate remaining seconds.
        this.minutes = parseInt(this.counter / 60); // Calculate remaining minutes.
        document.getElementById("timer").innerHTML = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;

        // If the timer reaches zero, stop the interval and move to the next stage.
        if (this.counter <= 0) {
            clearInterval(this.intervalId); // Stop the timer interval.
            this.nextIndex(); // Move to the next stage.
        }
    };

    // Function to start the timer.
    start = () => {
        clearInterval(this.intervalId); // Clear any existing timer intervals.
        this.isRunning = true; // Set the timer as running.
        this.intervalId = setInterval(this.addSecond, 1000); // Start the timer interval.
    };

    // Function to reset the timer.
    reset = () => {
        location.reload(); // Reload the page to reset the timer.
    }
}

// Get the button element with the ID 'buttonStart'.
const bouttonStart = document.getElementById('buttonStart');

let isStarted = false;

// Add a click event listener to the 'Start' button.
bouttonStart.addEventListener('click', () => {
    document.getElementById("buttonStart").innerHTML = '<em class="fa-solid fa-rotate-right"></em>';

    // Get initial work and break times from input fields.
    let workTime = document.getElementById("timeOfWork").value;
    let breakTime = document.getElementById("timeOfBreak").value;
    let tempsDeTravail = [workTime * 60, breakTime * 60];

    // Create a new Timer instance with the specified work and break times.
    let chrono = new Timer(tempsDeTravail);

    // If the timer is already running, reload the page to reset.
    if (isStarted) {
        location.reload();
    }

    isStarted = true;

    // Start the timer.
    chrono.start();
});

// Calculate and display the initial timer value.
let seconds = (document.getElementById("timeOfWork").value * 60) % 60;
let minutes = parseInt(document.getElementById("timeOfWork").value);
let timerLoad = document.getElementById("timer");
timerLoad.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

// Add an event listener to update the timer when the 'timeOfWork' input changes.
document.getElementById("timeOfWork").addEventListener('input', () => {
    let seconds = (document.getElementById("timeOfWork").value * 60) % 60;
    let minutes = parseInt(document.getElementById("timeOfWork").value);
    let timerLoad = document.getElementById("timer");
    timerLoad.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Add an event listener for the 'timeOfBreak' input (currently missing functionality).
document.getElementById("timeOfBreak").addEventListener('input', () => {
    seconds = (document.getElementById("timeOfBreak").value * 60) % 60;
    minutes = parseInt(document.getElementById("timeOfBreak").value);
});
