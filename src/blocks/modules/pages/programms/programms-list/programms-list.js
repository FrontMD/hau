function programmsList() {
    const programmsLists = document.querySelectorAll('[data-js="programmsList"]')

    if(programmsLists.length < 1) return

    programmsLists.forEach(programmsList => {
        const toggleBtns = programmsList.querySelectorAll("[data-js='visualToggleBtn']")

        toggleBtns.forEach(toggleBtn => {
            toggleBtn.addEventListener('click', (e) => {

                e.preventDefault()
                e.stopPropagation()

                const clickedBtn = e.target.closest('[data-js="visualToggleBtn"]')
                const cards = programmsList.querySelectorAll('[data-js="programmCard"]')
                const targetMode = clickedBtn.dataset.mode

                if(targetMode == 'cards') {
                    if(programmsList.classList.contains('programms-list--cards')) return

                    toggleBtns.forEach(btn => {
                        btn.classList.remove('active')
                    })

                    clickedBtn.classList.add('active')
                    programmsList.classList.remove('programms-list--rows')
                    programmsList.classList.add('programms-list--cards')

                    cards.forEach(card => {
                        card.classList.remove('programm-card--row')
                    })

                } else if(targetMode == 'rows') {
                    if(programmsList.classList.contains('programms-list--rows')) return

                    toggleBtns.forEach(btn => {
                        btn.classList.remove('active')
                    })

                    clickedBtn.classList.add('active')
                    programmsList.classList.remove('programms-list--cards')
                    programmsList.classList.add('programms-list--rows')

                    cards.forEach(card => {
                        card.classList.add('programm-card--row')
                    })
                }
            })
        })
    })
}