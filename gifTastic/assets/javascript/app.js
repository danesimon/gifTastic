
// empty gif array 
var gifsArray = [];

var topics = ["voldemort", "harry Potter", "Fantasatic Beasts and where to find them"]

function displayInitialButtons() {

  for (var i = 0; i < topics.length; i++) {
    
  var topicsDiv = $("<button>");
  var topicsBtnName = topicsDiv.text(topics[i]);

  topicsDiv.attr("data-name", topics[i])

  topicsDiv.addClass("hoverable")

    
  $(topicsBtnName).addClass("btn #37474f blue-grey darken-3");




    
  	var topicsVal = topics[i];

  	console.log(topicsVal)
    
    //var topicsVal = $(this).topics[i];
  
   $("#initial-buttons").append(topicsDiv)
    
 
    $("button").on("click", function() {
      //console.log($(this).val())
       displayGifs($(this).data("name"))  
      
    });
   
  }

}


function displayGifs(gifSearch) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch +    "&api_key=PjsJJF5igGmYhSxudBVlGWyciIlt43Qz&limit=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response.data);

    var results = response.data

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = $("<p>").text("Rating: " + results[i].rating) 
      
      //rating.addClass("col m4")

     // console.log(results[i].rating)

      var gifImage = $("<img>");

      // gifImage.attr("src", results[i].images.fixed_height.url);
      
      gifImage.attr("src", results[i].images.fixed_height_still.url);

      
      gifImage.attr("data-still",results[i].images.fixed_height_still.url);
      
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      
      gifImage.attr("data-state", "still");
            
      gifImage.addClass("gif");
      
      gifImage.addClass("responsive-img")

      gifImage.addClass("z-depth-1")
      

      gifDiv.append(rating);
      
      gifDiv.append(gifImage)
      
      gifDiv.addClass("col s4")

      //gifImage.append(gifDiv);


      // $("#gifsDisplay").empty();

        $("#gifsDisplay").prepend(gifDiv);
      //$("#gifsDisplay").prepend(gifImage);
      
      
      $(".gif").on("click", function() {
          console.log("i clicked on the gif")
    
  
            var state = $(this).attr("data-state");
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    	});
 
	};


}) 

}


function createButtons() {


$("gifsButtons").empty();

$("#gifSearch-input").on("click", function (event) {
  event.preventDefault();
  
	var addedGifs = $("#gifSearch").val().trim();
  
	gifsArray.push(addedGifs)

	var addedGifsButton = $("<button>");
  
   $(addedGifsButton).addClass("btn #37474f blue-grey darken-3");
  
	addedGifsButton.append(addedGifs);
	$("#gifsButtons").prepend(addedGifsButton)

	addedGifsButton.addClass("gif")
	addedGifsButton.addClass("hoverable")

  
  
    $("button").on("click", function() {
      
      displayGifs(addedGifs)
      
    })

});


}
displayInitialButtons()

$(document).on("click", createButtons())


