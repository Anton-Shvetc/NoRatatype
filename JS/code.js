
let i = 0;
let countRight = 0;
let ErrorsCount = 0;
const GET_TEXT_URL = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'

fetch(GET_TEXT_URL)
    .then(res => res.json())
    .then(res => {

        let strArr = res[0].split('')

        let begin = document.querySelector(".start__title"); // надпись, которая приглашает пользователя нажать enter для начала игры. 


        function drawBoard() {

            let buttons = document.querySelector('.buttons');
            for (let index = 0; index < strArr.length; index++) {

                buttons.insertAdjacentHTML("beforebegin",
                    `<span class='game-button' id='${strArr[index]}' >${strArr[index]}</span>`);

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
                let elementsArr = document.querySelectorAll(".game-button"); // Сократить, повторяется в функции press


                elementsArr[i].classList.add('active');

                begin.style.display = "none";
                mainGame(); // игра началась

            }
        }

        function mainGame() {
            document.addEventListener('keydown', press); //  Отдельная функция, что бы была возможность останавливать
        }



        function press(e) {

            if ((countRight + 1) == strArr.length) {

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

            let elementsArr = document.querySelectorAll(".game-button");  // выбираем все созданные кнопки

            if (e.key == elementsArr[i].id) {


                elementsArr[i].classList.add('hidden');
                elementsArr[i].classList.remove('error');
                elementsArr[i].classList.remove('active');

                i += 1;

                elementsArr[i].classList.add('active');


                countRight++;

            }
            else if (e.key == "Shift") { }

            else {
                ErrorsCount++; // считаем ошибки

                let accuracy = 100 - (ErrorsCount / strArr.length) * 100
                document.getElementById('statistics__acc').innerText = `${accuracy.toFixed(2)} %`;
                document.getElementById('statistics__err').innerText = ErrorsCount;
                elementsArr[i].classList.add('error');
            }

        }

    });
