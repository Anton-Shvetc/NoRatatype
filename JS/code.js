
let i = 0;
let count_right = 0;
let errors_count = 0;

fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
    .then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(typeof (res[0]));
        let str_arr = res[0].split('')

        let begin = document.querySelector(".start__title"); // надпись, которая приглашает пользователя нажать enter для начала игры. 


        function drawBoard() {

            let buttons = document.querySelector('.buttons');
            for (let index = 0; index < str_arr.length; index++) {

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

                findTIME();  // Старт секундомера для прорисовки времени

                drawBoard(); //отрисовка
                let elements_arr = document.querySelectorAll(".game-button"); // Сократить, повторяется в функции press

                console.log(document.querySelectorAll(".game-button"))
                elements_arr[i].classList.add('active');

                begin.style.display = "none";
                mainGame(); // игра началась

            }
        }

        function mainGame() {
            document.addEventListener('keydown', press); //  Отдельная функция, что бы была возможность останавливать
        }



        function press(e) {

            if ((count_right + 1) == str_arr.length) {

                let errorEnd = document.getElementById('statistics__err').textContent;
                let accuracyEnd = document.getElementById('statistics__acc').textContent;
                let speedEnd = document.getElementById('statistics__speed').textContent;
                alert("Количество ошибок: " + errorEnd + "  " + "Точность: " + accuracyEnd + "  " + "Скорость: " + speedEnd);
                findTIME()

                let win = confirm("Хотите попробовать еще?");
                if (win) {
                    document.location.reload();
                }
            }

            let elements_arr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки

            if (e.key == elements_arr[i].id) {


                elements_arr[i].classList.add('hidden');
                elements_arr[i].classList.remove('error');
                elements_arr[i].classList.remove('active');

                i += 1;

                elements_arr[i].classList.add('active');


                count_right++;

            }
            else if (e.key == "Shift") { }

            else {
                errors_count++; // считаем ошибки

                let accuracy = 100 - (errors_count / str_arr.length) * 100
                document.getElementById('statistics__acc').innerHTML = `${accuracy.toFixed(2)} %`;
                document.getElementById('statistics__err').innerHTML = errors_count;
                elements_arr[i].classList.add('error');

            }

        }

    });
