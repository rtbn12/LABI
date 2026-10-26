function sumValues() {

    var result = document.getElementById("result");

    var mass = [];

    var value = 0;

    for (var i = 1; i <= 11; i++) {
        mass.push(Math.abs(parseInt(document.getElementById("n" + i).value)));
    }

    for(var i = 0; i < mass.length; i++) {
        value *= mass[i].value;
    }

    result.value =  "Результат произведения по модулю: " + value + " !";

}