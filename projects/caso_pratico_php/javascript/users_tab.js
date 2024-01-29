// CHANGE LOGED USER'S INFO
var v1;
document.getElementById("changeName").addEventListener("keyup", function() {
    v1 = document.getElementById("changeName").value;
});

var v2;
document.getElementById("changeLastname").addEventListener("keyup", function() {
    v2 = document.getElementById("changeLastname").value;
});

var v3;
document.getElementById("changeUsername").addEventListener("keyup", function() {
    v3 = document.getElementById("changeUsername").value;
});

var v4;
document.getElementById("changeEmail").addEventListener("keyup", function() {
    v4 = document.getElementById("changeEmail").value;
});

var v5;
document.getElementById("changePhone").addEventListener("keyup", function() {
    v5 = document.getElementById("changePhone").value;
});

var v6;
document.getElementById("changePass").addEventListener("keyup", function() {
    v6 = document.getElementById("changePass").value;
});

document.getElementById("makeChange").addEventListener("click", function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = this.responseText.split(" ");
            for(i = 0; i < response.length; i++) {
                document.getElementById("currentData").children.item(i).innerHTML = response[i];
            };
        }
    };
    xmlhttp.open("GET", "users_tab/changes.php?v1=" + v1 + "&v2=" + v2 + "&v3=" + v3 + "&v4=" + v4 + "&v5=" + v5 + "&v6=" + v6, true);
    xmlhttp.send();

    document.getElementById("changeName").value = '';
    document.getElementById("changeLastname").value = '';
    document.getElementById("changeUsername").value = '';
    document.getElementById("changeEmail").value = '';
    document.getElementById("changePhone").value = '';
    document.getElementById("changePass").value = '';
});


// CHANGE CLIENT INFO
var vc1;
document.getElementById("changeClientName").addEventListener("keyup", function() {
    vc1 = document.getElementById("changeClientName").value;
});

var vc2;
document.getElementById("changeClientLastname").addEventListener("keyup", function() {
    vc2 = document.getElementById("changeClientLastname").value;
});

var vc3;
document.getElementById("changeClientUsername").addEventListener("keyup", function() {
    vc3 = document.getElementById("changeClientUsername").value;
});

var vc4;
document.getElementById("changeClientEmail").addEventListener("keyup", function() {
    vc4 = document.getElementById("changeClientEmail").value;
});

var vc5;
document.getElementById("changeClientPhone").addEventListener("keyup", function() {
    vc5 = document.getElementById("changeClientPhone").value;
});

var vc6;
document.getElementById("changeClientPass").addEventListener("keyup", function() {
    vc6 = document.getElementById("changeClientPass").value;
});
document.getElementById("makeClientChange").addEventListener("click", function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = this.responseText.split(" ");
            for(i = 0; i < response.length; i++) {
                document.getElementById("clientCurrentData").children.item(i).innerHTML = response[i];
            };
        }
    };
    xmlhttp.open("GET", "users_tab/client_changes.php?vc1=" + vc1 + "&vc2=" + vc2 + "&vc3=" + vc3 + "&vc4=" + vc4 + "&vc5=" + vc5 + "&vc6=" + vc6, true);
    xmlhttp.send();
    document.getElementById("changeClientName").value = '';
    document.getElementById("changeClientLastname").value = '';
    document.getElementById("changeClientUsername").value = '';
    document.getElementById("changeClientEmail").value = '';
    document.getElementById("changeClientPhone").value = '';
    document.getElementById("changeClientPass").value = '';
});
