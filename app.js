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
  var frequency = 0;
  var nextArrival = "";
  var minutesAway = "";
  var currentTime = moment().format("X");

$("#submit").on("click",function(event){
	// prevents page from refreshing
	event.preventDefault();

  name = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  frequency = $("#frequency").val().trim();
  firstTime = moment($("#time").val().trim(),"LT").format("X");

	database.ref().push({
		name: name,
		destination: destination,
    frequency: frequency,
		firstTime: firstTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

  $(".form-control").val("");
});

database.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = parseInt(snapshot.val().frequency);
  var firstTime = snapshot.val().firstTime;
  var multiplier = Math.ceil(parseInt(moment().diff(moment.unix(firstTime, "X"), 'minutes'))/frequency);
  var nextArrival = moment.unix(firstTime, "X").add(multiplier*frequency, "minutes");
  var minutesAway = moment(nextArrival).diff(moment(),"minutes")+1;

  $("#rows").prepend("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+moment(nextArrival).format("LT")+"</td><td>"+minutesAway+"</td></tr>"
    );
});

