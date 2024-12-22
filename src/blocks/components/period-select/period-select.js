function periodSelect() {

    const periodSelects = document.querySelectorAll('[data-js="periodSelect"]:not(.js-periodSelect-inited)')

    if(periodSelects.length < 1) return

    periodSelects.forEach(select => {
        select.classList.add('js-periodSelect-inited');
        selectClendarsInit(select)

        const header = select.querySelector('[data-js="periodSelectHeader"]')
        const selectModal = select.querySelector('[data-js="periodSelectCalendar"]')
        const close = select.querySelector('[data-js="periodSelectClose"]')
        const submit = select.querySelector('[data-js="periodSelectSubmit"]')
        const input = select.querySelector('[data-js="periodSelectInput"]')

        const sourceFormSelector = select.dataset.formSelector
        const sourceInputFromSelector = select.dataset.formInputDateFromSelector
        const sourceInputToSelector = select.dataset.formInputDateToSelector
        const sourceSubmitButtonSelector = select.dataset.formSubmitButtonSelector

        const sourceForm = document.querySelector(sourceFormSelector)
        const sourceSubmitButton = document.querySelector(sourceSubmitButtonSelector)
        const sourceInputFrom = document.querySelector(sourceInputFromSelector)
        const sourceInputTo = document.querySelector(sourceInputToSelector)

        header.addEventListener('click', function (event) {
            if(selectModal.classList.contains('active')) {
                selectClendarClose(selectModal)
            } else {
                selectClendarOpen(selectModal)
            }
        });
        close.addEventListener('click', function (event) {
            selectClendarClose(selectModal)
        });
        submit.addEventListener('click', function (event) {
            if(input && input.value && sourceInputFrom && sourceInputTo) {
                let datesArr = input.value.split(' - ')
                datesArr && datesArr[0] && (sourceInputFrom.value = datesArr[0])
                datesArr && datesArr[1] && (sourceInputTo.value = datesArr[1])


                if(sourceSubmitButton){
                    sourceSubmitButton.click()
                } else if(sourceForm) {
                    sourceForm.submit();
                }
            }
            selectClendarClose(selectModal)
        });
    })
    
}

function selectClendarOpen(modal) {
    modal.classList.add('active')
}

function selectClendarClose(modal) {
    modal.classList.remove('active')
}

function selectClendarsInit(selectBlock) {
    const periodSelectInputs = selectBlock.querySelectorAll('[data-js="periodSelectInput"]:not(.js-periodSelectInput-inited)')

    if(periodSelectInputs.length < 1) return

    periodSelectInputs.forEach(input => {
        input.classList.add('js-periodSelectInput-inited');
        new AirDatepicker(input, {
            inline: true,
            range: true,
            multipleDatesSeparator: ' - '
        })
    })
}