
//* 3 Name Field

//use focus method on the input type text for "Name" field
const nameField = document.getElementById('name');
nameField.focus();

//4 Job Role Section

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


// 5 T-Shirt Info Section

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
        console.log(theme)
        
        if(theme === design){
            colorSelect.options[i].style.display = '';
            colorSelect.options[i].selected = true;
        }else{
            colorSelect.options[i].style.display = 'none';
            colorSelect.options[i].selected = false;
        }    
    }
})

// 6 Activities Section

// select fieldset to add event listener to it
const activitiesRegistry = document.getElementById('activities')
const activitiesCost = document.getElementById('activities-cost')
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

// 7 Payment Info Section


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

// 8 Form Validation


const form = document.querySelector('form')
const emailAddress = document.getElementById('email')
const cardNum  = document.getElementById('cc-num')
const zipCode = document.getElementById('zip')
const cvv = document.getElementById('cvv')


form.addEventListener ('submit', event => {
    const nameValue = nameField.value
    const emailValue = emailAddress.value
    const cardValue = cardNum.value
    const zipValue = zipCode.value
    const cvvValue = cvv.value

    const nameIsValid = /^[A-Za-z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    const cardIsValid = /^\d{13,16}$/.test(cardValue)
    const zipIsValid = /^\d{5}$/.test(zipValue)
    const cvvIsValid = /^\d{3}$/.test(cvvValue);

    if (!nameIsValid || !emailIsValid || !cardIsValid || !zipIsValid || !cvvIsValid){
        event.preventDefault()
    } else {}})