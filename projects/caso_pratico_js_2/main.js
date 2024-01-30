$(document).ready( function() {

    var movieArray = [];
    var watchedArray = [];
    var aa = 0;
    var bb = 0;

    function loadSuggestion() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'movies.json', true);

        xhr.onload = function() {
            if(this.status == 200) {
                var moviesJson = JSON.parse(this.responseText);

                /*
                  RANDOMIZE MOVIE - IMAGE, KEYWORDS AND EXCERPT
                */
                var poster = "url(images/image";
                var movie = Math.floor(Math.random() * moviesJson.length);
                poster += movie + 1 + '.jpg)';
                document.getElementById('randomImg').style.backgroundImage = poster;

                var keywords = "";
                a = movie;

                const infos = moviesJson[a].info;
                for (const [key, value] of Object.entries(infos)) {
                    keywords += `${value} `;
                }

                $('#keywords span').html("Keywords: " + keywords);

                $('#about').html(moviesJson[a].description);

                $('.title').html(moviesJson[a].name);


                /*
                  GIVING TITLE TO MOVIES IN THE GALLER
                */
                $( ".mtitle" ).empty(); // we erase the content so it won't duplicate every time the function runs
                for (i = 0; i < $('.img').length; i++) {
                    movieArray.push(moviesJson[i].name);
                    var text = document.createTextNode(movieArray[i]);
                    $(".mtitle")[i].append((text));
                }


                /*
                  REMEMBERING WATCHED MOVIES AND COLORING OF BUTTONS
                */
                function colorizeBtn() {
                    if (watchedArray.includes(moviesJson[a].name) == true) {
                        $('#markWatched').css('backgroundColor','rgb(78, 255, 133)');
                        $('#markNotWatched').css('backgroundColor','');
                    }
                    else {
                        $('#markWatched').css('backgroundColor','');
                        $('#markNotWatched').css('backgroundColor','rgb(217, 113, 59)');
                    }
                }

                $('#markWatched').on('click', function() {
                    if (watchedArray.includes(moviesJson[a].name) == false) {
                        watchedArray.push(moviesJson[a].name);
                        colorizeBtn();
                        upCounter();
                    }
                });
                $('#markNotWatched').on('click', function() {
                    const index = watchedArray.indexOf(moviesJson[a].name);
                    if (index > -1) {
                        watchedArray.splice(index, 1);
                    }
                    colorizeBtn();
                    downCounter();
                });
                colorizeBtn();

                aa = watchedArray.length;
                bb = moviesJson.length;

            }
            else if (this.status == 404) {
                console.log('error');
            }
        };

        xhr.onerror = function() {
            console.log('Request error');
        };
        xhr.send();
    };

    window.onload = loadSuggestion();


    /*
      MAKING ALL BUTTONS WORK
    */
    $('#showImgs').on("click", function() {
        $('.container').toggle('slow');
        $('.dailySuggestion').toggle('slow');
        $('.mtitle').css('visibility','hidden');
        $('.img').css('opacity','1');
        loadSuggestion();
    });

    $('.randomize').on('click', function() {
        loadSuggestion();
        if ($('.dailySuggestion').is(":hidden")) {
            $('.container').toggle('slow');
            $('.dailySuggestion').toggle('slow');
        }
    });

    $('#galleryWatched').on("click", function() {
        function toggle() {
            for (i = 0; i < $('.img').length; i++) {
                if (watchedArray.includes(movieArray[i]) == false) {
                    $('.img').eq(i).css('opacity','0.2');
                }
                else {
                    $('.img').eq(i).css('opacity','1');
                }
            }
        }

        if ($('.dailySuggestion').is(":hidden")) {
            toggle();
        }
        else {
            $('.container').toggle('slow');
            $('.dailySuggestion').toggle('slow');
            $('.mtitle').css('visibility','hidden');
            loadSuggestion();
            toggle();
        }
    });

    $('#galleryNotWatched').on("click", function() {
        function toggle() {
            for (i = 0; i < $('.img').length; i++) {
                if (watchedArray.includes(movieArray[i]) == true) {
                    $('.img').eq(i).css('opacity','0.2');
                }
                else {
                    $('.img').eq(i).css('opacity','1');
                }
            }
        }

        if ($('.dailySuggestion').is(":hidden")) {
            toggle();
        }
        else {
            $('.container').toggle('slow');
            $('.dailySuggestion').toggle('slow');
            $('.mtitle').css('visibility','hidden');
            loadSuggestion();
            toggle();
        }
    });

    $.each($('.img'), function(key, value) {
        $(value).on("mouseover", () => {
            $(value).children(".mtitle").eq(0).css('visibility','visible');
        });

        $(value).on("mouseout", () => {
            $(value).children(".mtitle").eq(0).css('visibility','hidden');
        });
    });


    /*
      ALERTS ON THE % OF MOVIES WATCHED
    */
    var counter = 0;
    function upCounter() {
        var percentage = (100 * aa) / bb;
        if (percentage >= 25 && percentage < 50 && counter == 0) {
            alert("25% watched!");
            counter += 1;
        }
        else if (percentage >= 50 && percentage < 75 && counter == 1) {
            alert("50% watched!");
            counter += 1;
        }
        else if (percentage >= 75 && percentage < 100  && counter == 2) {
            alert("75% watched!");
            counter += 1;
        }
        else if (percentage == 100 && counter == 3) {
            alert("100% watched!");
            counter += 1;
        }
    }

    function downCounter() {
        var percentage = (100 * aa) / bb;
        if (percentage >= 25 && percentage < 50 && counter == 1) {
            counter -= 1;
        }
        else if (percentage >= 50 && percentage < 75 && counter == 2) {
            counter -= 1;
        }
        else if (percentage >= 75 && percentage < 100 && counter == 3) {
            counter -= 1;
        }
        else if (percentage < 100 && counter == 4) {
            counter -= 1;
        }
    }

    /*
      ASKING FOR EMAIL TO RECEIVE NEWS
    */
    var newWindow;
    function openWindow() {
        newWindow = window.open('popup/popup.html', 'test', 'width=500,height=500,status=no,toolbar=no,top=300,left=300');
    }

    // setTimeout(() => {
    //     openWindow();
    // }, "3000");

});
