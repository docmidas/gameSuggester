//alert("Javascript is working");
//var results = document.getElementsByClassName("col-2-5");
//var results = document.getElementsByClassName("results");
  var results = document.getElementsByClassName("results");
  var result_count = 0;

  

window.onload = initialResults;
function initialResults() {
   result_display.innerHTML = results.length;

 } 


var filter_form = document.getElementById("filter_form").elements;
var filter_list;
var excludes = [];
var result_display = document.getElementById("result_display");


console.log("loaded");
var filters = document.getElementsByClassName("filters");
for (var i = 0; i < filters.length; i++) {
  // console.log(filters[i]);
  filters[i].addEventListener("input", updateFilter2);
}


function updateFilter2(dimension) {
  
  console.log("NAME: " + this.name + "  " + this.value);
  //console.log(this.value);

  filter_list = {
    mechanics: [],
    categories: [],
    playercount: [],
    minplyr: Number(filter_form.minplyr.value),
    maxplyr: Number(filter_form.maxplyr.value),
    mintime: Number(filter_form.mintime.value),
    maxtime: Number(filter_form.maxtime.value),
    minweight: Number(filter_form.minweight.value),
    maxweight: Number(filter_form.maxweight.value)
  };
  for (var i = 0; i < filter_form.length; i++) {
    if(filter_form.item(i).checked && filter_form.item(i).name == "mechanism"){
      filter_list.mechanics.push(filter_form.item(i).value);  
    }
  }

  for (var i = 0; i < filter_form.length; i++) {
    if(filter_form.item(i).checked && filter_form.item(i).name == "category"){
      filter_list.categories.push(filter_form.item(i).value);  
      console.log(filter_form.item(i).value);
    }
  }

  for (var i = 0; i < filter_form.length; i++) {
    if(filter_form.item(i).checked && filter_form.item(i).name == "playercount"){
      filter_list.playercount.push(filter_form.item(i).value);  
      //console.log(filter_form.item(i).value);
    }
  }

  compareFilterResults();
}
//////
///////

function compareFilterResults(){
  excludes = [];
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < filter_list.mechanics.length; j++) {
      if(results[i].dataset.mechanics.indexOf(filter_list.mechanics[j]) < 0 ){
        excludes.push(i);
      }
    }

    for (var k = 0; k < filter_list.categories.length; k++) {
      if(results[i].dataset.categories.indexOf(filter_list.categories[k]) < 0 ){
        excludes.push(i);
      }
    }

    if(filter_form.minplyr.value != false && Number(results[i].dataset.minplyr) > filter_list.minplyr){
      excludes.push(i);
    }
    if(filter_form.maxplyr.value != false && Number(results[i].dataset.maxplyr) < filter_list.maxplyr){
      excludes.push(i);
    }

    if(filter_form.mintime.value != false && Number(results[i].dataset.mintime) < filter_list.mintime){
      excludes.push(i);
    }
    if(filter_form.maxtime.value != false && Number(results[i].dataset.maxtime) > filter_list.maxtime){
      excludes.push(i);
    }

    if(filter_form.minweight.value != false && Number(results[i].dataset.minweight) < filter_list.minweight){
      excludes.push(i);
    }
    if(filter_form.maxweight.value != false && Number(results[i].dataset.maxweight) > filter_list.maxweight){
      excludes.push(i);
    }


        

  }
//console.log(excludes);
  var result_count = 0;
  for (var x = 0; x < results.length; x++) {
    if(excludes.indexOf(x) > -1){
      results[x].style.display = "none";
    }else{
      results[x].style.display = "inline-block"; 
      result_count++; 
    }    
  }
  
  
  result_display.innerHTML = result_count;
}

var idees = [];
var dexList = document.getElementsByClassName("collection_thumbnail");
for (var i = 1; i < dexList.length; i++) {
  var sliced = dexList[i].innerHTML.slice(24);
  var end = sliced.indexOf("/");
  sliced = sliced.slice(0,end);
  idees.push(Number(sliced));
}


