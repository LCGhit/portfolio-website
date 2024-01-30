/* ====
  RSS
  ==== */
var url1 = 'https://webdesignledger.com/feed/';
var url2 = 'https://www.webdesignerdepot.com/feed/';
var url3 = 'https://webdesign.tutsplus.com/posts.atom';
var url4 = 'https://speckyboy.com/feed/';
var url5 = 'https://designshack.net/feed/';
var url6 = 'https://feeds.feedburner.com/CssTricks';

function load(feed) {
    $.ajax({
        url : "https://api.rss2json.com/v1/api.json?rss_url=" + feed,
        type : 'GET',
        success : function(data) {
            objeto_json = eval(data);
            var sentence = "";
            for (i = 0; i < objeto_json.items.length && i < 3; i++) {
                number = i+1;
                sentence = sentence + "<h3>"  + number + ": " + objeto_json.items[i].title +  "</h3>" + "<br/><br/>";
                sentence = sentence + objeto_json.items[i].description + "<hr><br/><br/>";
            }
            $("#box").html(sentence);
        },
        error : function(xhr, status) {
            alert('Ocorreu um erro');
        }
    });
}



/* =========
  PORTFOLIO
  ========= */
getInfo = function(n) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/info.json', true);

    xhr.onload = function() {
        if(this.status == 200) {
            var work = JSON.parse(this.responseText);

            var output = '</br>'+work[n].nome+'</br>'+work[n].features;

            $(".lightP").html(output);
        }
        else if (this.status == 404) {
            $(".lightP").html("Not found");
        }
    };

    xhr.onerror = function() {
        console.log('Request error');
    };
    xhr.send();
};

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('img');
images.forEach(image => {
    image.addEventListener('click', function() {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        const info = document.createElement('p');
        info.classList.add('lightP');
        n = $(".grid").children().index($(this));
        getInfo(n);
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
        lightbox.appendChild(info);
    });
});


lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
});







/* ================
  TOGGLE PORTFOLIO
  ================ */
$('#portfolio').on("click", function() {
    $('.news').toggle('slow');
    $('.galleryContainer').toggle('slow');
});

$('#home').on("click", function() {
    if($('.news').is(":hidden")){
        $('.news').toggle('slow');
        $('.galleryContainer').toggle('slow');
        getNews();
    }
});

function getNews() {
    feed = "url" + Math.floor(Math.random() * (5) + 1); // evitando que o math.random escolha 0
    load(eval(feed));
}

window.onload = getNews();


document.getElementById("orcamento").onchange = function() {calcPreco()};

/* ===============================
  ACEITAR APENAS NÚMEROS INTEIROS
  =============================== */
function requireN() {
    var number = /^\d*$/;
    if(!number.test(orcamento.prazo.value || $("input[name='prazo']").value == "")) {
        $("input[name='prazo']").css("border", "1px rgb(179, 0, 0) solid");
        return false;
    }
    else {
        $("input[name='prazo']").css("border", "");
        return true;
    }
}

/* ==============
  VERIFICAR FORM
  ============== */
function checkForm() {
    complete = "";
    var nome = /^[a-zA-Z]+$/;
    if(!nome.test(orcamento.nome.value)) {
        $("input[name='nome']").css("border", "1px rgb(179, 0, 0) solid");
        complete = "n";
    } else {
        $("input[name='nome']").css("border", "");
    }

    var apelido = /^[a-zA-Z]+$/;
    if(!apelido.test(orcamento.apelido.value)) {
        $("input[name='apelido']").css("border", "1px rgb(179, 0, 0) solid");
        complete = "n";
    } else {
        $("input[name='nome']").css("border", "");
    }

    var telemovel = /^[0-9]{9,9}$/;
    if(!telemovel.test(orcamento.telemovel.value)) {
        $("input[name='telemovel']").css("border", "1px rgb(179, 0, 0) solid");
        complete = "n";
    } else {
        $("input[name='nome']").css("border", "");
    }
}

/* ==============
  CALCULAR O PREÇO
  ============== */
function calcPreco() {
    basePreco = 0;
    for(i = 0; i < orcamento.base.length; i++) {
        if(orcamento.base[i].selected == true) {
            basePreco = orcamento.base[i].value;
        };
    };

    separadoresPreco = 0;
    $("input:checkbox").each(function() {
        if($(this).is(':checked')) {
            separadoresPreco = separadoresPreco + 400;
        }
    });

    meses = orcamento.prazo.value;
    mesPreco = meses * 100;
    desconto = parseFloat(subDesconto());
    function subDesconto() {
        desconto = meses * 0.05;
        if(desconto > 0.2) {
            desconto = 0.2;
        }
        return desconto;
    }
    console.log(`desconto de ${desconto}`);
    desconto = 1 - desconto;
    orcamento.estimativa.value = (eval(separadoresPreco) + eval(basePreco) + eval(mesPreco)) * desconto;

    requireN();
};

/* ==============
  SUBMIT
  ============== */
$("input[name='enviar']").on("click", () => {
    checkForm();
    var boxes = "n";
    $("form").children("input[type='checkbox']").each(function() {
        if($(this).is(':checked')) {
            boxes = "s";
        }
        return boxes;
    });

    if(requireN() == false || complete == "n") {
        alert("Há dados incorretos.");
    }
    else if(boxes == "n") {
        alert("Assinale pelo menos um separador");
    } else {
        alert("Entraremos em contacto brevemente!");
        $("#orcamento").submit();
    }
});

$(document).ready( function() {
    /* ==============
      POPUP WINDOW
      ============== */
    var newWindow;
    function openWindow() {
        newWindow = window.open('popup/popup.html', 'test', 'width=500,height=500,status=no,toolbar=no,top=300,left=300');
    }
    // setTimeout(() => {
    //     openWindow();
    // }, "5000");
});
