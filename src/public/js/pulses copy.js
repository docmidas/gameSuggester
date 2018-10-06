//alert("Javascript is working");


console.log("loaded");
var filters = document.getElementsByClassName("filters");
for (var i = 0; i < filters.length; i++) {
  // console.log(filters[i]);
  filters[i].addEventListener("click", iAm);
}

function iAm(arg) {
  console.log(this.value);
}
