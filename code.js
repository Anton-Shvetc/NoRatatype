//  какие символы используются на первом уровне ? Пробел, j, f, k, d.

// для начала нам нужна наша формула генереции случайного числа
// function getRandomInt(max) {


//     console.log(Math.floor(Math.random() * Math.floor(max)));
// // return(Math.floor(Math.random() * Math.floor(max)));
//     // return Math.floor(max);

// }
// let lorem = 'Lorem Ipsum - это текст-"рыба".';
let i = 0;
let count_right = 0;

let errors_count = 0;
fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
    .then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(typeof (res[0]));
        let str_arr = res[0].split('')
        // let str_arr = lorem.split('')




        // console.log(str_arr.length);
        let colors = ['is-info', 'is-success', 'is-warning', 'is-danger', 'is-link'];
        //цвета фреймворка bulma, в которые мы будем красить наши кнопки
        //при каждой генерации мы будем назначать каждому символу свой цвет, что бы пользователь при печати не путался
        // let str_arr = ['H', 'e', 'l', 'l', 'o', ',', ' ', 'J', 'a', 'c', 'k'];

        let begin = document.querySelector(".start__title"); // здесь у нас надпись, которая приглашает пользователя нажать enter для начала игры. Потом она у нас должна пропасть
        let progress = document.getElementById("prog"); // здесь прогресс ошибок пользователя

        //теперь нужно отрисовать наши буковки

        function drawBoard() {




            //  baconIpsumOutput.innerHTML =  textLorem ;
            let buttons = document.querySelector('.buttons');
            for (let index = 0; index < str_arr.length; index++) { // в идеале этот показатель пользователь должен иметь возможность изменить. Разберем это во второй части нашей статьи
                // let rand = str_arr[index] // здесь у нас массив буковок и цифр одинаковый по длине, поэтому я выбрал цвета
                buttons.insertAdjacentHTML("beforebegin",
                    `<span class='game-button' id='${str_arr[index]}' >${str_arr[index]}</span>`);

            }


        }

        document.addEventListener('keydown', StartGame, {
            once: true
            //благодаря once у нас отрисовка вызывается только один раз
        });

        function StartGame(e) {

            if (e.key == "Enter") {

                findTIME()

                drawBoard(); //отрисовка
                let elements_arr = document.querySelectorAll(".game-button"); // Сократить, повторяется в функции press

                console.log(document.querySelectorAll(".game-button"))
                elements_arr[i].classList.add('active');
                // elements_arr[0].classList.add('active');
                begin.style.display = "none";
                mainGame(); // игра началась

            }
        }

        function mainGame() {
            document.addEventListener('keydown', press); //  я создал отдельную функцию, что бы была возможность ее останавливать
        }









        // let accuracy = 100 - (errors_count / str_arr.length) * 100;
        // console.log(accuracy);

        function press(e) {

            if ((count_right + 1) == str_arr.length) {
                // alert("Вы выйграли!");
                let errorEnd = document.getElementById('statistics__err').textContent;
                let accuracyEnd = document.getElementById('statistics__acc').textContent;
                let speedEnd = document.getElementById('statistics__speed').textContent;
                alert("Количество ошибок: " + errorEnd + "  " + "Точность: " + accuracyEnd + "  " + "Скорость: " + speedEnd);
                let win = confirm("Хотите попробовать еще?");
                if (win) {
                    document.location.reload();
                }
            }



            let elements_arr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки
            // let i = 0; // нам потребуется индивидуальный счетчик на каждую букву

            console.log(i);
            // console.log(elements_arr[i].id);
            // console.log(count_right);
            console.log(str_arr.length);


            // for (let i=0; i < elements_arr.length; i++){}
            if (e.key == elements_arr[i].id) {

                // elements_arr[i].classList.add('active');
                elements_arr[i].classList.add('hidden');
                elements_arr[i].classList.remove('error');
                elements_arr[i].classList.remove('active');
                // elements_arr[i].remove();
                i += 1;

                elements_arr[i].classList.add('active');
                // console.log(i);

                count_right++;





            } //  считаем правильные ответы
            else if (e.key == "Shift") { }

            else {


                errors_count++; // считаем ошибки
                // Выводит в консоль точность 
                let accuracy = 100 - (errors_count / str_arr.length) * 100
                document.getElementById('statistics__acc').innerHTML = `${accuracy.toFixed(2)} %`;
                console.log(100 - (errors_count / str_arr.length) * 100);
                document.getElementById('statistics__err').innerHTML = errors_count;
                elements_arr[i].classList.add('error');


                // progress.value = errors_count;
                if (errors_count > 20) {
                    findTIME()
                    console.log(m + ':' + s + '.');
                    let loose = confirm("Вы допустили много ошибок! Хотите попробовать еще раз поиграть?");

                    console.log(loose);
                    if (loose) {

                        // document.location.reload();
                    } else {
                        // здесь могла быть ваша реклама
                    }
                }
            }



        }




    });
