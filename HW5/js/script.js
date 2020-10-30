/*
Name: Eric Ramos
Email: eric_ramos@student.uml.edu
File: /~eramos/index.html
Affiliation: UMass Lowell Computer Science Student, 91.61 GUI Programming I
Assignment: Creating an Interactive Dynamic Table
Created: 10/26/2020
Copyright (c) 2020 by Eric Ramos. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

Note resources were used from the following sites
This site was used for css styling the table so that the table would have scroll bars w/ defined height & width
https://mdbootstrap.com/docs/jquery/tables/scroll/

Description: The following script first gets values from a form, it will then verify they are valid. If the inputs are not valid then an error message will appear
Once valid inputs are submitted, a mulitplication table will be created based on the two given ranges. 
*/

function createTable(){
  //Creates a warning message which will replace the current blank message
  var warning = document.getElementById("warning");
  //Creates a table that which will replace the current blank table
  var multiTable = document.getElementById("multiTable");
  //The inputs are grabbed then verified to be numbers, if they are not numbers there value will be NaN
  var start1 = Number(document.forms["inputs"]["s1"].value);
  var end1 = Number(document.forms["inputs"]["e1"].value);
  var start2 = Number(document.forms["inputs"]["s2"].value);
  var end2 = Number(document.forms["inputs"]["e2"].value);
  //Creates the message value
  var message = "";
  //This is the data that will be used to create the table, it will be appeneded together in a while loop
  var data = "";
  //The following if & else if are validation checks, to ensure only valid inputs are entered
  if (start1 < -50) {
    message = "The lower bound in the first range cannot be lower than -50";
    warning.innerHTML = message;
  }
  else if (end1 > 50) {
    message = "The upper bound in the first range cannot be greater than 50";
    warning.innerHTML = message;
  }
  else if (start1 > end1) {
    message = "The lower bound in the first range cannot be greater than the upper bound";
    warning.innerHTML = message;
  }
  else if (start2 < -50) {
    message = "The lower bound in the second range cannot be lower than -50";
    warning.innerHTML = message;
  }
  else if (end2 > 50) {
    message = "The upper bound in the second range cannot be greater than 50";
    warning.innerHTML = message;
  }
  else if (start2 > end2) {
    message = "The lower bound in the second range cannot be greater than the upper bound";
    warning.innerHTML = message;
  }
  else if((start1 == NaN) || (start2 == NaN) || (end1 == NaN) || (end2 == NaN)){
    message = "All inputs must be integers";
    warning.innerHTML = message;
  }
  else if (((start1 % 1) != 0) || ((start2 % 1) != 0) || ((end1 % 1) != 0) || ((end2 % 1) != 0)) {
    message = "All inputs must be integers";
    warning.innerHTML = message;
  }
  //Creation of the table begins here
  else {
    //Prepares the prepares the column header, as it needs on cell to be empty
    data +="<tr><td>x</td>";
    //Creates the column header by iterating through the range
    for(var i = start1; i <= end1; i++){
      data += "<td>" + i + "</td>";
    }
    //closes the the row
    data += "</tr>";
    //Begins to populate the data
    for(var i = start2; i <= end2; i++){
      //adds in the row header before filling the data
      data += "<tr><td>" + i + "</td>";
      //creates the row data
      for(var j = start1; j <= end1; j++){
        data+= "<td>" + i*j + "</td>";
      }
      //closes the row
      data += "</tr>";
    }
    //Since the message is blank it will overwrite any previous error
    warning.innerHTML = message;
    //Sends in the new table.
    multiTable.innerHTML = data;
  }
}
