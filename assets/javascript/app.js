// NEWS API 

var NEWS_API_EVERYTHING = "https://newsapi.org/v2/everything?";

function publishNews(topic, from, size, page) {
    from = formatDateForNewsAPI(from || new Date());
    size = size || 10;
    page = page || 1;
    var queryURL = NEWS_API_EVERYTHING + $.param({
        "q" : topic,
        "from" : "2018-11-06",
        "language" : "en",
        "sortBy" : "publishedAt",
        "apiKey" : "cbdf3130345f4553845f32254743d129",
        // "pageSize" : size,
        // "page" : page
    });
    return $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response) {
        console.log(response);
        console.log(response.articles);

    function createHeadlineBlock () {
        // create headline container
        var headlineBlock = $('<div>');
        $(headlineBlock).attr("class", "headlineBlock");

        // create image container inside headline
        var headlineImg = $('<img>');
        $(headlineImg).attr("src", response.articles[0].urlToImage);
        $(headlineImg).attr("class", "articleImg");

        // create text container inside headline
        var headlineText = $('<p>');
        $(headlineText).text(response.articles[0].description);
        console.log(response.articles[0].description);
        $(headlineBlock).append(headlineImg).append(headlineText);
        $('#headline').append(headlineBlock);
    };

    createHeadlineBlock(); 

    for(var i = 0; i < response.articles.length; i++) {
        function createNewsBlock() {
            var divBlock = $('<div>');
            $(divBlock).attr("class", "articleBlock");
            var divImg = $('<img>');
            $(divImg).attr("src", response.articles[i].urlToImage);
            $(divImg).attr("class", "articleImg");
            console.log(response.articles[i].urlToImage);
            var divText = $('<p>');
            $(divText).text(response.articles[i].description);
            console.log(response.articles[i].description);
            $(divBlock).append(divImg).append(divText);
            $('#newsSection').append(divBlock);
        };
    createNewsBlock(); 
    };

});
};

function formatDateForNewsAPI(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
};

function newsSearch() {
    publishNews(document.forms["searchForm"]["inputField"].value);
};

$(document).ready(function(){
publishNews("javascript");
});
