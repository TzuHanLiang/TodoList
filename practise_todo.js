var enter = document.querySelector("#enter");
var input = document.querySelector("#input");
var ul = document.querySelector("ul");

//------------------------------------------
//creat new list element by click enter button or press enter key

enter.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

function createListElement(){
	var deletebtn = document.createElement("Button");
	deletebtn.appendChild(document.createTextNode("Delete"));
	deletebtn.onclick = removeParent;
	// deletebtn.innerHTML = "Delete";
		//create a new li tag
	//create a text node
	//use appendChild to put TextNode in li or use innerHTML   
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	li.innerHTML += " ";
	li.appendChild(deletebtn);
	// ul.appendChild(deletebtn);

	ul.appendChild(li);
	input.value = "";
}

function inputLength(){
	return input.value.length;
}

function addListAfterClick(){
	if(inputLength()){
		createListElement();
	}
}

function addListAfterKeypress(event){
	var key = "which" in event ? event.which : event.keyCode ;
	if(inputLength() && key === 13 ){
		createListElement();
	}
}
//----------------------------------------------
// delete button
var deleteBtns = document.querySelectorAll(".deleteBtns");
for(var i = 0; i < deleteBtns.length; i++){
	deleteBtns[i].addEventListener("click", removeParent, false);
}

// ul.addEventListener("click", function(event){
// 	event.target.onclick = removeParent;
// })

// function removeParent(event){
// 	event.target.onclick = null;
// }

function removeParent(event){
	//The most deeply nested element that caused the event is called a target element, accessible as event.target.
	//Removing the event listener first always results in lower memory usage (no leaks).
	//https://javascript.info/introduction-browser-events  !!! something interesting inside it, find sometime to try it.
	event.target.removeEventListener("click", removeParent, false);
	// event.target.onclick = null;
	//use console.log(event.target), we can find the event.target is <button class="deleteBtns">Delete</button>
	//parentNode is the parent of the current node. In this case li is the parentNode of button
	// console.log(event.target.parentNode);
	event.target.parentNode.remove();
}
//----------------------------------------------
//line-through effect
function getEventTarget(evt){
	evt = evt || window.event;
	return evt.target || evt.srcElement;
	//Event.srcElement is a proprietary alias (implemented in Internet Explorer) for the standard Event.target property, which is supported in some other browsers for web compatibility purposes.
}

ul.addEventListener("click", function(event){
	// event.target.classList.toggle("done");
	var target = getEventTarget(event);
	target.classList.toggle("done");
})

//----------------------------------------------
//background
var color1 = document.querySelector("#color1");
var color2 = document.querySelector("#color2");
var body = document.querySelector("body");
var randombtn = document.querySelector("#randombtn");

setGradient();

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);

function setGradient(){
	body.style.background = 
	"linear-gradient(to right, " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";
	console.log("color1", color1.value);
	console.log("color2", color2.value);
}

randombtn.addEventListener("click", randomColor)

function randomHex(){
	var hexColor = "#";
	while(hexColor.length < 7){
		hexColor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)];
	}
	return hexColor;
}

function randomColor(){
	color1.value = randomHex();
	color2.value = randomHex();
	setGradient();
}
