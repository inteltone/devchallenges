let counter = 0
let form = document.querySelector('.form')
let inputsText = document.querySelectorAll('.state1 input')
inputsText.forEach(box => {box.addEventListener('input', handleFormValidity)})
let inputsCheckbox = document.querySelectorAll('.state2 input')
inputsCheckbox.forEach(box => { box.addEventListener('change', handleFormValidity) })
let states = document.querySelectorAll('.form__state')
activateCurrentState(counter)
let stepsList = document.querySelector('.steps__list')
let stepNumber = document.querySelector('.steps__current')
changeStepNumber()
let stepsTotal = document.querySelector('.steps__total')
stepsTotal.textContent = states.length
let continueBtns = document.querySelectorAll('.continue')
btnsContinueDisabled()
let summaryName = document.querySelector('.summary-name')
let summaryEmail = document.querySelector('.summary-email')
let summaryTopics = document.querySelector('.summary-topics')
let summaryNameText = '', summaryEmailText = '', summaryTopicsTexts = []

for (let i = 0; i < states.length; i++){	
	let li = document.createElement('li')
	stepsList.appendChild(li)
}
let steps = document.querySelectorAll('.steps__list li')

activateCurrentStepIndi(counter)

continueBtns.forEach((btn, index, array) => {
	btn.addEventListener('click', (e) => {
		let target = e.currentTarget
		if (index === array.length - 1) {
			fillSummary()
		}
		counter++
		activateCurrentState(counter)
		activateCurrentStepIndi(counter)
		changeStepNumber()
		btnsContinueDisabled()
	})
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
	alert('✓ Success')
})

// FUNCTIONS ======================================================
function activateCurrentState(counter) {
	states.forEach(state => state.classList.remove('is-current'))
	states[counter].classList.add('is-current')
}
function activateCurrentStepIndi(counter) {
	steps.forEach(step => step.classList.remove('is-current'))
	steps[counter].classList.add('is-current')
}
function changeStepNumber() {
	stepNumber.textContent = counter + 1
}
function handleFormValidity(e) {
	let target = e.currentTarget
	if (target.classList.contains('name')) {
		summaryNameText = target.value
	}
	if (target.classList.contains('email')) {
		summaryEmailText = target.value
	}
	if (target.classList.contains('checkbox')) {
		summaryTopicsTexts = []
		inputsCheckbox.forEach(box => {
			if (box.checked) {				
				let labelText = box.parentElement.textContent.trim()
				summaryTopicsTexts.push(labelText)				
			}
		})
	}
	let formValidity = false
	if (states[0].classList.contains('is-current')) {		
		formValidity = form.checkValidity()
		if (formValidity) {
			btnsContinueEnabled()
		} else {
			btnsContinueDisabled()
		}
	}
	if (states[1].classList.contains('is-current')) {
		if (summaryTopicsTexts.length > 0) {			
			btnsContinueEnabled()
		} else {
			btnsContinueDisabled()
		}
	}
}
function btnsContinueDisabled() {
	continueBtns.forEach(btn => btn.setAttribute('disabled', true))
}
function btnsContinueEnabled() {
	continueBtns.forEach(btn => btn.removeAttribute('disabled'))
}
function fillSummary() {
	summaryName.textContent = summaryNameText
	summaryEmail.textContent = summaryEmailText
	summaryTopics.innerHTML = ''
	for (let i = 0; i < summaryTopicsTexts.length; i++){
		let li = document.createElement('li')
		li.textContent = summaryTopicsTexts[i]
		summaryTopics.appendChild(li)
	}	
}