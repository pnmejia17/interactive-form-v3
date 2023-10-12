
// 2 Name Field

//use focus method on the input type text for "Name" field
const nameField = document.getElementById('name');
nameField.focus();

//3 Job Role Section

// jobselect
const jobSelect=document.getElementById('title');
const otherTextBox = document.getElementById("other-job-role");

// for job role, hide text box unless "other" is selected
otherTextBox.hidden = true;


//program the "job role" select element to listen for changes
jobSelect.addEventListener("change", (e) => {
    if (e.target.value == "other"){
        otherTextBox.removeAttribute('hidden');
    }
    else{
        otherTextBox.hidden = true;
    }
})


// 4 T-Shirt Info Section

//disable color select element
const colorSelect = document.getElementById('color');
colorSelect.disabled = true;



//design element listen for changes
const designSelect = document.getElementById('design')


// if selected design value matches option theme only display those options
designSelect.addEventListener("change", () => {

    colorSelect.disabled= false;

    const design = designSelect.value; 

    for (let i=0; i < colorSelect.options.length; i++){
        const theme = colorSelect.options[i].getAttribute('data-theme');

        if(theme === design){
            colorSelect.options[i].style.display = '';
            colorSelect.options[i].selected = true;
        }else{
            colorSelect.options[i].style.display = 'none';
            colorSelect.options[i].selected = false;
        }    
    }
})

// 5 Activities Section

// select fieldset to add event listener to it
const activitiesRegistry = document.getElementById('activities')
const activitiesCost = document.getElementById('activities-cost')
const checkboxes = activitiesRegistry.querySelectorAll("input[type='checkbox']")
let totalActivitiesCost = 0

// add Event Listener to Register for Activities fieldset element to listen for changes

activitiesRegistry.addEventListener('change', event => {
    const currentCheckbox = event.target;
    const activityCost = parseInt(currentCheckbox.getAttribute('data-cost'))


    if (currentCheckbox.checked) {
        totalActivitiesCost += activityCost
        activitiesCost.innerHTML = `Total: $${totalActivitiesCost}`

    } else {
        totalActivitiesCost -= activityCost
        activitiesCost.innerHTML = `Total: $${totalActivitiesCost}`

    }
})

// 6 Payment Info Section

//only displays the selected pyment method

const paymentMethod = document.getElementById('payment')
paymentMethod[1].setAttribute('selected', 'selected')

const creditCard = document.getElementById('credit-card')
const paypal = document.getElementById('paypal')
const bitcoin = document.getElementById('bitcoin')

paypal.style.display = 'none'
bitcoin.style.display = 'none'

paymentMethod.addEventListener( 'change', event => {
    if (paymentMethod.value === 'credit-card'){
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }else if (paymentMethod.value === 'paypal'){
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
    }else if (paymentMethod.value === 'bitcoin'){
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        creditCard.style.display = 'none';
    }
})

// 7 Form Validation

// uses regex expressions to validate whether the correct info
// has been entered into the fields before allowing form to submit


const form = document.querySelector('form')
const emailAddress = document.getElementById('email')
const cardNum  = document.getElementById('cc-num')
const zipCode = document.getElementById('zip')
const cvv = document.getElementById('cvv')


form.addEventListener ('submit', (event) => {
    const nameValue = nameField.value
    const emailValue = emailAddress.value
    const cardValue = cardNum.value
    const zipValue = zipCode.value
    const cvvValue = cvv.value

    const nameValid = /^[A-Za-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
    const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    
    const cardValid = /^\d{13,16}$/.test(cardValue)
    const zipValid = /^\d{5}$/.test(zipValue)
    const cvvValid = /^\d{3}$/.test(cvvValue)

    const actValid = totalActivitiesCost > 0

    if (paymentMethod.value === 'credit-card'){
    visualValid(cardValid, cardNum)
    visualValid(zipValid, zipCode)
    visualValid(cvvValid, cvv)}

    if (!nameValid || 
        !emailValid || 
        !actValid)
        {event.preventDefault();
    } if (paymentMethod.value === 'credit-card' && 
    (!cardValid || !zipValid || !cvvValid )) {
        event.preventDefault()
    }
    visualValid(nameValid, nameField)
    visualValid(emailValid, emailAddress)
    visualValid(actValid, activitiesRegistry)

})


// 8 The Activities Section

// improves accessibilty by adding focus 
// class to elements as you focus on them 

for (let i=0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
        checkboxes[i].parentElement.classList.add('focus')
    })
    checkboxes[i].addEventListener('blur', (e) => {
        checkboxes[i].parentElement.classList.remove('focus')
})}

// 9 Visual Validation Errors 

// gives visual validator for valid elements
// in form

function visualValid(validElement, element){
    if (validElement){
        element.parentElement.classList.add('valid')
        element.parentElement.classList.remove('not-valid')
        element.parentElement.lastElementChild.style.display = 'none'
    } if (!validElement) {

        if (element === activitiesRegistry){
            element.parentElement.classList.add('not-valid')
            element.parentElement.classList.remove('valid')
            element.lastElementChild.style.display = 'block'
        } else {
        element.parentElement.classList.add('not-valid')
        element.parentElement.classList.remove('valid')
        element.parentElement.lastElementChild.style.display = 'block'
        console.log(element.parentElement.lastElementChild)
    }}}