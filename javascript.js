
//---------- GLOBAL VARIABLES ----------//


//animalArray holds original array of animal choices
var animalArray = ["Sloth", "Hamster", "Kitty"];
console.log(animalArray);


//---------- FUNCTIONS ----------//


//renderButtons
//function for displaying animal buttons
function renderButtons() {

  //div empties out and removes all buttons
  $("#animalButtons").empty();

  //loop through array of animals to account for new additions
  //loop through array of animals to add buttons to div
  for (var i = 0; i < animalArray.length; i++){
    //create button tag for each button
    var button = $("<button>");
    //animal class added to each button
    button.addClass("animal");
    //name of the animal is added to each button as data-name
    button.attr("data-name", animalArray[i]);
    //name of animal is displayed as the text of each button
    button.text(animalArray[i]);
    //each new button is appended to the div
    $("#animalButtons").append(button);
  }

};


//displayImages
//function to display images associated with the data-name of button selected
function displayImages() {

  //div empties out and removes all images 
  $("#animals").empty();
  //animal variable stores data-name of the button selected
	var animal = $(this).attr("data-name");
  console.log(animal);

  //queryURL
  //search changes based on animal variable (data-name)
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=dc6zaTOxFJmzC&rating=pg";
        //ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);
          //loop through 10 times to generate 10 images
          for (var i = 0; i < 10; i++){
            //imageURL stores the url of the still image of gif
            var imageURL = response.data[i].images.original_still.url;
            //image tag is created to hold image
            var animalImage = $("<img>");
            //image tag receives src attribute
            //src = imageURL
            animalImage.attr("src", imageURL);
            //image tag receives alt attribute
            //alt = animal
            animalImage.attr("alt", animal);
            //image tag receives size attribute
            //width = 30% of container
            animalImage.attr("width", "30%");
            //images are prepened to the animals div
            $("#animals").prepend(animalImage);
          }
          //populate buttons
          //call renderButtons function
          renderButtons();
          
        });

};


//---------- CLICK EVENTS ----------//


//when user inputs an animal, it is added as a button
//when addAnimal submit button is clicked:
$("#addAnimal").on("click", function(event) {

    event.preventDefault();

    //animal variable stores input value from user
    var animal = $("#animal-input").val().trim();

    console.log(animal)

    //animal (input value) is pushed into the animalArray
    animalArray.push(animal);
    
    //populate buttons
    //call renderButtons function
    renderButtons();

});


//on the window:
//when any button with animal class is clicked, displayImages function is called
$(document).on("click", ".animal", displayImages);


//---------- ON PAGE LOAD ----------//


//populate buttons
//call renderButtons function
renderButtons();
