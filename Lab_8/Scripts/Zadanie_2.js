class Flower{

    constructor(name, height, color) {
        this._name = name;
        this._height = height;
        this._color = color;
    }


    get name() {
        return this._name;
    }

    get height() {
        return this._height;
    }

    get color() {
        return this._color;
    }


    set name(value) {
        this._name = value;
    }

    set height(value) {
        this._height = value;
    }

    set color(value) {
        this._color = value;
    }
}

function generateFlower(){
    const flowersNames = ["Роза", "Хризантема", "Пион", "Тюльпан", "Орхидея",
        "Одуванчик", "Незабудка", "Лилия", "Жасмин", "Ирис"];
    const height_2 = Math.floor(Math.random() * (151 - 3) + 3) + " см";
    const color_2 = randomColor();
    const name_2 = flowersNames[Math.floor(Math.random() * flowersNames.length)];

    return new Flower(name_2, height_2, color_2);

}

function magic(){

const flowers = [];

for (var i = 0; i < 10; i++){

    const flower = generateFlower();
    flowers.push(flower);

    const name_input = document.getElementById("n" + i);
    const height_input = document.getElementById("h" + i);
    const color_input = document.getElementById("c" + i);

    name_input.value = flower.name;
    height_input.value = flower.height;
    color_input.value = flower.color;
}

}
