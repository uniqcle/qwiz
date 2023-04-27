const buttonsNext = document.querySelectorAll('[data-nav="next"]')
const buttonsPrev = document.querySelectorAll('[data-nav="prev"]')

// Перемещение вперед
buttonsNext.forEach(function (next) {
    next.addEventListener('click', function (e) {

        const thisCard = this.closest('[data-card]')
        let thisCardNumber = parseInt(thisCard.dataset.card);
        let nextCardNumber = thisCardNumber + 1;
        let nextCard = document.querySelector(`[data-card="${nextCardNumber}"]`)

        thisCard.classList.add('hidden')
        nextCard.classList.remove('hidden')

    })
});


// Перемещение назад 
buttonsPrev.forEach(function (prev) {
    prev.addEventListener('click', function (e) {
        const thisCard = this.closest('[data-card]')
        let thisCardNumber = parseInt(thisCard.dataset.card);

        let prevCardNumber = thisCardNumber - 1;
        let prevCard = document.querySelector(`[data-card="${prevCardNumber}"]`)

        thisCard.classList.add('hidden')
        prevCard.classList.remove('hidden')

    })
})