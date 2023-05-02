const buttonsNext = document.querySelectorAll('[data-nav="next"]')
const buttonsPrev = document.querySelectorAll('[data-nav="prev"]')

var answers = {
    2: null,
    3: null,
    4: null,
    5: null
}

// Перемещение вперед
buttonsNext.forEach(function (next) {
    next.addEventListener('click', function (e) {

        const thisCard = this.closest('[data-card]')

        if (thisCard.dataset.validate == 'novalidate') {
            console.log('no validate')
            navigate("next", thisCard)
        } else {
            console.log('validate')

            const numberCard = parseInt(thisCard.dataset.card)

            saveAnswers(numberCard, getCardData(numberCard))

            if (isFilled(numberCard) && checkOnRequired(numberCard)) {
                navigate("next", thisCard)
            } else {
                alert('Необходимо ответить на вопрос!')
            }

        }



    })
});


// Перемещение назад 
buttonsPrev.forEach(function (prev) {
    prev.addEventListener('click', function (e) {
        const thisCard = this.closest('[data-card]')

        navigate("prev", thisCard)

    })
})



function navigate(direction, thisCard) {

    let thisCardNumber = parseInt(thisCard.dataset.card);

    let cardNumber = (direction === "next") ? thisCardNumber + 1 : thisCardNumber - 1;

    let card = document.querySelector(`[data-card="${cardNumber}"]`)

    thisCard.classList.add('hidden')
    card.classList.remove('hidden')
}

//Получение данных с карточки
function getCardData(numberCard) {
    /**
    {
        question: "Вопрос по HTML?",
        answer: [
                { name: "вопрос чекбокса", value: "значение вопроса чекбокса" },
                { name: "вопрос чекбокса", value: "значение вопроса чекбокса" }
            ]
    }
    */

    var question;
    var result = [];

    var currentCard = document.querySelector(`[data-card="${numberCard}"]`)

    question = currentCard.querySelector('[data-question]').innerText;

    /* radios */
    let radioInputs = currentCard.querySelectorAll('[type="radio"]')

    radioInputs.forEach(function (radio) {

        if (radio.checked) {
            result.push({
                name: radio.name,
                value: radio.value
            })
        }

    })

    /* checkboxes */
    let checkboxesInput = currentCard.querySelectorAll('[type="checkbox"]')

    checkboxesInput.forEach(function (checkbox) {

        if (checkbox.checked) {
            result.push({
                name: checkbox.name,
                value: checkbox.value
            })
        }
    })



    /* inputs */
    let inputsInput = currentCard.querySelectorAll('[type="text"], [type="email"], [type="number"]');

    inputsInput.forEach(function (input) {

        if (input.value.trim() !== '') {
            result.push({
                name: input.name,
                value: input.value
            })
        }
    })

    console.log(result)
    let data = {
        question: question,
        answer: result
    }

    return data;
}

function saveAnswers(number, data) {
    answers[number] = data;
}

// ф-ия провери на заполненность
function isFilled(numberCard) {
    if (answers[numberCard].answer.length > 0) return true
    return false;
}

//ф-ия проверки за корректную заполненность required input emails
function checkOnRequired(numberCard) {
    const currentCard = document.querySelector(`[data-card="${numberCard}"]`)
    const requiredFields = currentCard.querySelectorAll('[required]')
    const isValidArray = [];

    requiredFields.forEach(function (field) {
        //console.dir(field)

        if (field.type === "checkbox" && field.checked === false) {
            isValidArray.push(false)
        }

        if (field.type === 'email' && !validateEmail(field.value)) {
            isValidArray.push(false)
        }

    })

    if (isValidArray.indexOf(false) === -1) return true;
    return false

}


// Ф-я для проверки email
function validateEmail(email) {
    var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(email);
}

// Установка активности radios
document.querySelectorAll('.radio-group').forEach(function (group) {

    group.addEventListener('click', function (e) {

        let currentLabel = e.target.closest('label');

        if (currentLabel) {
            currentLabel.closest('.radio-group').querySelectorAll('label').forEach(function (item) {
                item.classList.remove('radio-block--active')
            })
        }
        currentLabel.classList.add('radio-block--active')
    })
})


document.querySelectorAll('.checkbox-block').forEach(function (currentCheckboxLable) {
    let checkbox = currentCheckboxLable.querySelector('[type="checkbox"]');

    checkbox.addEventListener('change', function (e) {
        console.log(checkbox)

        if (checkbox.checked) {
            currentCheckboxLable.classList.add('checkbox-block--active');
        } else {
            currentCheckboxLable.classList.remove('checkbox-block--active');
        }
    })


})

