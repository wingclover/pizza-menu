import fetch from 'isomorphic-fetch';

// Note: this is the entry point for the entire application

// step 1: you will need to load the pizza data. it is available at /pizza.json. what-wg fetch is pre-installed.
// remember that fetch uses promises.

var pizzas;
var keyword; //keyword from user input
var filtered;

function showList(arr, key=null){
  $("ul#pizzas").html("");
  arr.forEach(function(ele){
    if (key){
      if (ele.indexOf(key) !== -1){
        filtered.push(ele);
        $('<li></li>').text(ele).appendTo('ul#pizzas');
      }
    }
    else{
      $('<li></li>').text(ele).appendTo('ul#pizzas');
    }
  });
}

fetch('/pizza.json')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(pizza) {
    pizzas = pizza.pizzas;
	});

// step 2: implement the view and required behaviors
$(".content").hide();

$(document).ready(function(){
  $("#loading").hide();
  $(".content").show();

  showList(pizzas);

  $("input").keyup(function(){
    keyword = $("input").val();
    filtered = [];
    showList(pizzas, keyword);
  })
  $("button").click(function(){
    var toSort;
    if (filtered){
      toSort = filtered;
    }
    else {
      toSort = pizzas.slice();
    }
    toSort.sort();
    toSort.reverse();
    showList(toSort);
  })

})
