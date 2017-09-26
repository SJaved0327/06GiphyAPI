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

  $("#animals").empty();

	var animal = $(this).attr("data-name");
  console.log(animal);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&rating=pg";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);
          
          for (var i = 0; i < 10; i++){
            
            // Saving the image_original_url property
            var imageUrl = response.data[i].images.original_still.url;

            // Creating and storing an image tag
            var animalImage = $("<img>");

            // Setting the catImage src attribute to imageUrl
            animalImage.attr("src", imageUrl);
            //animalImage.attr("alt", animal);
            animalImage.attr("alt", animal);

            animalImage.attr("width", "30%");

            // Prepending the catImage to the images div
            $("#animals").prepend(animalImage);

          }

          renderButtons();
          

        });

};

// This function handles events where one button is clicked
$("#addAnimal").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding the movie from the textbox to our array
    animalArray.push(animal);
    console.log(animal)

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});


// Function for displaying the movie info
//Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
$(document).on("click", ".animal", displayImages);

// Calling the renderButtons function to display the intial buttons
renderButtons();




