const resetButton = document.getElementById("resetBtn");
const countDisplay = document.getElementById("currentCount");
const alertMessage = document.querySelector(".alert-message");

let counter = 1;

function refreshDisplay() {
    countDisplay.textContent = counter;
    document.getElementById("decrementBtn").disabled = counter === 0;
    alertMessage.style.visibility = counter > 0 ? "hidden" : "visible";
    resetButton.style.visibility = counter === 0 ? "hidden" : "visible";
}
//Increment 
function incrementCounter() {
    counter++;
    refreshDisplay();
}
//Decrement 
function decrementCounter() {
    if (counter > 0) {
        counter--;
        refreshDisplay();
    }
}
//reset
function resetCounter() {
    counter = 0;
    refreshDisplay();
}

document.getElementById("incrementBtn").addEventListener("click", incrementCounter);
document.getElementById("decrementBtn").addEventListener("click", decrementCounter);
resetButton.addEventListener("click", resetCounter);

refreshDisplay();
