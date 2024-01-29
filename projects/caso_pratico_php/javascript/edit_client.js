// DIVS TO WHICH THE BUTTONS CORRESPOND
const noticias = document.getElementById("noticias");
const table = document.getElementById("table_div");
const client = document.getElementById("client");
const portfolio = document.getElementById("portfolio_tab");

// INVISIBLE BUTTONS
const pick_news = document.getElementById("pick_news");
const pick_data = document.getElementById("pick_data");
const pick_client = document.getElementById("pick_client");
const pick_portfolio = document.getElementById("pick_portfolio");

// THE BUTTONS LABELS
const pick_news_label = document.getElementById("pick_news_label");
const pick_data_label = document.getElementById("pick_data_label");
const pick_client_label = document.getElementById("pick_client_label");
const pick_portfolio_label = document.getElementById("pick_portfolio_label");

function correctDisplay() {
    if(document.getElementById("clientInfo")) {
        noticias.style.display = 'none';
        table.style.display = 'none';
        portfolio.style.display = 'none';
    }
}
correctDisplay();

document.getElementById("selectClient").addEventListener("change", function() {
    document.getElementById("getClientInfo").submit();});

// CHANGE DIVS VISIBILITY AND LABELS COLOR
var tab = [pick_news, pick_data, pick_client, pick_portfolio];
tab.forEach(element => element.addEventListener("click", function() {
    var stuff = document.getElementsByClassName("pick_tab_label");
    for(item of stuff) {
        item.style.background = '';
    }
    element.nextElementSibling.style.background = 'rgb(0, 179, 143)';
    if(element === pick_news) {
        noticias.style.display = 'block';
        table.style.display = 'none';
        client.style.display = 'none';
        portfolio.style.display = 'none';
    } else if (element === pick_data) {
        table.style.display = 'block';
        noticias.style.display = 'none';
        client.style.display = 'none';
        portfolio.style.display = 'none';
    } else if (element === pick_client) {
        client.style.display = 'block';
        noticias.style.display = 'none';
        table.style.display = 'none';
        portfolio.style.display = 'none';
    } else if (element === pick_portfolio) {
        portfolio.style.display = 'block';
        noticias.style.display = 'none';
        table.style.display = 'none';
        client.style.display = 'none';
    }

})
           );
