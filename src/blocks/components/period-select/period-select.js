function periodSelect() {

    const periodSelects = document.querySelectorAll('[data-js="periodSelect"]')

    if(periodSelects.length < 1) return

    periodSelects.forEach(select => {
        selectClendarsInit(select)
    })
    
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