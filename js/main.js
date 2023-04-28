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

            navigate("next", thisCard)

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

    // console.log(result)
    let data = {
        question: question,
        answer: result
    }

    return data;
}

function saveAnswers(number, data) {
    answers[number] = data;
}