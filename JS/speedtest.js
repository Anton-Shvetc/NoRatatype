function trim(string) { return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, ''); }
let init = 0;
let startDate;
let clocktimer;

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.clockform.clock.value = '00:00:00.00';
    document.clockform.label.value = '';
}

function clearALL() {
    clearFields();
    document.getElementById('marker').innerHTML = '';
}

function startTIME() {
    let thisDate = new Date();
    let t = thisDate.getTime() - startDate.getTime();
    t = Math.floor(t / 1000);
    let s = t;
    if (s < 10) s = '0' + s;
    if (init == 1) document.clockform.clock.value = s + '.';
    clocktimer = setTimeout("startTIME()", 10);
    let speed = 60 / s * i;
    document.getElementById('statistics__speed').innerHTML = `${speed.toFixed(0)} зн./мин`

}

function findTIME() {
    if (init == 0) {
        startDate = new Date();
        startTIME();
        init = 1;

    }
    else {
        let str = trim(document.clockform.label.value);
        document.getElementById('marker').innerHTML = (str == '' ? '' : str + ': ') +
            document.clockform.clock.value + '<br>' + document.getElementById('marker').innerHTML;
        // console.log(str == '' ? '' : str + ': ')

        clearFields();
    }
}