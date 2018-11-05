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
        if (response.articles.length > 0) {
            createNewsHeadline(response.articles[0]);
        }
        // for (var n = 1; n < response.articles.length; n += 3) {
        //     createNewsRow(response.articles.slice(n, n + 3));
        // }
    });
}

function createNewsHeadline(item) {
    console.log("creating headline");
    var row = document.createElement("div");
    row.className = "row";
    var spacer1 = document.createElement("div");
    spacer1.className = "articleBlock col-sm-2 col-md-2 col-lg-2";
    row.appendChild(spacer1);
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

        var text = document.createElement("div");
        text.className = "headlineBlock col-sm-6 col-md-6 col-lg-6";
        var elipsis = item.content.indexOf("…");
        text.appendChild(document.createTextNode(item.content.substring(0, elipsis)));
        var link = document.createElement("a");
        link.appendChild(document.createTextNode("…"));
        link.href = item.url;
        text.appendChild(link);
        row.appendChild(text);
    } else {
        var text = document.createElement("div");
        text.className = "headlineBlock col-sm-9 col-md-9 col-lg-9";
        var elipsis = item.content.indexOf("…");
        text.appendChild(document.createTextNode(item.content.substring(0, elipsis)));
        var link = document.createElement("a");
        link.appendChild(document.createTextNode("…"));
        link.href = item.url;
        text.appendChild(link);
        row.appendChild(text);
    }
    var spacer2 = document.createElement("div");
    spacer2.className = "articleBlock col-sm-1 col-md-1 col-lg-1";
    row.appendChild(spacer2);
    document.getElementById("headline").appendChild(row);
}

function createNewsArticle(item) {
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

function newsSearch() {
    var topic = document.forms["searchForm"]["inputField"].value;
    console.log("searching for " + topic);
    publishNews(document.getElementsByClassName("newsSection"), topic);
}

$(document).ready(function() {
    publishNews(document.getElementsByClassName("newsSection"), "javascript");
});
