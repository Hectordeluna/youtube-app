$(document).ready(function(){

    var next;
    var prev;

    $("#list").on( "click", "li", function( event ) {
        event.preventDefault();
        if (event.target.value === 'check') {
            $(this).find('p').css('text-decoration','line-through');
            $(this).css('background-color','#d8ffdc');
        } else if (event.target.value === 'delete') {
            $(this).remove();
        }
    });

    $("#next").on("click", function(event) {
        event.preventDefault();
        var value = $("#item").val();
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                key: "API",
                q: value,
                part: 'snippet',
                maxResults: 10,
                type: "video",
                pageToken: next,
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function(result) {
            },
        }).done(function(data) {
            prev = data["prevPageToken"];
            next = data["nextPageToken"];
            $("#prev").show();
            $("li").remove();
            data["items"].forEach(element => {
                console.log(JSON.stringify(element));
                var id = element["id"]["videoId"];
                var title = element["snippet"]["title"];
                var thumbnailLink = element["snippet"]["thumbnails"]["default"]["url"];
                var height = element["snippet"]["thumbnails"]["default"]["height"];
                var width = element["snippet"]["thumbnails"]["default"]["width"];

                $("#list").append("<li><a href='https://www.youtube.com/watch?v=" + id + "'><img src=" + thumbnailLink + " height ='" + height + "' width ='" + width + "'/></a><div class='description'><a href='https://www.youtube.com/watch?v=" + id + "'>" + title + "</a></div></li>");
            });
        });
    });

    $("#prev").on("click", function(event) {
        event.preventDefault();
        var value = $("#item").val();
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                key: "API",
                q: value,
                part: 'snippet',
                maxResults: 10,
                type: "video",
                pageToken: prev,
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function(result) {
            },
        }).done(function(data) {
            prev = data["prevPageToken"];
            if (typeof prev === "undefined") {
                $("#prev").hide();
            } else {
                $("#prev").show();
            }
            next = data["nextPageToken"];
            $("li").remove();

            data["items"].forEach(element => {
                console.log(JSON.stringify(element));
                var id = element["id"]["videoId"];
                var title = element["snippet"]["title"];
                var thumbnailLink = element["snippet"]["thumbnails"]["default"]["url"];
                var height = element["snippet"]["thumbnails"]["default"]["height"];
                var width = element["snippet"]["thumbnails"]["default"]["width"];

                $("#list").append("<li><a href='https://www.youtube.com/watch?v=" + id + "'><img src=" + thumbnailLink + " height ='" + height + "' width ='" + width + "'/></a><div class='description'><a href='https://www.youtube.com/watch?v=" + id + "'>" + title + "</a></div></li>");
            });
        });
    });

    $("#addItem").on("click", function(event) {
        event.preventDefault();
        var value = $("#item").val();
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                key: "API",
                q: value,
                part: 'snippet',
                maxResults: 10,
                type: "video",
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function(result) {
            },
        }).done(function(data) {
            $("li").remove();
            $("#prev").hide();
            next = data["nextPageToken"];
            data["items"].forEach(element => {
                console.log(JSON.stringify(element));
                var id = element["id"]["videoId"];
                var title = element["snippet"]["title"];
                var thumbnailLink = element["snippet"]["thumbnails"]["default"]["url"];
                var height = element["snippet"]["thumbnails"]["default"]["height"];
                var width = element["snippet"]["thumbnails"]["default"]["width"];

                $("#list").append("<li><a href='https://www.youtube.com/watch?v=" + id + "'><img src=" + thumbnailLink + " height ='" + height + "' width ='" + width + "'/></a><div class='description'><a href='https://www.youtube.com/watch?v=" + id + "'>" + title + "</a></div></li>");
            });
        });
    });

});