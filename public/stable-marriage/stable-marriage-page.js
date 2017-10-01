$(document).ready(function() {
	changeProblemSize(3);
	$("#n1, #n2").on("input", function(e) {
		let n = e.target.value;
		changeProblemSize(n);
	})
});


function changeProblemSize(n) {
	let previous = getProblemSize();

	// Update both inputs for the problem size 
	$('#n1').val(n);
	$('#n2').val(n);

	if(n > previous) {
		// Add more inputs
		for(let i = previous; i < n; i++) {
			addInputs(i+1);
		}
	}

	else if (n < previous) {
		// Remove inputs
		for(let i = n; i < previous; i++) {
			$('#preferenceMen').children().last().remove();
			$('#preferenceWomen').children().last().remove();
		}
	}

	let str = "";
	for(let i = 0; i < n; i++) {
		str += (i + 1) + " ";
	}
	str = str.substr(0, str.length - 1);

	for(let i = 0; i < n; i++) {
		let input = $('#preferenceMen div.input-group input')[i];
		$(input).val(str);
		input = $('#preferenceWomen div.input-group input')[i];
		$(input).val(str);
	}
}


function getProblemSize() {
	return $('#preferenceMen').children().length;
}

function addInputs(i) {

	let container = document.createElement("div");
	container.className = "input-group"

	let label = document.createElement("label");
	label.for = "m_" + i;
	let input = document.createElement("input");
	input.type="text";
	input.id = "m_" + i;
	label.innerHTML = "m<sub>" + i + "</sub>";
	container.appendChild(label);
	container.appendChild(input);
	$("#preferenceMen").append(container);
	
	container = document.createElement("div");
	container.className = "input-group"

	label = document.createElement("label");
	label.for = "w_" + i;
	input = document.createElement("input");
	input.type="text";
	input.id = "w_" + i;
	label.innerHTML = "w<sub>" + i + "</sub>";
	container.appendChild(label);
	container.appendChild(input);
	$("#preferenceWomen").append(container);
}