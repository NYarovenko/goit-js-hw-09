import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('button');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
let selDates;
let remainingTime;
let idInterval;

btnStart.addEventListener('click', onClickStart);
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selDates = selectedDates[0].getTime();
    const date = new Date();
    if (selectedDates[0].getTime() > date.getTime()) {
      btnStart.disabled = false;
    } else Notiflix.Notify.failure('Please choose a date in the future');
  },
};
flatpickr(inputDate, options);

function onClickStart() {
  btnStart.disabled = true;
  const date = new Date();
  remainingTime = selDates - date.getTime();
  idInterval = setInterval(setTimer, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTimer() {
  let { days, hours, minutes, seconds } = convertMs(remainingTime);

  valueDays.textContent = addLeadingZero(days.toString());
  valueHours.textContent = addLeadingZero(hours.toString());
  valueMinutes.textContent = addLeadingZero(minutes.toString());
  valueSeconds.textContent = addLeadingZero(seconds.toString());

  if (remainingTime > 1000) remainingTime -= 1000;
  else clearInterval(idInterval);
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
