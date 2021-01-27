class Timer {
    constructor(HTMLtimer, currentTimer, lastUpdateTime, interval) {
        this.interval = interval;
        this.lastUpdateTime = lastUpdateTime;
        this.currentTimer = currentTimer;
        this.timer = HTMLtimer;
    }

    //Funcion para obtener el tiempo transcurrido de juego y pasar ese valor al temporizador
    startTimer() {
        var self = this;
        if (!this.interval) {
            this.lastUpdateTime = new Date().getTime();
            this.interval = setInterval(function() {
            var now = new Date().getTime();
            var dt = now - self.lastUpdateTime;
            self.currentTimer += dt;
            var time = new Date(self.currentTimer);
            self.timer.innerHTML =  (self.formatTime(time.getMinutes())) + ':' + (self.formatTime(time.getSeconds()))
            self.lastUpdateTime = now;
            }, 1);
        }
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = 0;
    }

    formatTime = function(time) {
        return ('00' + time).substr(-2);
    }

    resetTimer = function() {
        this.currentTimer = 0;
        this.lastUpdateTime = new Date().getTime();
        this.interval = 0;
        this.startTimer();
    }
} 