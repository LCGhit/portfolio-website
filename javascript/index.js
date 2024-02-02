$(document).ready(function() {

    getProjInfo = function(n) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/sites_info.json', true);

        xhr.onload = function() {
            if(this.status == 200) {
                var projInfo = JSON.parse(this.responseText);
                $(".hovered_img").remove();
                var output = "";
                for (i in projInfo[n]) {
                    if (projInfo[n][i] != "") {
                        output = output + "</br>"+i+"_ "+projInfo[n][i];
                    } else {
                        continue;
                    }
                }
                $("<span class='hovered_img'>"+output+"</span>").insertBefore($("img.project_"+(n+1)));
            }
            else if (this.status == 404) {
                $("<span class='hovered_img'>"+"info not found"+"</span>").insertBefore($("img.project_"+(n+1)));
            }
        };

        xhr.onerror = function() {
            console.log('Request error');
        };
        xhr.send();
    };

    function showSite(element) {
        var sharedClass = element.attr("class");
        $("#embeds").css({"display":"flex"});
        $("embed."+sharedClass).css({"display":"block", "width":"70vw"});
    }

    function hideSite(element) {
        $("#embeds").css({"display":"none"});
        element.css({"display":"none", "width":"0vw"});
    }

    $.each($(".click_to_embed"), function(key, value) {
        $(value).bind("mouseenter touchstart", function() {
            $(value).children("img").eq(0).css("opacity", "0.6");
            getProjInfo($(value).index());
        });

        $(value).bind("mouseleave touchend click", ".hovered_img", function() {
            $(".hovered_img").remove();
            $(value).children("img").eq(0).css("opacity", "1");
        });

        $(value).on("click", function() {
            showSite($(value).children("img").eq(0));
        });
    });



    $.each($(".embeded_site"), function(key, value) {
        $("#embeds").on("click", function(event) {
            hideSite($(value));
        });
    });


});
