    
    function searchPlaceWeather(place) {
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + APIKey;    

    // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
        url: queryURL,
        method: "GET"
        })

        .then(function(response) {
            console.log(queryURL);
            console.log(response);

            // Transfer content to HTML
            $(".city").html("<h1>" + response.name + ", " + response.sys.country + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            var Fahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Fahrenheit);
            $(".temp").text("Temperature (F) " + Fahrenheit);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });
    };

    $(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });
    
        $('#dismiss, .overlay').on('click', function () {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });
    
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });

    $("#place-search").on("click", function(event) {
        event.preventDefault();
        var inputPlace = $("#place-input").val().trim();
        searchPlaceWeather(inputPlace);
    });
{/* <div class="city"></div>
<div class="wind"></div>
<div class="humidity"></div>
<div class="temp"></div> */}
