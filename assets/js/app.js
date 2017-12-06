    
      // Initial array of people
      var topics = ["Wonder Woman", "Michelle Obama", "James Dean", "Lady Gaga", "Beyonce", "Elizabeth Warren", "Channing Tatum"];


      //Endpoint to be used to call to get people. Contains API key as a parameter and cats
    function displayGifs() {
      //This makes it so every time the button is clicked, it replaces what was there before.
      $("#gifs-appear-here").empty();

      var topic = $(this).attr("data-name")  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";
      
      //Create an AJAX call for the person button selected
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {

          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url)
            personImage.attr("data-animate", results[i].images.fixed_height.url)
            personImage.attr("data-state", "still")
            personImage.addClass("gifPush")
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    }
      
      // Function for displaying person data
      function renderButtons() {

        $("#person-view").empty();

        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each person in the array.
          var a = $("<button>");

          a.addClass("person");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#person-view").append(a);
        }
      }
  $( document ).ready(function() {

    // This function handles events where one button is clicked
      $("#add-person").on("click", function(event) {
        event.preventDefault();

        // This line will grab the text from the input box
        var person = $("#person-input").val().trim();

        console.log(person);
        topics.push(person);
        renderButtons();
      
      });
      // When the buttons are clicked, Gifs should appear.
      $(document).on("click", ".person", displayGifs);
      //This listener recognizes whether the Gif is still or animated and changes it to the oppososite.
      $(document).on("click", ".gifPush", function() {
        
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animated = $(this).attr("data-animate");

          if (state === "still") {

            $(this).attr("src", animated);
            
            $(this).attr("data-state", "animate");
          
          }else {

            $(this).attr("src", still);
            // console.log($(this));
            $(this).attr("data-state", "still")
          }

      });
  });

      renderButtons();
    
    // Next we need to grab 10 static GIFs and show them in the DOM