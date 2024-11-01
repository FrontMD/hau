function periodSelect() {

    const periodSelects = document.querySelectorAll('[data-js="periodSelect"]')

    if(periodSelects.length < 1) return

    periodSelects.forEach(select => {
        selectClendarsInit(select)

        const header = select.querySelector('[data-js="periodSelectHeader"]')
        const selectModal = select.querySelector('[data-js="periodSelectCalendar"]')
        const close = select.querySelector('[data-js="periodSelectClose"]')

        header.addEventListener('click', () => {
            if(selectModal.classList.contains('active')) {
                selectClendarClose(selectModal)
            } else {
                selectClendarOpen(selectModal)
            }
        })

        close.addEventListener('click', () => {
            selectClendarClose(selectModal)  
        })
    })
    
}

function selectClendarOpen(modal) {
    modal.classList.add('active')
}

function selectClendarClose(modal) {
    modal.classList.remove('active')
}

function selectClendarsInit(selectBlock) {
    const periodSelectInputs = selectBlock.querySelectorAll('[data-js="periodSelectInput"]')

    if(periodSelectInputs.length < 1) return

    periodSelectInputs.forEach(input => {
        new AirDatepicker(input, {
            inline: true,
            range: true,
            multipleDatesSeparator: ' - '
        })
    })
}