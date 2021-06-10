//  какие символы используются на первом уровне ? Пробел, j, f, k, d.

// для начала нам нужна наша формула генереции случайного числа
// function getRandomInt(max) {

    
//     console.log(Math.floor(Math.random() * Math.floor(max)));
// // return(Math.floor(Math.random() * Math.floor(max)));
//     // return Math.floor(max);
    
// }
let lorem = 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Используется Lorem Ipsum.'

let str_arr = lorem.split('')

let colors = ['is-info', 'is-success', 'is-warning', 'is-danger', 'is-link'];
//цвета фреймворка bulma, в которые мы будем красить наши кнопки
//при каждой генерации мы будем назначать каждому символу свой цвет, что бы пользователь при печати не путался
// let str_arr = ['H', 'e', 'l', 'l', 'o', ',', ' ', 'J', 'a', 'c', 'k'];

let begin = document.querySelector(".begin"); // здесь у нас надпись, которая приглашает пользователя нажать enter для начала игры. Потом она у нас должна пропасть
let progress = document.getElementById("prog"); // здесь прогресс ошибок пользователя

//теперь нужно отрисовать наши буковки

function drawBoard() {
    let buttons = document.querySelector('.buttons');
    for (let index = 0; index < str_arr.length; index++) { // в идеале этот показатель пользователь должен иметь возможность изменить. Разберем это во второй части нашей статьи
        // let rand = str_arr[index] // здесь у нас массив буковок и цифр одинаковый по длине, поэтому я выбрал цвета
        buttons.insertAdjacentHTML("beforebegin",
            `<button class='game-button' id='${str_arr[index]}'>${str_arr[index]}</button>`);
    }
}

document.addEventListener('keydown', StartGame, {
    once: true
    //благодаря once у нас отрисовка вызывается только один раз
});

function StartGame(e) {
    if (e.key == "Enter") {
        drawBoard(); //отрисовка
        begin.style.display = "none";
        mainGame(); // игра началась
    }
}

function mainGame() {
    document.addEventListener('keydown', press); //  я создал отдельную функцию, что бы была возможность ее останавливать
}


var count_right = 0;

var errors_count = 0;

function press(e) {

    let elements_arr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки
    let i = 0; // нам потребуется индивидуальный счетчик на каждую букву

    if (e.key == elements_arr[0].id ) {
        elements_arr[0].classList.add('hidden');
        count_right++; //  считаем правильные ответы
    } else if (e.key == "Shift") {

    }
    
    else {
        errors_count++; // считаем ошибки
        progress.value = errors_count;
        if (errors_count > 10) {
            let loose = confirm("Game over! Хотите еще раз поиграть?"); 
            console.log(loose);
            if (loose) {
                document.location.reload();
            } else {
                // здесь могла быть ваша реклама
            }
        }
    }
    if (count_right == str_arr.length) {
        alert("Вы выйграли!");
        let win = confirm("Хотите поиграть еще?");
        if(win){
            document.location.reload();
        }
    }
}


