const list = document.querySelector("ul");
var items = document.querySelector('ul').children

// ADD NEW ITEM TO END OF LIST
var endItem = document.createElement("LI");
var cream = document.createTextNode("cream");
endItem.appendChild(cream);
document.querySelector("ul").appendChild(endItem);

// ADD NEW ITEM START OF LIST
var startItem = document.createElement("LI");
var kale = document.createTextNode("kale");
startItem.appendChild(kale);
list.insertBefore(startItem, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var elements;
var i;
elements = document.getElementsByTagName('li');
for(i = 0; i < elements.length; i++){
  elements[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var number = document.createElement("span");
var textNumber = document.createTextNode(items.length);
number.appendChild(textNumber);
document.querySelector('h2').appendChild(number);
