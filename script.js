//Model
class Model {
    constructor() {
        this.listeners = [];
        this.isPlaying = false;
        this.userInterval = 0;
        this.testInterval = 3;
        this.timeRemaining = this.testInterval;
        this.intervalId = null;
    }

    notifyListeners() {
        for (const listener of this.listeners) {
            listener(this)
            console.log(listener);
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        console.log(`is playing: ${this.isPlaying}`)
        this.notifyListeners();
    }

    convertToClock(duration) {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return `${minutes} : ${seconds}`
    }

    startCountdown() {
        this.intervalId = setInterval(this.countdown.bind(this), 1000);
    }

    countdown() {
        this.timeRemaining -= 1;   
        console.log(this.timeRemaining) ;
        if (this.timeRemaining < 0) {
            this.timeRemaining = this.testInterval;
        }
        this.notifyListeners();
    }
}

//View
class View {
    constructor() {
        // 1️⃣ Cache all elements in the constructor
        this.playButton = document.getElementById("play-btn");
        this.timerDisplay = document.getElementById("timer-display");
    }
    
    // 2️⃣ Provide methods to update the UI
    updatePlayBtn(model) {
        this.playButton.textContent = model.isPlaying ?  "⏸️ Pause" : "▶️ Play";
    }

    updateTimer(model) {
        this.timerDisplay.textContent = model.convertToClock(model.timeRemaining);
    }

    // 3️⃣ Provide binding methods (Controller will pass in handler functions)
    bindPlayBtn(handler) {
        this.playButton.addEventListener("click", handler)
    }

}

//Control
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 1️⃣ Bind UI events (View handles elements, Controller handles logic)
        this.view.bindPlayBtn(this.handlePlayPause.bind(this));

        // 2️⃣ Add listeners - Make sure View updates when Model changes
        this.model.addListener(this.view.updatePlayBtn.bind(this.view))
        this.model.addListener(this.view.updateTimer.bind(this.view));
    }

    handlePlayPause() {
        this.model.togglePlayPause();
        
        if (this.model.isPlaying) {
            this.model.startCountdown();
        } 
    }

}

const model = new Model()
const view = new View()
const controller = new Controller(model, view)