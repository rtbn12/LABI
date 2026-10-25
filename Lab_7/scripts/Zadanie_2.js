function factorial(value){

    var resultValue = 1

    if(value %2 == 0){

            for(var i = 2; i < value+1 ; i+=2){

                resultValue *= i;
            }

    }else {

        for(var i = 1; i < value+1 ; i+=2){

            resultValue *= i;
        }

    }

    document.getElementById("result").value = "n!! = " + resultValue;

}