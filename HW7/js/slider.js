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

The following site was used to fix a bug of mine.
https://stackoverflow.com/questions/3528758/jquery-ui-slider-wrong-values

Description: The following script implements a slider, the slider will update the text inputs and vice versa. Updating the slider will automatically update the slider.
*/

//Slider options, one for each range as each range affects different text inputs
$(function(){
  var sliderOpts = {
    range: true,
    min:-50,
    max: 50,
    values: [-10, 10],
    step: 1,
    slide: function(event, ui){
      s1 = ui.values[0];
      e1 = ui.values[1];
      $("#s1").val(s1);
      $("#e1").val(e1);
      if($("#inputs").valid()){
        createTable();
      }
    }
  };
  $("#rSlider").slider(sliderOpts);
});
//Slider options
$(function(){
  var sliderOpts = {
    range: true,
    min:-50,
    max: 50,
    values: [-10, 10],
    step: 1,
    //<!--https://stackoverflow.com/questions/3528758/jquery-ui-slider-wrong-values-->
    //Initial implementation had an issue with updating in the right position, this fixes it.
    slide: function(event, ui){
      s2 = ui.values[0];
      e2 = ui.values[1];
      $("#s2").val(s2);
      $("#e2").val(e2);
      if($("#inputs").valid()){
        createTable();
      }
    }
  };
$("#gSlider").slider(sliderOpts);
});
//This updates the Sliders if the text input is changed then creates the table, this is called in validation.
function updateSlide(){
  if($("#inputs").valid()){
    var start1 = Number(document.forms["inputs"]["s1"].value);
    var end1 = Number(document.forms["inputs"]["e1"].value);
    var start2 = Number(document.forms["inputs"]["s2"].value);
    var end2 = Number(document.forms["inputs"]["e2"].value);
    $("#rSlider").slider("values", [start1, end1]);
    $("#gSlider").slider("values", [start2, end2]);
    createTable();
  }
}
