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



$(function(){
  $.validator.setDefaults({
    //styles the error message
    errorClass: "red-text-error"
    /*,
    highlight: function(element){
      $(element).closest(".form-group").addClass("box-error");
    },
    unhighlight: function(element){
      $(element).closest(".form-group").removeClass("box-error");
    }
    */
  });
  //creates a method to determine if a value is an INT
  $.validator.addMethod("integer", function(value, element){
    return this.optional(element) || value % 1 == 0;
  },"The value must be an integer.");
  //creates a method to determine if a value is greater than the other

  $.validator.addMethod("greaterThan", function(value, element, params) {
    return this.optional(element) || parseInt(value) >= parseInt($(params).val());
  }, "The Second range must <em> NOT </em> be less than the first range");

  //checks if the first ranges were changed, and if so, it will validate that the second range is still greater if the second range has a valid input.
  $("input#s1").change(function() {
    const val = $("#e1").val();
    if (!(isNaN(val) || val == "")){
      return $('#inputs').data('validator').element("#e1");
    }
  })
  $("input#s2").change(function() {
    const val = $("#e2").val();
    if (!(isNaN(val) || val == "")){
      return $('#inputs').data('validator').element("#e2");
    }
  })
  //creates the rules for each input
  $("#inputs").validate({
    rules: {
      s1: {
        required: true,
        integer: true,
        range: [-50,50],
      },
      s2:{
        required: true,
        integer: true,
        range: [-50,50],
      },
      e1: {
        required: true,
        integer: true,
        range: [-50,50],
        greaterThan: "#s1"
      },
      e2: {
        required: true,
        integer: true,
        range: [-50,50],
        greaterThan: "#s2"
      }
    }
  });
});


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
  /* The following If statements are now used as reference

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
  */

  //Creation of the table begins here
  if($("#inputs").valid()){
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
