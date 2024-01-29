$("form").children("input, textarea").each( function(index) {
    console.log($(this).index());
    $(this).on('blur', () => {
        checkField(index);
    });
});

// $("textarea").on("blur", () => {
//     checkField(5);
// });

function checkField(num) {
    complete = "";
    switch(num) {
    case 0:
        var nome = /^[a-zA-Z]+$/;
        if(!nome.test(dadosContacto.contactNome.value)) {
            complete = "n";
            $("input[name='contactNome']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("input[name='contactNome']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }
        break;

    case 1:
        var apelido = /^[a-zA-Z]+$/;
        if(!apelido.test(dadosContacto.contactApelido.value)) {
            complete = "n";
            $("input[name='contactApelido']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("input[name='contactApelido']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }
        break;

    case 2:
        var telemovel = /^[0-9]{9,9}$/;
        if(!telemovel.test(dadosContacto.contactTelemovel.value)) {
            complete = "n";
            $("input[name='contactTelemovel']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("input[name='contactTelemovel']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }
        break;

    case 3:
        var email = /^.+\@.+\..+$/;
        if(!email.test(dadosContacto.contactEmail.value)) {
            complete = "n";
            $("input[name='contactEmail']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("input[name='contactEmail']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }
        break;

    case 4:
        var data = /^([1][0-9]|[2][0-9]|[3][0-1])\/([0][1-9]|[1][12])$/;
        if(!data.test(dadosContacto.contactData.value)) {
            complete = "n";
            $("input[name='contactData']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("input[name='contactData']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }

        break;

    case 5:
        var motivo = /^.+$/;
        if(!motivo.test(dadosContacto.contactMotivo.value)) {
            complete = "n";
            $("textarea[name='contactMotivo']").css({"border": "1px solid rgb(179, 0, 0)", "background-color": "white"});
        } else {
            $("textarea[name='contactMotivo']").css({"border-color": "", "background-color": "rgb(179, 255, 179)"});
        }
        break;
    }
}

$("#contactEnviar").on("click", function() {checkform();});
function checkform() {
    $("form").children("input, textarea").each( function(index) {
        checkField(index);
    });
    if(complete == "n") {
        alert("Dados incorretos");
    } else {
        if(confirm("Obrigado por nos contactar") == true) {
            document.getElementById("dadosContacto").submit();
        }
    }
};

/* ==============
  MAP
  ============== */
var showDirection;
function loadmap() {
    showDirection = new google.maps.DirectionsRenderer();
    var point = new google.maps.LatLng(38.733572717953415, -9.141140002274987);
    var options = {
        zoom:10,
        center:point,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapa"), options);

    var office = new google.maps.Marker({
        position: point,
        map: map,
        title: "O nosso escritório"
    });

    var descricao = new google.maps.InfoWindow({
        content: "Venha falar connosco!"
    });
    google.maps.event.addListener(office, 'click', function() {
        descricao.open(map, office);
    });

    showDirection.setMap(map);
    showDirection.setPanel(document.getElementById("rota"));
}

var routeService = new google.maps.DirectionsService();
function calculateRoute() {
    var aStart = document.getElementById("origem").value;
    var aDestination = document.getElementById("destino").value;
    var options = {
        origin: aStart,
        destination: aDestination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    routeService.route(options, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            showDirection.setDirections(response);
        }
    });
}

function goBack() {
    $('#link').css('display', 'block');
}
setTimeout(() => {
    goBack();
}, "2000");


window.onload = function() {loadmap();};
