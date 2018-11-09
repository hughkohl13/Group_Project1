// NEWS API 
const NEWS_API_EVERYTHING = "https://newsapi.org/v2/everything?";

// Publishes news.
//
// Creates query url from parameters, queries news API, and creates 
// news items from response articles.
function publishNews(topic, from, size, page) {
    from = formatDateForNewsAPI(from || new Date());
    size = size || 10;
    page = page || 1;
    var queryURL = NEWS_API_EVERYTHING + $.param({
        "q" : topic,
        "from" : "2018-11-05",
        "language" : "en",
        "soryBy" : "publishedAt",
        "apiKey" : "cbdf3130345f4553845f32254743d129",
        "pageSize" : size,
        "page" : page
    });
    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(response) {
        console.log(response);
        createNews(response.articles);
    });
}

// Creates news elements in the DOM.
//
// Removes all children of headline and newsSection elements.
// Creates headline and newsSection children from items.
// Headline consists of the first item. If there are more items
// they fill news rows with at most 3 items per row.
function createNews(items) {
    var headline = document.getElementById("headline");
    var newsSection = document.getElementById("newsSection");
    removedChildren(headline);
    removedChildren(newsSection);
    if (items.length > 0) {
        createNewsHeadline(headline, items[0]);
    }
    for (var n = 1; n < items.length; n += 3) {
        createNewsRow(newsSection, items.slice(n, n + 3));
    }
}

// Creates news headline element under the given node.
function createNewsHeadline(node, item) {
    var row = document.createElement("div");
    row.className = "row";


    var textColumns = 9;
    if (item.urlToImage) {
        var divImg = document.createElement("div");
        divImg.className = "headlineBlock col-sm-3 col-md-3 col-lg-3";
        var img = document.createElement("img");
        img.className = "headlineImg";
        img.src = item.urlToImage;
        img.alt = item.description;
        img.title = item.title;
        divImg.appendChild(img);
        row.appendChild(divImg);

        textColumns -= 3;
    }

    var headline = document.createElement("div");
    headline.className = "headlineBlock col-sm-" + textColumns + "col-md-" + textColumns + " col-lg-" + textColumns;
 
    var titleText = document.createElement("div");
    titleText.className = "titleTxt";
    titleText.appendChild(document.createTextNode(item.title));
    
    var title = document.createElement("a");
    title.appendChild(titleText);
    title.href = item.url;

    headline.appendChild(title);

    if (item.author) {
        var author = document.createElement("div");
        author.className = "authorTxt";
        author.appendChild(document.createTextNode("by " + item.author));
        headline.appendChild(author);
    }
    
    var text = document.createElement("p");
    text.className = "articleTxt";
    createNewsContent(text, item);
    headline.appendChild(text);
    row.appendChild(headline);

    
    node.appendChild(row);
}

// Creates news row element under the given node.
function createNewsRow(node, items) {
    var row = document.createElement("div");
    row.className = "row";


    for (var i = 0; i < items.length; i++) {
        createNewsItem(row, items[i]);
    }


    
    node.appendChild(row);
}

// Create news item element under the given node.
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
    
    var titleText = document.createElement("div");
    titleText.className = "titleTxt";
    titleText.appendChild(document.createTextNode(item.title));
    
    var title = document.createElement("a");
    title.appendChild(titleText);
    title.href = item.url;

    div.appendChild(title);

    if (item.author) {
        var author = document.createElement("div");
        author.className = "authorTxt";
        author.appendChild(document.createTextNode("by " + item.author));
        div.appendChild(author);
    }
    
    var text = document.createElement("p");
    text.className = "articleTxt";
    createNewsContent(text, item);
    div.appendChild(text);

    node.appendChild(div);
}


function createNewsContent(node, item) {
    var content = item.content || item.description;
    var ellipsis = content.indexOf("…");
    if (ellipsis > 0) {
        node.appendChild(document.createTextNode(content.substring(0, ellipsis)));
        var link = document.createElement("a");
        link.appendChild(document.createTextNode("…"));
        link.href = item.url;
        node.appendChild(link);
    } else {
        node.appendChild(document.createTextNode(content));
    }
}

function formatDateForNewsAPI(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
}

function removedChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function newsSearch() {
    publishNews(document.forms["searchForm"]["inputField"].value);
}

$(document).ready(function() {
    publishNews("javascript");
});
