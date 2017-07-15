
//Global variable list
const selectField = document.getElementById('title');
const selectedDesign = document.getElementById('design');
const shirtColors = document.getElementById('color');
const colorMenuSection = document.getElementById('colors-js-puns');


// When the page loads, give focus to the first text field
window.onload = function() {
  document.getElementById('name').focus();
  hideColorMenu();
};

// ”Job Role” section of the form:
// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
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

const activities = document.querySelector('.activities');
const checkBoxes = activities.querySelectorAll("[type='checkbox']");


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
  console.log(sum);
  for (i =0; i < sum.length; i++) {
    let activity = sum[i].parentNode.innerHTML;
    console.log(activity);
      dollars.push(parseInt( activity.slice(-3) ));
  }
  function addUp(total, num) {
    return total + num;
  }

  let sumUp = "Total: $" + dollars.reduce(addUp, 0).toString();
  console.log(dollars);
  console.log(sumUp);
  return sumUp;
}

function removeOldTotal(){
  console.log(activities.childNodes.length);
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
