setInterval(setClock, 1000);

const secondsHand = document.querySelector('[data-seconds]');
const minutesHand = document.querySelector('[data-minutes]');
const hoursHand = document.querySelector('[data-hours]');

function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(secondsHand, secondsRatio);
    setRotation(minutesHand, minutesRatio);
    setRotation(hoursHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock(); //pagina arata direct ora, nu layout-ul default al ceasului