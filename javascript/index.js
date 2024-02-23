$(document).ready(function() {

    // retrieve projects' name and technologies
    getProjInfo = function(n) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/sites_info.json', true);

        xhr.onload = function() {
            if(this.status == 200) {
                var projInfo = JSON.parse(this.responseText);
                $(".hovered_img").remove();
                var output = Object.keys(projInfo[n])[0]+"_ "+Object.values(projInfo[n])[0]+"</br>"+Object.keys(projInfo[n])[1]+"_ "+Object.values(projInfo[n])[1]+"<br/><button>more info</button>";

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

    getProjectUrl = function(n) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/sites_info.json', true);

        xhr.onload = function() {
            if(this.status == 200) {
                var projSrc = JSON.parse(this.responseText);
                $("#embeds").append("<embed class='embeded_site' src='"+projSrc[n]["src"]+"'/>");
                $("embed.embeded_site").css({"display":"block", "width":"70vw"});
            }
            else if (this.status == 404) {
                $("#embeds").append("<embed class='embeded_site'>project not found");
            }
        };

        xhr.onerror = function() {
            console.log('Request error');
        };
        xhr.send();
    };


    function showSite(index) {
        $("#embeds").css({"display":"flex"});
        getProjectUrl(index);
    }

    function hideSite(element) {
        $("#embeds").css({"display":"none"});
        element.css({"display":"none", "width":"0vw"});
        $(".embeded_site").remove();

    }

    $.each($(".click_to_embed"), function(key, value) {
        $(value).bind("mouseenter touchstart", function() {
            $(value).children("img").eq(0).css("opacity", "0.6");
            getProjInfo($(value).index());
        });

        $(value).bind("mouseleave touchend", function() {
            $(".hovered_img").remove();
            $(value).children("img").eq(0).css("opacity", "1");
        });

        $(value).on("click", function() {
            showSite($(value).index());
            $(".hovered_img").remove();
            $(value).children("img").eq(0).css("opacity", "1");
        });
    });

    $("#embeds").on("click", function() {
        hideSite($(".embeded_site"));
    });

    // timeline hover simulates effect of project image hover
    $.each($(".timestamp"), function(key, value) {
        $(value).bind("mouseenter touchstart", function(){
            equatedProject = $(".click_to_embed").eq($(value).index());
            equatedProject.children("img").eq(0).css("opacity", "0.6");
            getProjInfo(equatedProject.index());
        });
        $(value).bind("mouseleave touchend", function() {
            equatedProject = $(".click_to_embed").eq($(value).index());
            $(".hovered_img").remove();
            equatedProject.children("img").eq(0).css("opacity", "1");
        });

        $(value).on("click", function() {
            equatedProject = $(".click_to_embed").eq($(value).index());
            showSite(equatedProject.index());
            $(".hovered_img").remove();
            equatedProject.children("img").eq(0).css("opacity", "1");
        });

    });

});
