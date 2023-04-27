const buttonsNext = document.querySelectorAll('[data-nav="next"]')
const buttonsPrev = document.querySelectorAll('[data-nav="prev"]')

// Перемещение вперед
buttonsNext.forEach(function (next) {
    next.addEventListener('click', function (e) {

        const thisCard = this.closest('[data-card]')

        navigate("next", thisCard)

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