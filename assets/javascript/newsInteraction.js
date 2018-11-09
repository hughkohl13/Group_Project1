$(document).ready(function(){

    // create wrapper div for thumbs up / thumbs down images
    function createThumbs (){
        var wrap = $('<div>');

        // add thumbs down image and append to wrap
        var thumbsDown = $('<img>');
        thumbsDown.attr("src", "http://pluspng.com/img-png/png-thumbs-down-512px-png-512.png")
        wrap.append(thumbsDown);
    
        // add thumbsUp image and append to wrap
        var thumbsUp = $('<img>');
        thumbsDown.attr("src", "http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/256/thumbs-up-icon.png")
        wrap.append(thumbsUp);
    
        // append wrap to newsDiv 
        articleblock.append(wrap);
    };

createThumbs();

});