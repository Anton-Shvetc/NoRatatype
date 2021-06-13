
// Появится в следующих версиях 

const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
const rusUpper = rusLower.toUpperCase()

const rus = rusLower + rusUpper


const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode)

translate.addEventListener('keypress', function (e) {
    const char = getChar(e)
    if (rus.includes(char)) {

        alert('Смени раскладку')
    }
})