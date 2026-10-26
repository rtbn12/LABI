function sumValues() {

    var result = document.getElementById("result");

    var mass = [];

    var value = 1;

    for (var i = 1; i <= 11; i++) {
        if (document.getElementById("n" + i).value === "") {
            result.value = "Заполни все 11 полей!";
            return;
        }else{
            mass.push(Math.abs(parseFloat(document.getElementById("n" + i).value)));
        }
    }


    for(var i = 0; i < mass.length; i++) {
        value *= mass[i];
    }

    result.value = value;

}