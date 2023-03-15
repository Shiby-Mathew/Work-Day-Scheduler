var saveButton = $(".saveBtn");
var currentDay = $("#currentDay");
var msg = $(".message");

// document.ready function
$(function () {
  //function calls when save button clicked
  saveButton.on("click", function () {
    var divId = $(this).parent().attr("id");
    var textAreaValue = $(this).parent().children().eq(1).val();

    //storing the details in localstorage
    var plannerDetails =
      JSON.parse(localStorage.getItem("plannerDetails")) || [];
    var plannerInfo = {
      timeDiv: divId,
      items: textAreaValue,
    };
    plannerDetails.push(plannerInfo);
    localStorage.setItem("plannerDetails", JSON.stringify(plannerDetails));
    displayMessage();
  });

  //Showing message values are stored in LocalStorage
  function displayMessage() {
    msg.attr("class", "message");
    msg.text("Information Stored in LocalStorage");

    setTimeout(function () {
      msg.attr("class", "message hide");
    }, 1000);
  }

  // Retriving data from localStrorage and display in the textarea
  function renderMessage() {
    var plannerDetails =
      JSON.parse(localStorage.getItem("plannerDetails")) || [];
    for (var i = 0; i < plannerDetails.length; i++) {
      var targetDiv = $(`#${plannerDetails[i].timeDiv}`)
        .children()[1]
        .append(plannerDetails[i].items);
    }
  }
  renderMessage();

  //Checking current time and changing the color "class" accordingly
  function displayCorrectTimeBlock() {
    var workingHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    var currentMomentTime = dayjs().format("HH");
    for (var i = 0; i < workingHours.length; i++) {
      var timeDifference =
        parseInt(currentMomentTime) - parseInt(workingHours[i]);

      if (timeDifference > 0) {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block past");
      } else if (timeDifference === 0) {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block present");
      } else {
        $(`#hour-${workingHours[i]}`).attr("class", "row time-block future");
      }
    }
  }

  displayCorrectTimeBlock();

  //Showing current date and time in the header

  function displayTime() {
    var time = dayjs();
    var newTime = time.format("D-MMMM-YYYY hh:mm:ss");

    currentDay.text(newTime);
  }
  function displayTimeEverySecond() {
    setInterval(renderCurrentTime, 1000);
  }

  displayTime();
  displayTimeEverySecond();
});
