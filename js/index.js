let _playlist = [];

let delay = 200;

let quality = "large";

function circle() {

    $("#circle").addClass("active");

    if (selectedTags.length === 0) {

        let roll = Math.floor((Math.random() * 30) + 1);

        console.log(roll);

        for (let i = 0; i < roll; i++) {

            setTimeout(function(){

                next();

                //do what you need here
            }, i * delay);
        }

        // console.log($("#tag3").text());

        setTimeout(function() {

            select($("#tag3").text(), 3);

            playlist();

            //do what you need here
        }, roll * delay);

    } else {

        playlist();
    }
}

function playlist() {

    setTimeout(function() {
        $("#circle-big").addClass("active");
    }, 500);

    $.get(
        "/playlist",
        // encodeURIComponent
        {tags: selectedTags},
        function (playlist) {

            // console.log(playlist[0].url)

            play(playlist);

        }
    );
}

function play(playlist) {

    _playlist = playlist;

    $("#player").css("display", "block");

    $("#youtube").css("width", "360px");

    player.loadVideoById(playlist[0].url, 0, quality);

    $("#progress").addClass("show");

    $("#controls").css("display", "block");

    fillPlaylist(_playlist);

    console.log("PLAY");

    let timer = setInterval(function() {

        var playerCurrentTime = player.getCurrentTime();

        // console.log(playerTotalTime + "/" + playerCurrentTime)

        var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;

        // console.log(playerTimeDifference)

        $("#done").css("width", playerTimeDifference + "%");

    }, 1000);
}

function setSound() {

    if (player.getVolume() === 0) {

        player.setVolume(100);
        $("#sound").text("ON");

    } else {

        $("#sound").text("OFF");
        player.setVolume(0);
    }
}

function setBackground() {

    if (!$("body").hasClass("experimental")) {

        $("body").addClass("experimental");
        $("#background").text("ON");

    } else {

        $("body").removeClass("experimental");
        $("#background").text("OFF");
    }
}

function setQuality() {

    // small, medium, large, hd720, hd1080, highres or default

    if (quality === "large")
        quality = "medium";

    else quality = "large";

    $("#quality").text(quality);
}
