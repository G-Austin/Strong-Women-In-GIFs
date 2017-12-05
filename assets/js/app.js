    
      // Initial array of people
      var topics = ["Wonder Woman", "Michelle Obama", "Lady Gaga", "Beyonce", "Elizabeth Warren"];


      //Endpoint to be used to call to get people. Contains API key as a parameter and cats
    function displayGifs() {

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

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(personImage);

            $("#gifs-appear-here").append(gifDiv);
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

      renderButtons();
    
    // Next we need to grab 10 static GIFs and show them in the DOM