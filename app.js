// incorporating firebase to host arrival and departure data. retrieve and manipulate information
// capture local time using Moment.js
// capture and store user input to firebase
// create a new table row each time you press submit
// create <td> for each input
// calculate next arrival time according to current time, first train time, and frequency
// calculate minutes away
// create array of user inputs
// iterate through array each time submit button pressed print data to table

  var config = {
    apiKey: "AIzaSyC0cRFojizk0dCWbXu94rFZZqb5CfPqf4U",
    authDomain: "project-42d15.firebaseapp.com",
    databaseURL: "https://project-42d15.firebaseio.com",
    storageBucket: "project-42d15.appspot.com",
    messagingSenderId: "1088789718722"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";
  var currentTime = moment().format('h:mm a');

  $("#submit").on("click",function(event){
  	// prevents page from refreshing
  	event.preventDefault();

  	name = $("#trainName").val().trim();
  	destination = $("#destination").val().trim();
  	firstTime = $("#time").val().trim();
  	frequency = $("#frequency").val().trim();

  	database.ref().set({
  		name: name,
  		destination: destination,
  		firstTime: firstTime,
  		frequency: frequency
  	});
    
  });