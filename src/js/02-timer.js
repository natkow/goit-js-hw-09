import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timer = null;

const inputElement = document.querySelector("#datetime-picker");
const startButtn = document.querySelector("button[data-start]");
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (new Date().valueOf() >= selectedDates[0].valueOf()) {
        window.alert("Please choose a date in the future");
      } else {
        startButtn.disabled = false;
      }
    },
};

startButtn.disabled = true;
const calendar = flatpickr(inputElement, options);
startButtn.addEventListener("click", () => {
    if (timer == null) {
        timer = setInterval(changeTimer, 1000);
        startButtn.disabled = true;
    }
});

function changeTimer() {
    const timeDiff = calendar.selectedDates[0].valueOf() - new Date().valueOf();
    let timeToGo = null;

    if (timeDiff > 0) {
        timeToGo = convertMs(timeDiff);
    } else {
        clearInterval(timer);
        timer = null;
        timeToGo = convertMs(0);
    }

    document.querySelector(".value[data-seconds]").innerHTML = addLeadingZero(timeToGo.seconds);
    document.querySelector(".value[data-minutes]").innerHTML = addLeadingZero(timeToGo.minutes);
    document.querySelector(".value[data-hours]").innerHTML = addLeadingZero(timeToGo.hours);
    document.querySelector(".value[data-days]").innerHTML = addLeadingZero(timeToGo.days);
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

function addLeadingZero(val) {
    
    return val.toString().padStart(2, '0');
}