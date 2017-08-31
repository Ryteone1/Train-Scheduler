/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

var config = {
    apiKey: "AIzaSyD0lIJU5z2ZETLnz5DE-B_Yvs-CoruCNnc",
    authDomain: "train-scheduler-dc563.firebaseapp.com",
    databaseURL: "https://train-scheduler-dc563.firebaseio.com",
    projectId: "train-scheduler-dc563",
    storageBucket: "train-scheduler-dc563.appspot.com",
    messagingSenderId: "1028879929216"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding new trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#first-train-time-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    destination: trainDestination,
    start: firstTrainTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("New Train successfully added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Storing everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(trainFrequency);

  // Prettify the train start
  var trainStartPretty = moment.unix(firstTrainTime).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var placeholder = moment().diff(moment.unix(empStart, "X"), "months");

  console.log(placeholder);

  // Calculate the total billed rate
  var nextTrainArrival = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStartPretty + "</td><td>" + placeholder + "</td><td>" + trainFrequency + "</td><td>" + nextTrainArrival + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
