$(document).ready(function() {

    // retrieve projects' name and technologies
    getProjInfo = function(n) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'json/sites_info.json', true);

        xhr.onload = function() {
            if(this.status == 200) {
                var projInfo = JSON.parse(this.responseText);
                $(".hovered_img").remove();
                var projectNumber = Object.keys(projInfo[n])[0]+"_ "+Object.values(projInfo[n])[0];
                var projectTech = Object.keys(projInfo[n])[1]+"_ "+Object.values(projInfo[n])[1];
                var output = "<p>"+projectNumber+"</p>"+"<p>"+projectTech+"<p/><button class=site_more_info>more info</button>";

                $("<span class='hovered_img'>"+output+"</span>").insertBefore($("img.project_"+(n+1)));

                // button shows more info about project
                $.each($(".site_more_info"), function(key, value) {
                    $(value).on("click", function() {
                        $("#further_proj_info").children().first().remove();
                        $("#further_proj_info").css({"height": "0", "width": "0", "visibility": "hidden"});
                        $("#further_proj_info").css({"height": "auto", "width": "100%", "visibility": "visible"});
                        $("#further_proj_info").append("<p>"+projectTech+"</p>");
                    });
                });

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

    // hovering the image or corresponding timestamp brings up information about the project over the image
    $.each($(".timestamp, .click_to_embed"), function(key, value) {
        $(value).bind("mouseenter touchstart", function() {
            equatedProject = $(".click_to_embed").eq($(value).index());
            equatedProject.children("img").eq(0).css("opacity", "0.6");
            getProjInfo(equatedProject.index());
        });
        $(value).bind("mouseleave touchend", function() {
            equatedProject = $(".click_to_embed").eq($(value).index());
            $(".hovered_img").remove();
            equatedProject.children("img").eq(0).css("opacity", "1");
        });

        $(value).on("click", function(e) {
            // if button is clicked, only sidebar with info is shown
            if($(e.target).is(".site_more_info")) {
                e.preventDefault();
            }
            else {
                equatedProject = $(".click_to_embed").eq($(value).index());
                showSite(equatedProject.index());
                $(".hovered_img").remove();
                equatedProject.children("img").eq(0).css("opacity", "1");
            }

        });

    });

    $("#embeds").on("click", function() {
        hideSite($(".embeded_site"));
    });

    $("#further_proj_info").on("click", function() {
        $("#further_proj_info").css({"height": "0", "width": "0", "visibility": "hidden"});
    });


});
