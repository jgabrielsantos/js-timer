const inputName = document.getElementById('name')
const inputHour = document.getElementById('hour')
const inputMinute = document.getElementById('minute')
const inputSecond = document.getElementById('second')
let index = 0
let timers = []

function createNewTimer(name, hour, minute, second) {
  const list = document.getElementById('timerList')
  
  // create timer wrapper and values
  const wrapper = document.createElement('div')
  wrapper.id = index
  wrapper.classList.add('timer')

  const timerName = document.createElement('p')
  timerName.textContent = name

  const currentHour = document.createElement('p')
  currentHour.id = `newHour-${index}`
  currentHour.textContent = hour.toString()

  const separator1 = document.createElement('p')
  separator1.textContent = ':'
  
  const currentMinute = document.createElement('p')
  currentMinute.id = `newMinute-${index}`
  currentMinute.textContent = minute.toString()
  
  const separator2 = document.createElement('p')
  separator2.textContent = ':'
  
  const currentSecond = document.createElement('p')
  currentSecond.id = `newSecond-${index}`
  currentSecond.textContent = second.toString()

  wrapper.appendChild(timerName)
  wrapper.appendChild(currentHour)
  wrapper.appendChild(separator1)
  wrapper.appendChild(currentMinute)
  wrapper.appendChild(separator2)
  wrapper.appendChild(currentSecond)

  list.appendChild(wrapper)
  index++

  inputHour.value = 0
  inputMinute.value = 0
  inputSecond.value = 0

  return {
    timerName,
    currentHour,
    currentMinute,
    currentSecond
  }
}

function getValue(element) {
  return Number(element.value)
}

function updateTimer(timer) {
  let tempHour = Number(timer.currentHour.textContent)
  let tempMinute = Number(timer.currentMinute.textContent)
  let tempSecond = Number(timer.currentSecond.textContent)

  if (tempSecond > 0) {
    tempSecond -= 1
  } else if (tempMinute > 0) {
    tempSecond = 59
    tempMinute -= 1
  } else if (tempHour > 0) {
    tempSecond = 59
    tempMinute = 59
    tempHour -= 1
  } else {
    window.alert(`timer for ${timer.timerName.textContent} is done!`)
    const timerIndex = timers.indexOf(timer)
    if (timerIndex !== -1) document.getElementById(timerIndex.toString()).remove()
    clearInterval(timer.intervalID)
    return
  }

  timer.currentHour.textContent = tempHour.toString().padStart(2, '0')
  timer.currentMinute.textContent = tempMinute.toString().padStart(2, '0')
  timer.currentSecond.textContent = tempSecond.toString().padStart(2, '0')
}

function setNewTimer() {
  const name = inputName.value
  const hour = getValue(inputHour).toString().padStart(2, '0')
  const minute = getValue(inputMinute).toString().padStart(2, '0')
  const second = getValue(inputSecond).toString().padStart(2, '0')

  const timer = createNewTimer(name, hour, minute, second)
  timer.intervalID = setInterval(() => updateTimer(timer), 1000)
  timers.push(timer)
}

const button = document.getElementById('newTimer')
button.addEventListener('click', setNewTimer)
