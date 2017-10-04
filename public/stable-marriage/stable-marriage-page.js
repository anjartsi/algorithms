let colors = [
				'#0074D9',
				'#FF4136',
				'#2ECC40',
				'#FFDC00',
				'#7FDBFF',
				'#F012BE',
				'#01FF70',
				'#FF851B',
				'#39CCCC',
				'#B10DC9',
				'#AAAAAA',
				'#DDDDDD',
]

let dragging = false;
let clickedPreferenceBox;
$(document).ready(function() {
	changeProblemSize(3);
	$("#n1, #n2").on("input", function(e) {
		let n = e.target.value;
		changeProblemSize(n);
	})

	$("#btnRandomize").click(randomizeInstance);
});


function changeProblemSize(n) {
	let previous = getProblemSize();

	// Update both inputs for the problem size 
	$('#n1').val(n);
	$('#n2').val(n);

	if(n > previous) {
		// Add more people
		for(let i = previous; i < n; i++) {
			addPerson(i, "m");
			addPerson(i, "w");
			for(let j = 0; j < n; j++) {
				addPreferenceBox(i, j);
			}
		}
		// Add extra boxes to the previous people
		for(let i = 0; i < previous; i++) {
			for(let j = previous; j < n; j++) {
				addPreferenceBox(i, j);
			}
		}
	}

	else if (n < previous) {
		// Remove people
		for(let i = n; i < previous; i++) {
			$('#preferenceMen').children().last().remove();
			$('#preferenceWomen').children().last().remove();

			removePreferenceBoxes(i);
		}
	}
	
	for(let i = 0; i < n; i++) {
		let row = $('#preferenceMen div.container-fluid row')[i];
		row = $('#preferenceWomen div.container-fluid row')[i];
	}

}


function getProblemSize() {
	return $('#preferenceMen').children().length;
}

function addPerson(i, gender) {
	let target = $("#preferenceMen")
	if(gender == "w") {
		target = $("#preferenceWomen")
	}
	let container = document.createElement("div");
	container.className = "container-fluid"
	
	let row = document.createElement("div");
	row.className = "row preferenceRow";
	
	let label = document.createElement("h4");
	label.className = "col-xs-1";
	label.innerHTML = gender + "<sub>" + (i+1);
	$(label).css('color', colors[i]);

	container.appendChild(row);
	row.appendChild(label)
	target.append(container);

	addPreferenceRowEventListeners(row)
}

// Adds a preferenceBox to "person" (both man and woman) the label will read "box" + 1
function addPreferenceBox(person, box) {
	let men = $("#preferenceMen div.container-fluid div.row")
	let women = $("#preferenceWomen div.container-fluid div.row")
	
	let boxM, boxW;

	boxM =document.createElement("div");
	boxM.className = "col-xs-1 preferenceBox";
	boxM.innerHTML = "w<sub>" + (box+1) + "</sub>";
	$(boxM).css('background-color', colors[box]);
	men[person].append(boxM);

	boxW =document.createElement("div");
	boxW.className = "col-xs-1 preferenceBox";
	boxW.innerHTML = "m<sub>" + (box+1) + "</sub>"
	$(boxW).css('background-color', colors[box]);
	women[person].append(boxW);
}

function removePreferenceBoxes(k) {
	let men = $("#preferenceMen div.container-fluid div.row sub");
	let women = $("#preferenceWomen div.container-fluid div.row sub");
	

	let str = (k -0 + 1);
	str = "" + str;
	console.log(str);
	for(let i = 0; i < men.length; i++) {
		if(men[i].innerHTML == str) {
			let parent = $(men[i]).parent()
			if(parent.hasClass("preferenceBox")) {
				parent.remove();
			}
		}


		if(women[i].innerHTML == str) {
			let parent = $(women[i]).parent()
			if(parent.hasClass("preferenceBox")) {
				parent.remove();
			}
		}
	}
}

function swapSiblings(elem1, elem2) {
	let p1 = $(elem1).parent()[0];
	let p2 = $(elem2).parent()[0];
	if(elem1 == elem2 || p1 != p2) return;

	let temp = $(elem1).next()[0];
	if(temp != elem2) {
		p1.insertBefore(elem1, elem2);
		p1.insertBefore(elem2, temp);
	}
	else {
		p1.insertBefore(elem2, elem1)
	}
}

function addPreferenceRowEventListeners(elem) {

	// $(elem).on('mouseenter', function(e) {
	// 	clickedPreferenceBox = null
	// 	dragging = false;	
	// })
	$(elem).on('mousedown', function(e) {
		clickedPreferenceBox = e.target;
		$(clickedPreferenceBox).addClass("clicked");
		dragging = $(clickedPreferenceBox).hasClass("preferenceBox");
	})
	$(elem).on('mousemove', function(e) {
		if(dragging && $(e.target).hasClass("preferenceBox")) {
			swapSiblings(clickedPreferenceBox, e.target);
		}
	})
	$(elem).on('mouseup', function(e) {
		dragging = false;
		$(clickedPreferenceBox).removeClass("clicked");
		clickedPreferenceBox = null;
	})

}

function randomizeInstance() {
	let n = getProblemSize();
	let people = $(".preferenceRow");
	let person;
	let p;
	let a, b;
	for(let i = 0; i < 2 * n * n; i++) {
		p = randomInt(0, 2 * n -1);
		a = randomInt(1, n);
		do {
			b = randomInt(1, n);				
		} while(b == a);
		person = $(people[p]);

		swapSiblings(person.children()[a], person.children()[b]);
	}
}


function randomInt(min, max) {
  return Math.floor(min + (1 + max - min) * Math.random());
}