

// FUNCTIONAL PROGRAMMING
$(document).ready(function() {

// var news = $("#news");
// var weather = $("#mainNews");


// var queryGiphyURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";

//  // wikipedia api
// queryWikiURL = "https://en.wikipedia.org/api/rest_v1/page/summary/Cat";

// // google news api

// //NYT 
// var APIKey =  "20d92dce4276454fb20182dad5157970";
// var queryNYTURL = "https://www.nytimes.com";

// //NYT top stories
// var queryNYTURL2 = "http://api.nytimes.com/svc/topstories/v2/{section}.{response-format}?api-key={your-api-key}";

// NEWS API 
const NEWS_API_EVERYTHING = "https://newsapi.org/v2/everything?";

function publishNews(el, topic, from, size, page) {
    from = formatDateForNewsAPI(from || new Date());
    size = size || 10;
    page = page || 1;
    var queryURL = NEWS_API_EVERYTHING + $.param({
        "q" : topic,
        "from" : from,
        "language" : "en",
        "soryBy" : "publishedAt",
        "apiKey" : "cbdf3130345f4553845f32254743d129",
        "pageSize" : size,
        "page" : page
    });
    return $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response) {
        console.log(response);
        for (var n = 0; n < response.articles.length; n++) {
            el.appendChild(createNewsAtricle(response.articles[n]));
        }
    });
}

function createNewsAtricle(item) {
    var div = document.createElement("div");
    var title = document.createElement("a");
    title.appendChild(document.createTextNode(item.title));
    title.href = item.url;
    div.appendChild(title);
    var description = document.createElement("div");
    description.appendChild(document.createTextNode(item.description));
    div.appendChild(description);
    if (item.urlToImage) {
        var img = document.createElement("img");
        img.src = item.urlToImage;
        img.alt = item.description;
        img.title = item.title;
        div.appendChild(img);
    }
    return div;
}

function formatDateForNewsAPI(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
}

publishNews(document.getElementById("news"), "bitcoin");
});