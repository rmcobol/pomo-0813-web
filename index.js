const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

function getSetMinutes() {
  const savedMinutes = localStorage.getItem(STORAGE_KEY);
  return savedMinutes !== null ? Number(savedMinutes) : DEFAULT_MINUTES;
}

let remainingSeconds = getSetMinutes() * 60;
let timerId = null;

const timeDisplay = document.getElementById("time-display");
const clockDisplay = document.getElementById("clock");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

updateDisplay();
updateClock();
setInterval(updateClock, 1000);

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSetMinutes() * 60;
  updateDisplay();
}
