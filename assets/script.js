// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveButton = $(".saveBtn");
var textArea = document.querySelector("textarea");
var currentDay = $("#currentDay");

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listenerg
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//

$(function () {
  saveButton.on("click", function () {
    var divId = $(this).parent().attr("id");
    var textAreaValue = $(this).parent().children().eq(1).val();

    console.log(textAreaValue);
    var plannerDetails =
      JSON.parse(localStorage.getItem("plannerDetails")) || [];
    var plannerInfo = {
      timeDiv: divId,
      items: textAreaValue,
    };
    plannerDetails.push(plannerInfo);

    localStorage.setItem("plannerDetails", JSON.stringify(plannerDetails));
    //renderMessage();
  });

  function renderMessage() {
    var plannerDetails =
      JSON.parse(localStorage.getItem("plannerDetails")) || [];
    for (var i = 0; i < plannerDetails.length; i++) {
      console.log(plannerDetails[i].timeDiv);
      console.log(plannerDetails[i].items);
      let tagertDiv = $(`#${plannerDetails[i].timeDiv}`)
        .children()[1]
        .append(plannerDetails[i].items);
      //console.log($(`#${plannerDetails[i].timeDiv}`).children().);
    }
  }

  renderMessage();

  function displayCorrectTimeBlock() {
    let workingHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    let currentMomentTime = dayjs().format("HH");
    for (var i = 0; i < workingHours.length; i++) {
      let timeDifference =
        parseInt(currentMomentTime) - parseInt(workingHours[i]);
      console.log(timeDifference > 0);
      if (timeDifference > 0) {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block past");
      } else if (timeDifference === 0) {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block present");
      } else {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block future");
      }
    }

    console.log(currentMomentTime);
  }

  displayCorrectTimeBlock();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.

  function renderCurrentTime() {
    var time = dayjs();
    var newTime = time.format("D-MMMM-YYYY hh:mm:ss");

    currentDay.text(newTime);
  }
  function renderCurrentTimeEverySecond() {
    setInterval(renderCurrentTime, 1000);
  }

  renderCurrentTime();
  renderCurrentTimeEverySecond();
});

//checking the time change the colour
// function changingClass() {
//   var time = dayjs();
//   var currentTime = time.format("hh");

//   console.log(currentTime);
// }
// changingClass();