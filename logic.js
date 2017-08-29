var config = {
  apiKey: "AIzaSyBAD9iAQ89v6xwSdOW7HtBeHfd2olY8oYE",
  authDomain: "homework7-568d3.firebaseapp.com",
  databaseURL: "https://homework7-568d3.firebaseio.com",
  projectId: "homework7-568d3",
  storageBucket: "homework7-568d3.appspot.com",
  messagingSenderId: "544702545302"
};

firebase.initializeApp(config);

var database = firebase.database();

var pokemon = database.ref("/pokemon");

database.ref("/pokemon").on("value", function(snapshot) {

	snapshot.forEach(function(snapshotChild) {
		var pokeObj = { 
			name: snapshotChild.val().name,
			type: snapshotChild.val().type,
			dayCaught: snapshotChild.val().dayCaught,
			exp: snapshotChild.val().exp,
			monthsTrained: snapshotChild.val().monthsTrained,
			rate: snapshotChild.val().rate
		};

		updateTable(pokeObj);
	});

});

function updateTable(val){
	$("#pkmnData").append("<tr><td>" + 
		val.name + "</td><td>" + val.type + "</td><td>" + 
		val.dayCaught + "</td><td>" + val.rate + "</td><td>" + 
		val.monthsTrained + "</td><td>" + val.exp + "</td></tr>");
}

$("#btnSubmit").on("click", function() {

	console.log("click");
	
	var name = $("#name").val().trim();
	var type = $("#type").val().trim();
	var dayCaught = $("#caught").val().trim();
	var dayCaughtArr = dayCaught.split("/");
	var rate = parseInt($("#expRate").val().trim());
	var monthsTrained = 12;
	var exp = monthsTrained*rate;

	database.ref("/pokemon").push({
		name: name,
		type: type,
		dayCaught: dayCaught,
		rate: rate,
		monthsTrained: monthsTrained,
		exp: exp
	});

});

// function calcMonths(arr) {
// 	var sumMonths = 0;

// 	if (parseInt(arr[2]) > 2017) { return "Invalid Date"}
// 	else { sumMonths += 12*(2017-arr[2])}

// 	if (parseInt(arr[2]) === 2017 && parseInt(arr[1]) )
