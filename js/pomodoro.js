class Timer {
    constructor([workTime,breakTime]){
      this.counter = workTime;
      this.seconds = 0;
      this.minutes = 0;
      this.stage = [workTime,breakTime];
      this.index = 0;
    }

    nextIndex = () => {
        this.index = (this.index + 1) % 2;
        console.log(this.index);
        this.counter = this.stage[this.index];
        console.log(this.counter);
        this.start();
    }

    addSecond = () => {
        this.counter -= 1;
        this.seconds = this.counter % 60
        this.minutes = parseInt(this.counter/60);
        document.getElementById("timer").innerHTML = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
        if(this.counter <= 0){
            clearInterval(this.intervalId)
            this.nextIndex();
        }
    };

    start = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.addSecond, 10);
    };
}

const bouttonStart = document.getElementById('buttonStart');
let workTime = 1
let breakTime = 1
let tempsDeTravail = [workTime*60, breakTime*60]

const chrono = new Timer(tempsDeTravail)
bouttonStart.addEventListener('click', () => {
        chrono.start();
})

let seconds = (workTime*60) % 60
let minutes = parseInt(workTime);
let timerLoad = document.getElementById("timer")





