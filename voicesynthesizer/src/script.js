// MODEL
white_keys = ["C", "D", "E", "F", "G", "A", "B", "C2"]
black_keysA = ["C#", "D#"]
black_keysB = ["F#", "G#", "A#"]
Buttons = ["timer"]
//time = 0

//VIEW
function toggleled(event){
  document.querySelectorAll(".led").forEach(changecolor)
}

function changecolor(event) {
  //event.style.backgroundColor = "red" (turn on no toggle)
  event.classList.toggle("red")
}




//CONTROLLER
white_keys.forEach(function addWhiteKey() {
  e = document.createElement("div")
  e.classList.add("WhiteKey")
  e.style.backgroundColor = "white"
  e.style.width = 50+"px"
  e.style.height = 200+"px"
  e.style.borderRadius = 5+"%"
  e.style.top = 60+"px"
  e.style.left = 50+"px"
  //e.onclick = sound
  root.appendChild(e)
})

black_keysA.forEach(function addBlackKey() {
  e = document.createElement("div")
  e.classList.add("BlackKey")
  e.style.backgroundColor = "black"
  e.style.width = 25+"px"
  e.style.height = 130+"px"
  e.style.borderRadius = 5+"%"
  e.style.left = -334+"px"
  e.style.top = -10+"px"
  //e.onclick = on_off
  root.appendChild(e)
})

black_keysB.forEach(function addBlackKey() {
  e = document.createElement("div")
  e.classList.add("BlackKey")
  e.style.backgroundColor = "black"
  e.style.width = 25+"px"
  e.style.height = 130+"px"
  e.style.borderRadius = 5+"%"
  e.style.left = -282+"px"
  e.style.top = -10+"px"
  //e.onclick = sound
  root.appendChild(e)
})

Buttons.forEach(function addButton() {
  e = document.createElement("div")
  e.classList.add("button")
  e.style.backgroundColor = "black"
  e.style.width = 40+"px"
  e.style.height = 20+"px"
  e.style.borderRadius = 10+"%"
  e.style.left = -262+"px"
  e.style.top = -159+"px"
  e.onclick = on_off
  root.appendChild(e)
})



//tempo_and_off
on = 0
led_shutoff = 1
tempo = 500


function on_off() {
  if(on){
    on = 0
    o.stop(); //come riaccendo?
    document.querySelector(".monitor").textContent = ""}
  else
    on = 1
  if(led_shutoff == 0)
  {
    toggleled()
    led_shutoff = 1
  }
  else
  {
    led_shutoff = 1
  }
}

function timer() {
  //time = (time + 1)
  if(on){
     toggleled()
     if(led_shutoff == 0)
       led_shutoff = 1
     else 
       led_shutoff = 0
  }
}

function increase () {
  if(tempo >= 100){
   clearInterval(a)
   tempo = tempo - 50
   a = setInterval(timer, tempo)
  }
  else{tempo=100}
}

function decrease () {
    clearInterval(a)
    tempo = tempo + 50
    a = setInterval(timer, tempo)
}

up.onclick = increase
down.onclick = decrease

a = setInterval(timer, tempo)


//audio
const c = new AudioContext();
const o = c.createOscillator();
o.connect(c.destination);
o.start();
//o.stop();

document.querySelectorAll(".WhiteKey").forEach(
  function(e, i) {
    e.onclick = function() {
        sin_sound_white(i)
    }
  }
)


function sin_sound_white(i) {
  c.resume();
  if(i == 0)
   o.frequency.value = (440/Math.pow(2, 9/12))*shift
  if(i == 1)
   o.frequency.value = 440/Math.pow(2, 7/12)*shift
  if(i == 2)
   o.frequency.value = 440/Math.pow(2, 5/12)*shift
  if(i == 3)
   o.frequency.value = 440/Math.pow(2, 4/12)*shift
  if(i == 4)
   o.frequency.value = 440/Math.pow(2, 2/12)*shift
  if(i == 5)
   o.frequency.value = 440*shift
  if(i == 6)
   o.frequency.value = 440*Math.pow(2, 2/12)*shift
  if(i == 7)
   o.frequency.value = 440*Math.pow(2, 3/12)*shift
  document.querySelector(".monitor").textContent = Math.floor(o.frequency.value)+"Hz"
}


document.querySelectorAll(".BlackKey").forEach(
  function(e, i) {
    e.onclick = function() {
        sin_sound_black(i)
    }
  }
)

function sin_sound_black(i) {
  c.resume();
  if(i == 0)
   o.frequency.value = 440/Math.pow(2, 8/12)*shift
  if(i == 1)
   o.frequency.value = 440/Math.pow(2, 6/12)*shift
  if(i == 2)
   o.frequency.value = 440/Math.pow(2, 3/12)*shift
  if(i == 3)
   o.frequency.value = 440/Math.pow(2, 1/12)*shift
  if(i == 4)
   o.frequency.value = 440*Math.pow(2, 1/12)*shift
  document.querySelector(".monitor").textContent = Math.floor(o.frequency.value)+"Hz"
}

function shifting_right() {
  if(transpose_status >= 1)
    transpose_status == 1
  else
    transpose_status = transpose_status + 1
  transposition()
  /*
  if(transpose_status == 0)
    reset()
  if(transpose_status == 1)
    pushbuttonRight()
    */
}
function shifting_left() {
  if(transpose_status <= -1)
    transpose_status == -1
  else
    transpose_status = transpose_status - 1
  transposition()
  /*
  if(transpose_status == -1)
    pushbuttonLeft()
  if(transpose_status == 0)
    reset()
  */
}

left.onclick = shifting_left
right.onclick = shifting_right

/*
function reset(event){
  //event.classList.add("reset")
  document.querySelectorAll(".shiftButton").forEach(r)
}
function r(event){
  event.classList.add("reset")
}

function pushbuttonRight(event){
 document.querySelectorAll(".shiftButtonLeft").forEach(sR)
}
function sR(event){
  event.classList.add("push")
}

function pushbuttonLeft(event){
 document.querySelectorAll(".shiftButtonRight").forEach(sL)
}
function sL(event){
  event.classList.add("push")
}
*/
/*
function pushchangecolor(event){
  if(transpose_status == 0)
    reset()
  if(transpose_status == 1)
    event.classList.add("push")
  if(transpose_status == -1)
    event.classList.add("push")
}
*/
shift = 1
transpose_status = 0
function transposition(){ //test
  if(transpose_status == 0)
    shift = 1
  if(transpose_status == 1)
    shift = 2
  if(transpose_status == 2)
    shift = 4
  if(transpose_status == -1)
    shift = 1/2
  if(transpose_status == -2)
    shift = 1/4
}