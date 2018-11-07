// NEWS API 

var NEWS_API_EVERYTHING = "https://newsapi.org/v2/everything?";

function publishNews(topic, from, size, page) {
    from = formatDateForNewsAPI(from || new Date());
    size = size || 10;
    page = page || 1;
    var queryURL = NEWS_API_EVERYTHING + $.param({
        "q" : topic,
<<<<<<< HEAD
        "from" : date, //"2018-11-05",
=======
        "from" : "2018-11-06",
>>>>>>> 7b7f23ef16ef874a066326191ba2382404e8fdc6
        "language" : "en",
        "sortBy" : "publishedAt",
        "apiKey" : "cbdf3130345f4553845f32254743d129",
<<<<<<< HEAD
        "pageSize" : size,
        "page" : page
        //////////
=======
        // "pageSize" : size,
        // "page" : page
>>>>>>> 7b7f23ef16ef874a066326191ba2382404e8fdc6
    });
    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response) {
        console.log(response);
        console.log(response.articles);
        console.log(response.articles.description);
        console.log(response.articles.urlToImage);

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
            // create divBlock container
            var divBlock = $('<div>');
            $(divBlock).attr("class", "articleBlock");

            // create image container inside divBlock
            var divImg = $('<img>');
            $(divImg).attr("src", response.articles[i].urlToImage);
            $(divImg).attr("class", "articleImg");
            console.log(response.articles[i].urlToImage);

            // create text container inside divBlock
            var divText = $('<p>');
            $(divText).text(response.articles[i].description);
            console.log(response.articles[i].description);
            var linkTo = $('<img>');
            $(linkTo).attr("src", "assets/images/OpenNewTab.png")
            $(linkTo).attr("href", response.articles[i].url);
            $(linkTo).attr("class", "OpenTabImg");
            $(divBlock).append(divImg).append(divText).append(linkTo);
            $('#newsSection').prepend(divBlock);
        };
    createNewsBlock(); 
    };

<<<<<<< HEAD
    for (var i = 0; i < items.length; i++) {
        createNewsItem(row, items[i]);
    }

    var spacer2 = document.createElement("div");
    spacer2.className = "articleBlock col-sm-1 col-md-1 col-lg-1";
    row.appendChild(spacer2);
    
    node.appendChild(row);
}

function createNewsItem(node, item) {
    var textColumns = 3;
    var div = document.createElement("div");
    div.className = "articleBlock col-sm-" + textColumns + "col-md-" + textColumns + " col-lg-" + textColumns;
    if (item.urlToImage) {
        var divImg = document.createElement("div");
        var img = document.createElement("img");
        img.className = "articleImg";
        img.src = item.urlToImage;
        img.alt = item.description;
        img.title = item.title;
        divImg.appendChild(img);
        div.appendChild(divImg);
    }

    var author = document.createElement("div");
    author.class = "authorTxt";
    author.appendChild(document.createTextNode(item.author));

    var text = document.createElement("p");
    text.class = "articleTxt";
    createNewsContent(text, item);
    div.appendChild(text);

    node.appendChild(div);
}

//
function createNewsContent(node, item) {
    var ellipsis = item.content.indexOf("…");
    if (ellipsis > 0) {
        //create link 
        node.appendChild(document.createTextNode(item.content.substring(0, ellipsis)));
        var link = document.createElement("a");
        link.appendChild(document.createTextNode("…"));
        link.href = item.url;
        node.appendChild(link);
    } else {
        node.appendChild(document.createTextNode(item.content));
    }
}
=======
});
};
>>>>>>> 7b7f23ef16ef874a066326191ba2382404e8fdc6

function formatDateForNewsAPI(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
};

function newsSearch() {
    publishNews(document.forms["searchForm"]["inputField"].value);
};

$(document).ready(function(){
publishNews("javascript");
});
