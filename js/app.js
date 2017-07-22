
//Global variable list
const selectField = document.getElementById('title');
const selectedDesign = document.getElementById('design');
const shirtColors = document.getElementById('color');
const colorMenuSection = document.getElementById('colors-js-puns');
const activities = document.querySelector('.activities');
const checkBoxes = activities.querySelectorAll("[type='checkbox']");
const activitiesLegend = activities.querySelectorAll("legend");
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPalInfo = creditCard.nextElementSibling;
const bitCoinInfo = payPalInfo.nextElementSibling;
const emailField = document.querySelector('#mail');

// When the page loads, give focus to the first text field
window.onload = function() {
  document.getElementById('name').focus();
  hideColorMenu();
  hideExtraPaymentInfo()
  hideOtherBox()
  console.log(activitiesLegend);
};

// ”Job Role” section of the form:
// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.

function hideOtherBox() {
  const otherBox = document.getElementById('other-role');
  otherBox.style.display = 'none';
}

function otherTitleInput () {
  const otherTitle = document.createElement("INPUT");
  otherTitle.setAttribute("type", "text");
  // Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
  otherTitle.setAttribute("id", "other-title");
  otherTitle.placeholder = "Your Job Role";
  otherTitle.setAttribute("autofocus", true);

  const parentNode = selectField.parentNode;
  parentNode.appendChild(otherTitle);
}
// event "other" selected, triggers addition of box
selectField.onchange = function() {
  if ( selectField.querySelector("[value='other']").selected ) {
    otherTitleInput();
  } else {
    document.getElementById('other-title').style.display = "none";
  }
}
// ”T-Shirt Info” section of the form:
// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
function hideColorMenu() {
  colorMenuSection.style.display = "none";
}

function showColorMenu() {
  colorMenuSection.style.display = "block";
}

selectedDesign.onchange = function(){
  showColorMenu();
  // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  if (selectedDesign.options[1].selected) {
    shirtColors.options[0].selected = true;
    for (h = 5; h >= 3; h--){
      for (s = 0; s < 3; s++) {
        shirtColors.options[h].style.display = "none";
        shirtColors.options[s].style.display = "block";

        }
      }
    }
  // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
  else if (selectedDesign.options[2].selected){
    shirtColors.options[3].selected = true;
    for (h = 0; h < 3; h ++){
      for (s = 5; s >= 3; s--) {
        shirtColors.options[h].style.display = "none";
        shirtColors.options[s].style.display = "block";
      }
    }
  }
}

// ”Register for Activities” section of the form:
// const incompatibles
  const tuesMorning = [1,3],
        tuesAfternoon = [2,4];

  function disabledStyle(el){
    el.style.color = "#d3d3d3";
    el.style.fontStyle = "italic";
  }

  function undisabledStyle(el){
    el.style.color = "#000";
    el.style.fontStyle = "normal";
  }
// Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
function disableIncompatible (arr) {
    if(checkBoxes[arr[0]].checked) {
      checkBoxes[arr[1]].disabled = true;
      const label = checkBoxes[arr[1]].parentNode;
      disabledStyle(label);
    } else {
      checkBoxes[arr[1]].disabled = false;
      const label = checkBoxes[arr[1]].parentNode;
      undisabledStyle(label);
    }
    if(checkBoxes[arr[1]].checked) {
      checkBoxes[arr[0]].disabled = true;
      const label = checkBoxes[arr[0]].parentNode;
      disabledStyle(label);
    } else {
      checkBoxes[arr[0]].disabled = false;
      const label = checkBoxes[arr[0]].parentNode;
      undisabledStyle(label);
    }
}

function clearOldTotal() {
  activities.removeChild(total)
}

function getSum() {
  let dollars = [];

  let sum = activities.querySelectorAll('input[type="checkbox"]:checked');
  for (i =0; i < sum.length; i++) {
    let activity = sum[i].parentNode.innerHTML;
      dollars.push(parseInt( activity.slice(-3) ));
  }
  function addUp(total, num) {
    return total + num;
  }

  let sumUp = "Total: $" + dollars.reduce(addUp, 0).toString();
  return sumUp;
}

function removeOldTotal(){
  if(activities.childNodes.length > 17) {
    let lastNode = activities.lastChild;
    activities.removeChild(lastNode);
  }
}
// As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
function showTotal(){
  removeOldTotal();
  let totalText = getSum();
  const total = document.createElement("h3");
  total.innerHTML = totalText;
  activities.appendChild(total);
}

activities.onchange = function() {
  disableIncompatible(tuesMorning);
  disableIncompatible(tuesAfternoon);
  showTotal();
}
//Payment Info section of the form:
// Display payment sections based on the payment option chosen in the select menu
// The "Credit Card" payment option should be selected by default, display the #credit-card div
payment.options[1].selected = true;
//Hide the "Paypal" and "Bitcoin information.
let payElements = ['0', creditCard, payPalInfo, bitCoinInfo];

function hideExtraPaymentInfo() {
  payPalInfo.style.display = "none";
  bitCoinInfo.style.display = "none";
}
// When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.
// When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
function hideUnselectedPayment(sel){
  for (i = 1; i < payElements.length; i++) {
    if (sel != i) {
      payElements[i].style.display = "none";
    }
  }
}

function showSelected() {
  let sel = payment.selectedIndex;
  if (sel === 0) {return;}
  payElements[sel].style.display = "block";
  hideUnselectedPayment(sel);
}

payment.onchange = function(){
  showSelected();
}

// Form Validation
const form = document.querySelector("form");

//START HERE: Finish tooltip code, then add it to all fields with border color red until validation complete.  Not on fields where required has been set except maybe the cc info.
function validationMessage(el, message) {
  const errorText = document.createElement('H3')
  errorText.innerHTML = message;
  errorText.style.color = 'red';
  errorText.style.fontStyle = "italic";
  errorText.setAttribute('id', 'errorMessage');
  const parent = el.parentNode;
  console.log(el)
  parent.insertBefore(errorText, el);
}
//create red border for input validation
function borderRedValidation(el) {
  el.style.borderColor = "red";
}

// If any of the following validation errors exist, prevent the user from submitting the form:
// Name field can't be blank
const nameField = document.querySelector('#name');
nameField.required = "true";

// Must select at least one checkbox under the "Register for Activities" section of the form.
  function atLeastOne() {
    let atLeastOne = false;
    for (i = 0; i < checkBoxes.length; i ++) {
      if (checkBoxes[i].checked) {
            atLeastOne = true;
        }
        return atLeastOne;
      }
    }

  function checkBoxChecked(e) {
      let atLeastOneBox = atLeastOne();
      console.log(atLeastOneBox)
      if(!atLeastOneBox) {
        e.preventDefault();
        checkBoxes[0].focus();
        let checkBoxError = true;
        const invalidmsg = "Please choose at least one activity";
        validationMessage(activitiesLegend[0], invalidmsg);
        activities.focus();
        return checkBoxError;
      }
    }

    allCheckBoxes = document.querySelector('fieldset.activities');
    allCheckBoxes.onchange = function (){
      let checkBoxErrorNow = checkBoxChecked();
      console.log('checkBoxes.onchange')
      console.log('allCheckBoxes', allCheckBoxes)
      if(checkBoxErrorNow = true) {
        const error = document.querySelector('fieldset.activities #errorMessage');
        console.log('error', error)
        allCheckBoxes.removeChild(allCheckBoxes.childNodes[1])
      }
    }


// If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
function creditCardValid(e) {
  if (payment.options[1].selected) {
    const ccNum = document.querySelector('#cc-num');
    ccNum.required = "true";
    // Credit card field should only accept a number between 13 and 16 digits
    ccNum.setAttribute("maxlength", "16");
    ccNum.setAttribute("minlength", "13");
    const number = ccNum.value;
    if ( number.length < 13 || number.length > 16) {
      e.preventDefault();
      const invalidmsg = "Please enter valid credit card information.";
      validationMessage(payment, invalidmsg);
    }
    const ccZip = document.querySelector('#zip');
    ccZip.required = "true";
    // The zipcode field should accept a 5-digit number
    ccZip.setAttribute("minlength", "5");
    if (ccZip.value.length < 5) {e.preventDefault();}

    const ccCvv = document.querySelector('#cvv');
    ccCvv.required = "true";
    // The CVV should only accept a number that is exactly 3 digits long
    ccCvv.setAttribute("maxlength", "3");
    ccCvv.setAttribute("minlength", "3");
    if (ccCvv.value.length !== 3) {
      e.preventDefault();
    }
  }
}

// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
function ValidateEmail(e, mailField) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailField.value.match(mailformat)) {
      return;
    }
    else
    {
      e.preventDefault();
      mailField.focus();
      const invalidmsg = "Please enter a valid email address.";
      borderRedValidation(mailField)
      validationMessage(emailField, invalidmsg);
      emailField.focus();
    }
  }
//Live field validation of email box
emailField.onkeydown = function(){
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailField.value.match(mailformat)) {
      emailField.style.borderColor = "green";
      document.getElementById("errorText").remove();
      return;
    }
    else {
      const errorText = document.createElement('P')
      if (document.contains(document.getElementById("errorText"))) {
            document.getElementById("errorText").remove();
          }
      const invalidmsg = "Please enter a valid email address.";
      emailField.style.borderColor = "red";
      errorText.innerHTML = invalidmsg;
      errorText.style.color = 'red';
      errorText.style.fontStyle = "italic";
      const parent = emailField.parentNode;
      parent.insertBefore(errorText, emailField);
      errorText.setAttribute('id', "errorText");
    }
  }
//Call all validation functions
  form.onsubmit = function(e) {
    ValidateEmail(e, emailField);
    checkBoxChecked(e);
    creditCardValid(e);
  }
