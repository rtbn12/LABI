
function minimal(){

    var result = document.getElementById("result");

    var mass = []

    for(var i = 1; i<6; i++ ){
        mass.push(parseFloat(document.getElementById("n" + i).value))
    }

    var minimalIndex=0

    for(var i = 1; i<6; i++ ){

        if(mass[i] < mass[minimalIndex]){
            minimalIndex = i
        }

    }

    if (minimalIndex == 0){

        result.value = "Первый ведённый элемент " +
            "(" + mass[minimalIndex] + ") минимален!"
    }else {

        result.value = "Предшествующее число ("
            + mass[minimalIndex-1] + "), минимальное число (" + mass[minimalIndex] + ")!"
    }
}