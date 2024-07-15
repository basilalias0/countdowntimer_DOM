

const startBtn = document.getElementById('startBtn')
const PauseBtn = document.getElementById('pauseBtn')
const resumeBtn = document.getElementById('resumeBtn')
const resetBtn = document.getElementById('resetBtn')
const duration = document.getElementById('time').value

startBtn.disabled = false
resetBtn.disabled = false
resumeBtn.disabled = true
PauseBtn.disabled = true

let endTime
let nowTime
let countdownTimer

const updateDisplay = (time=0)=>{


    const days = Math.floor(time/(1000*60*60*24))
    const hrs = Math.floor((time%(1000 *60*60*24))/(1000*60*60))
    const mins = Math.floor((time%(1000*60*24))/(1000*60))
    const secs = Math.floor((time%(1000 * 60))/1000)

    document.getElementById("days").innerText = days.toString().padStart(2,"0")
    document.getElementById("hrs").innerText = hrs.toString().padStart(2,"0")
    document.getElementById("mins").innerText = mins.toString().padStart(2,"0")
    document.getElementById("secs").innerText = secs.toString().padStart(2,"0")
}



const counterFn = ()=>{
countdownTimer = setInterval(()=>{
    console.log("hihi");
    let localTime = localStorage.getItem('duration') || Date.now()
    const date = new Date(localTime)
    nowTime = Date.now()
    endTime = date - nowTime
    updateDisplay(endTime)

},500)}

if (localStorage.getItem('autoDone') === "true"){
    counterFn()
}

if (localStorage.getItem("duration")){

    startBtn.disabled = true
    resetBtn.disabled = false
    resumeBtn.disabled = true
    PauseBtn.disabled = false

}


const startCountdown = ()=>{
    
    const duration = document.getElementById('time').value
    const date = new Date(duration)
    nowTime = Date.now()
    endTime = date - nowTime
    if (endTime < 0){
        alert("The selected date is already done")
    }else{
        localStorage.setItem("duration",duration)
        localStorage.setItem("autoDone",true)
        counterFn()
        startBtn.disabled = true
        resetBtn.disabled = false
        resumeBtn.disabled = true
        PauseBtn.disabled = false
    }
    
}

const pauseCountdown = ()=>{
    console.log('HI');
    startBtn.disabled = true
    resetBtn.disabled = false
    resumeBtn.disabled = false
    PauseBtn.disabled = true
    clearInterval(countdownTimer)
}
const resumeCountdown = ()=>{
    startBtn.disabled = true
    resetBtn.disabled = false
    resumeBtn.disabled = true
    PauseBtn.disabled = false
    counterFn()
}
const resetCountdown = ()=>{
    startBtn.disabled = false
    resetBtn.disabled = false
    resumeBtn.disabled = true
    PauseBtn.disabled = true
    clearInterval(countdownTimer)
    localStorage.removeItem('duration')
    localStorage.removeItem('autoDone')
    document.getElementById("days").innerText = "00"
    document.getElementById("hrs").innerText = "00"
    document.getElementById("mins").innerText = "00"
    document.getElementById("secs").innerText = "00"
    document.getElementById('time').value = ''
    
}
