class Model {
    constructor() {
        this.listeners = [];
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.intervalId = null;
    }

    notifyListeners() {
        for (const listener of this.listeners) {
            listener(this);
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    startTimer() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(this.updateElapsedTime.bind(this), 10);
            this.isRunning = true;
        }
    }

    updateElapsedTime() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        this.notifyListeners();
    }

    stopTimer() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
            this.isRunning = false;
        }
    }

    resetTimer() {
        clearInterval(this.intervalId);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.notifyListeners();
    }
}

class View {
    constructor() {
        this.timerDisplay = document.getElementById("timerDisplay")
        this.startBtn = document.getElementById("startBtn")
        this.stopBtn = document.getElementById("stopBtn")
        this.resetBtn = document.getElementById("resetBtn")
    }

    //Update UI methods
    updateDisplay(model) {
        timerDisplay.textContent = this.formatTime(model.elapsedTime);
    }

    formatTime(ms) {
        let hours = Math.floor(ms / (1000 * 60 * 60));
        let minutes = Math.floor(ms / (1000 * 60) % 60);
        let seconds = Math.floor(ms / 1000 % 60);
        let milliseconds = Math.floor(ms % 1000 / 10);
        
        [hours, minutes, seconds, milliseconds] = 
        [hours, minutes, seconds, milliseconds].map(n => String(n).padStart(2, "0"))
        
        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }
    
    //Binding methods for elements
    bindStartBtn(handler) {
        this.startBtn.addEventListener("click", handler)
    }

    bindStopBtn(handler) {
        this.stopBtn.addEventListener("click", handler)
    }

    bindResetBtn(handler) {
        this.resetBtn.addEventListener("click", handler)
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        //Bind UI events
        this.view.bindStartBtn(this.handleStartBtn.bind(this));
        this.view.bindStopBtn(this.handleStopBtn.bind(this));
        this.view.bindResetBtn(this.handleResetBtn.bind(this));
        
        //Add listeners
        this.model.addListener(this.view.updateDisplay.bind(this.view))        
    }

    //Controller methods
    handleStartBtn() {
        this.model.startTimer();
    }

    handleStopBtn() {
        this.model.stopTimer();
    }

    handleResetBtn() {
        this.model.resetTimer();
    }

}

const model = new Model()
const view = new View()
const controller = new Controller(model, view)