const clock = document.getElementById("clock")
clock.textContent = '1'

function updateClock() {
    clock.textContent = String(Number(clock.textContent) + 1);
}

setInterval(updateClock, 100);