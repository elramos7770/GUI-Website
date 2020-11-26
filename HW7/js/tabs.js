/*
Name: Eric Ramos
Email: eric_ramos@student.uml.edu
File: /~eramos/slider.js
Affiliation: UMass Lowell Computer Science Student, 91.61 GUI Programming I
Assignment: Creating an Interactive Dynamic Table
Created: 10/26/2020
Copyright (c) 2020 by Eric Ramos. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

Description: The following script implements a tabs, the tabs saves the current state of the tabel, tabs will not be able to updated, they only save the state.
The script also allows for the deletion of slides.
*/

//Keeps track of the tab#
var tabNum = 1;

$(function () {
     $("#tabs").tabs();
 });
//Recreates an exact copy of the table, saved table will not be modified.
function createTab(){
  //Increments the tabNum then grabs needed data
  //Note that inputs are validated before this is called
  tabNum = 1 + tabNum;
  var start1 = Number(document.forms["inputs"]["s1"].value);
  var end1 = Number(document.forms["inputs"]["e1"].value);
  var start2 = Number(document.forms["inputs"]["s2"].value);
  var end2 = Number(document.forms["inputs"]["e2"].value);
  //This data var is 90% of the information that the tab will contain.
  var data = "";
  //Stores the table customizations
  data += "<div class='table-wrapper-scroll-y table-design my-custom-scrollbar text-center'>"
  data += "<table class='table table-striped table-bordered table-hover'>";
  data +="<tr><td>x</td>";
  //Creates the table
  for(var i = start1; i <= end1; i++){
    data += "<td>" + i + "</td>";
  }
  data += "</tr>";
  for(var i = start2; i <= end2; i++){
    data += "<tr><td>" + i + "</td>";
    for(var j = start1; j <= end1; j++){
      data+= "<td>" + i*j + "</td>";
    }
    data += "</tr>";
  }
  data += "</table></div>";
  //Starts to create the tab and appends it
  $("<li><a href='#t" + tabNum+ "'>Tab" +tabNum + "</a><input type='checkbox' class='tabCheckBox'></li>")
  .appendTo("#tabs ul");
  //Inserts the data
  $("<div id='t" + tabNum+ "'>"+data+"</div>").appendTo("#tabs");
  $("#tabs").tabs("refresh");
}
//Deletes the selected tabs
function deleteSelected() {
//checks each tab if its selected, if it is then delete it.
$("#tabs ul li").each(function() {
  var selected = $(this).attr("aria-controls");
  if ($(this).find('input').prop("checked")) {
    $(this).remove()
    $("#" + selected).remove();
    $("#tabs").tabs("refresh");
  }
});
}
