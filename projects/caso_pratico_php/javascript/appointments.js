var elNames = document.getElementsByTagName("input");
var consulta = elNames.item("consulta");
console.log(consulta.value);
console.log(document.querySelector("input[name='consulta']").value);

var toCancel =  document.querySelectorAll(".cancelAppoint");
toCancel.forEach(function(item) {
    item.addEventListener("change", function() {
        if(item.checked) {
            item.parentElement.submit();
        }
    });
});
