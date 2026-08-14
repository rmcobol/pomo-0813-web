const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;

function getSetMinutes() {
  const savedMinutes = localStorage.getItem(STORAGE_KEY);
  return savedMinutes !== null ? Number(savedMinutes) : DEFAULT_MINUTES;
}

let remainingSeconds = getSetMinutes() * 60;
let timerId = null;

const timeDisplay = document.getElementById("time-display");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

updateDisplay();

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
