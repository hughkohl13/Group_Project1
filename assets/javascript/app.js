
// NEWS API 
const NEWS_API_EVERYTHING = "https://newsapi.org/v2/everything?";

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

function createNewsHeadline(node, item) {
    var row = document.createElement("div");
    row.className = "row";
    // var spacer1 = document.createElement("div");
    // spacer1.className = "articleBlock col-sm-2 col-md-2 col-lg-2";
    // row.appendChild(spacer1);

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
    var text = document.createElement("div");
    text.className = "headlineBlock col-sm-" + textColumns + "col-md-" + textColumns + " col-lg-" + textColumns;
    createNewsContent(text, item);
    row.appendChild(text);

    // var spacer2 = document.createElement("div");
    // spacer2.className = "articleBlock col-sm-1 col-md-1 col-lg-1";
    // row.appendChild(spacer2);
    
    node.appendChild(row);
}

function createNewsRow(node, items) {
    var row = document.createElement("div");
    row.className = "row";
    // var spacer1 = document.createElement("div");
    // spacer1.className = "articleBlock col-sm-2 col-md-2 col-lg-2";
    // row.appendChild(spacer1);

    for (var i = 0; i < items.length; i++) {
        createNewsItem(row, items[i]);
    }

    // var spacer2 = document.createElement("div");
    // spacer2.className = "articleBlock col-sm-1 col-md-1 col-lg-1";
    // row.appendChild(spacer2);
    
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

function createNewsContent(node, item) {
    var ellipsis = item.content.indexOf("…");
    if (ellipsis > 0) {
        node.appendChild(document.createTextNode(item.content.substring(0, ellipsis)));
        var link = document.createElement("a");
        link.appendChild(document.createTextNode("…"));
        link.href = item.url;
        node.appendChild(link);
    } else {
        node.appendChild(document.createTextNode(item.content));
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
