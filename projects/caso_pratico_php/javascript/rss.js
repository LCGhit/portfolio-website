/* ====
  NEW RSS
  ==== */
dbNews = function(n) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'noticias/getnews.php', true);
    xhr.onload = function() {
        if(this.status == 200) {
            var news_piece = eval(this.responseText);
            document.getElementById("box").innerHTML = "<h5>"+news_piece[n].title+"</h5>"+"<p>"+news_piece[n].body+"</p>"+"</br>"+"<p id='date'>"+news_piece[n].date;
        }
        else if(this.status == 400) {
            document.getElementById("box").innerHTML = "Notícia não encontrada...";
        }
    };
    xhr.onerror = function() {
        console.log('Request error');
    };
    xhr.send();
};



/* ========================
  GET THE NAMES FOR THE LINKS
  ======================== */
var newsLink = Array.from(document.getElementsByClassName("rss")[0].querySelectorAll('a'));
getLink = function(n) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'noticias/getnews.php', true);
    xhr.onload = function() {
        if(this.status == 200) {
            var news_piece = eval(this.responseText);
            var returnedVal = news_piece[n].title;
            newsLink[n].innerHTML = returnedVal;
        }
        else if(this.status == 400) {
            document.getElementById("box").innerHTML = "Notícia não encontrada...";
        }
    };
    xhr.onerror = function() {
        console.log('Request error');
    };
    xhr.send();
};
// the number of news pieces is limited to 5 by having only 5 "<a><a/>" to be populated with the most recent news (order by date) from the database.
for(const link of newsLink) {
    getLink(newsLink.indexOf(link));
}
// random newspiece as the website loads
function firstNews() {
    randomN = Math.floor(Math.random() * (5));
    dbNews(randomN);
};
firstNews();

/* =========
  PORTFOLIO
  ========= */
getInfo = function(n) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'users_tab/lightboxInfo.php', true);

    xhr.onload = function() {
        if(this.status == 200) {
            var work = this.responseText.split(";");
            var site = JSON.parse(work[n]);
            console.log(work);
            var output = "<br/><h4>Características:</h4> "+site.info+"<br/><h4>Tecnologia usada:</h4> "+site.technology+"<br/><h4>Conclusão (em dias):</h4> "+site.timeframe;

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

const images = document.querySelectorAll('.img');
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

// $(window).keydown(function(event) {
//     if(event.keyCode == 13) {
//         event.preventDefault();
//         return false;
//     }
// });

/* ================
  TOGGLE USER TAB
  ================ */

document.getElementById("login").addEventListener("click", function() {
    document.getElementById("tabs").style.display = "block";
});

document.getElementById("fechar").addEventListener("click", function() {
    document.getElementById("tabs").style.display = "none";
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

// function getNews() {
//     feed = "url" + Math.floor(Math.random() * (5) + 1);
//     load(eval(feed));
// }

// window.onload = getNews();


document.getElementById("orcamento").onchange = function() {calcPreco();};

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
    // var newWindow;
    // function openWindow() {
    //     newWindow = window.open('popup/popup.php', 'test', 'width=500,height=500,status=no,toolbar=no,top=300,left=300');
    // }
    // setTimeout(() => {
    //     openWindow();
    // }, "5000");
});
