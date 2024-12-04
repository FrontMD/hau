function validation() {
    customFormScripts()

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
                date: /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")
                        errorField.innerHTML = errorText
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")
                        errorField.innerHTML = errorText
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input');

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = name === "file" ? field.files : field.value;
                let spaceTrigger = name === "file" ? true : !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Email введён неверно').set()
                                }
                                break
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Телефон введён неверно').set()
                                }
                                break                              
                            case 'date':
                                if (valueField.length === 10 && valueField.match(dataReqexp.date)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Дата введена неверно').set()
                                }
                                break
                            case 'inn':
                                if (valueField.length === 10 || valueField.length === 12) {
                                    error(input).remove()
                                } else {
                                    error(input, 'ИНН введен неверно').set()
                                }
                                break
                            case 'kpp':
                                if (valueField.length === 9) {
                                    error(input).remove()
                                } else {
                                    error(input, 'КПП введен неверно').set()
                                }
                                break
                            case 'bik':
                                if (valueField.length === 9) {
                                    error(input).remove()
                                } else {
                                    error(input, 'БИК введен неверно').set()
                                }
                                break
                            case 'account':
                                if (valueField.length === 20) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Номер счёта введен неверно').set()
                                }
                                break
                            case 'file':
                                if (valueField.length > 0) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Поле обязательно для заполнения').set()
                                }
                                break
                            case 'checkbox':
                                if (field.checked) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Нужно обязательно согласиться').set()
                                }
                                break                            
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Поле обязательно для заполнения").set()
                                }
                        }
                    } else {
                        error(input, 'Поле обязательно для заполнения').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input')

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )
                            checkFields()
                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    const formData = new FormData(form);
                    let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
                    form.reset();

                    //сбрасываем поле ФАЙЛ
                    if(fileFields.length > 0) {
    
                        fileFields.forEach(fileField => {
                            let placeholderText = fileField.getAttribute('data-placeholder');
                            let fileName = fileField.querySelector('[data-js="fileName"]');
    
                            fileField.classList.remove('field-file--full');
                            fileName.innerHTML = placeholderText;
    
                        })
                    }

                    //порверяем какой тип благодарности в форме и показываем его
                    if(form.querySelector("[data-js='form-thanks']") !== null) {
                        form.style.minHeight = form.offsetHeight + 'px'
                        form.classList.add("form--sent")
                    } else {
                        thanksMessageShow();
                    }
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()
        })
    })
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const dates = form.querySelectorAll('input[data-type="date"]');
    const numbers = form.querySelectorAll('input[data-type="number"]')

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(dates.length > 0) {
        dates.forEach(date => {
            const dateMaskFormat =  '99.99.9999';
            const today = new Date()

            new AirDatepicker(date, {
                dateFormat: 'dd.MM.yyyy',
                minDate: today,
            })
    
            Inputmask({
                'mask': dateMaskFormat,
                'showMaskOnHover': false
            }).mask(date);

            date.addEventListener('input', dateMask)

        })
    }

    if(numbers.length > 0) {
        numbers.forEach(number => {
            number.addEventListener('input', function(e){
                let val = e.target.value.replace(/\D/g, "");
                this.value = val;
            })
        })
    }

    function dateMask(e) {

        let val = e.target.value.replace(/\D/g, "");

 

        if(val.length == 1 && parseInt(val) > 3) {
            val = '3'
        }

        if(val.length == 2 && parseInt(val) > 31) {
        val = '31'
        }

        if(val.length == 3 && parseInt(val.substring(2)) > 1) {
        val = val.slice(0, 2) + "1";
        }
        
        if(val.length == 4 && parseInt(val.substring(2)) > 12) {
        val = val.slice(0, 2) + "12";
        }

        if(val.length == 10 && parseInt(val.substring(8)) > 23) {
            val = val.slice(0, 8) + "23";
        }
        
        if(val.length == 12 && parseInt(val.substring(10)) > 59) {
            val = val.slice(0, 10) + "59";
        }
        
        this.value = val;
    }
}

function customFormScripts() {
    const submitDocsForms = document.querySelectorAll('[data-js="submitDocsForm"]')
    const seminarForms = document.querySelectorAll('[data-js="seminarForm"]')
    const projectsForms = document.querySelectorAll('[data-js="projectsForm"]')

    if(submitDocsForms.length > 0) {
        submitDocsForms.forEach(submitDocsForm => {
            showHideblocks(submitDocsForm)

            const radioTabs = submitDocsForm.querySelectorAll('[data-js="radioTab"]')

            radioTabs.forEach(radioTab => {
                radioTab.addEventListener('change', function() {
                    showHideblocks(submitDocsForm)
                })
            })

            const snilsTab = submitDocsForm.querySelector('[data-js="snils-tab"]')

            snilsTab.addEventListener('change', function() {
                showHideblocks(submitDocsForm)
            })
        })

        function showHideblocks(currentForm) {
            const blocks = currentForm.querySelectorAll('[data-js="formBlock"]')
            const formBtn = currentForm.querySelector('.form__submit')
            const formPrivacy = currentForm.querySelector('.form__privacy')

            blocks.forEach(block => {
                block.style.display = 'none'
            })

            let levelEdValue = currentForm.querySelector('input[name="level-education"]:checked').value
            let citizenshipValue = currentForm.querySelector('input[name="citizenship"]:checked').value
            let snilsValue = currentForm.querySelector('input[data-js="snils-tab"]:checked') ? true : false

            if(snilsValue) {
                currentForm.querySelector('[data-condition="ifSnils"]').style.display = 'flex'
            }


            if(levelEdValue === 'Нет') {
                currentForm.querySelector('[data-condition="ifLevelNo"]').style.display = 'flex'
                formBtn.style.display = 'none'
                formPrivacy.style.display = 'none'
            } else if(citizenshipValue === 'Да') {
                currentForm.querySelector('[data-condition="ifLevelYes"]').style.display = 'flex'
                currentForm.querySelector('[data-condition="ifCitizenshipYes"]').style.display = 'flex'
                formBtn.style.display = 'flex'
                formPrivacy.style.display = 'flex'
            } else {
                currentForm.querySelector('[data-condition="ifLevelYes"]').style.display = 'flex'
                currentForm.querySelector('[data-condition="ifCitizenshipNo"]').style.display = 'flex'
                formBtn.style.display = 'flex'
                formPrivacy.style.display = 'flex'
            }
        }
    }

    if(seminarForms.length > 0) {
        seminarForms.forEach(seminarForm => {
            const seminarNameBlock = document.querySelector('[data-js="seminarNameBlock"]')
            const seminarDateBlock = document.querySelector('[data-js="seminarDateBlock"]')

            if(seminarNameBlock) {
                let currentInput = seminarForm.querySelector('input[data-js="saminarName"]') 
                currentInput.value = seminarNameBlock.dataset.value
                currentInput.setAttribute('disabled', '')
            }

            if(seminarDateBlock) {
                let currentInput = seminarForm.querySelector('input[data-js="saminarDate"]')
                currentInput.value = seminarDateBlock.dataset.value
                currentInput.setAttribute('disabled', '')
            }
        })
    }

    if(projectsForms.length > 0) {
        projectsForms.forEach(projectsForm => {
            const stepsList = projectsForm.querySelectorAll('[data-js="formStep"]')
            const prevBtns = projectsForm.querySelectorAll('[data-js="formPrevStep"]')
            const nextBtns = projectsForm.querySelectorAll('[data-js="formNextStep"]')

            prevBtns.forEach(prevBtn => {
                prevBtn.addEventListener('click', function(){
                    let currentStep = this.closest('[data-js="formStep"]')
                    let targetStep = projectsForm.querySelector(`[data-js="formStep"][data-id="${parseInt(currentStep.dataset.id) - 1}"]`)

                    currentStep.classList.remove('active')
                    targetStep.classList.add('active')
                })
            })

            nextBtns.forEach(nextBtn => {
                nextBtn.addEventListener('click', function(){
                    let currentStep = this.closest('[data-js="formStep"]')
                    let targetStep = projectsForm.querySelector(`[data-js="formStep"][data-id="${parseInt(currentStep.dataset.id) + 1}"]`)
                    let currentStepName = currentStep.dataset.name
                    let allowedToSwitch = false

                    switch(currentStepName) {
                        case "desc":
                            let agreementField = currentStep.querySelector('[data-js="formProjectsModalAgreement"]'),
                                agreementFieldInput = agreementField.querySelector('input')

                            if(agreementFieldInput.checked) {
                                allowedToSwitch = true
                                agreementField.classList.remove('field--invalid')
                            } else {
                                agreementField.classList.add('field--invalid')
                            }
                            break;
                        case "partner":
                            allowedToSwitch = true
                            break;
                        case "project":
                            allowedToSwitch = true
                            break;
                        case "budget":
                            allowedToSwitch = true
                            break;
                        case "studentsNumber":
                            allowedToSwitch = true
                            break;
                    }

                    if(allowedToSwitch) {
                        currentStep.classList.remove('active')
                        targetStep.classList.add('active')
                    }

                    
                })
            })
        })
    }

}