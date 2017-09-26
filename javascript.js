//Animal array
var animalArray = ["Sloth", "Hamster", "Kitty"];
console.log(animalArray);

//Function for displaying animal buttons
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#animalButtons").empty();

  // Looping through the array of movies
  for (var i = 0; i < animalArray.length; i++){
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var button = $("<button>");
    // Adding a class of movie to our button
    button.addClass("animal");
    // Adding a data-attribute
    button.attr("data-name", animalArray[i]);
    // Providing the initial button text
    button.text(animalArray[i]);
    // Adding the button to the buttons-view div
    $("#animalButtons").append(button);
  }

};

renderButtons();

// Function for dumping the JSON content for each button into the div
function displayImages() {

	var animal = $(this).attr("data-name");
	var apiKey = "dc6zaTOxFJmzC";
	var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + animal +"";
  //var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats"
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          //$("#animals").html(JSON.stringify(response));
          console.log(response);

          // Saving the image_original_url property
          var imageUrl = response.data.image_original_url;

          // Creating and storing an image tag
          var animalImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          animalImage.attr("src", imageUrl);
          //animalImage.attr("alt", animal);

          // Prepending the catImage to the images div
          $("#animals").prepend(animalImage);

          renderButtons();
        });

};


/*
// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding the movie from the textbox to our array
        movies.push(movie);
        console.log(movies)

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
*/

// Function for displaying the movie info
//Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
$(document).on("click", ".animal", displayImages);

// Calling the renderButtons function to display the intial buttons
renderButtons();




