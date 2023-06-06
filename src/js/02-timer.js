// 02-timer.js
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future");
      return;
    }

    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  },
});

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownIntervalId = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function updateTimerDisplay(time) {
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

function startCountdown(targetDate) {
  countdownIntervalId = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = targetDate.getTime() - currentDate.getTime();

    if (remainingTime > 0) {
      const time = convertMs(remainingTime);
      updateTimerDisplay(time);
    } else {
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
      Notiflix.Notify.success("Countdown finished!");
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  const selectedDate = datePicker.selectedDates[0];
  if (!selectedDate) {
    return;
  }

  startCountdown(selectedDate);
});