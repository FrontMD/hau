window.formsProcessors = {}; // Функция из данного объекта будет вызвана в случае успешной валидации формы. Значение атрибута data-formprocessor формы будут служить ключами для функций-обработчиков
window.formsSending = {}; // Хранилище индикаторов отправки для избежания повторной отправки
//window.formsProcessors должны добавляться в additional.js

//включать в formsProcessors в случае успешной отправки там, где это требуется
function defaultAfterSubmit(form, doReset){
    if(doReset===true){
        let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
        form.reset();

        //сбрасываем поле ФАЙЛ
        if(fileFields.length > 0) {
            fileFields.forEach(fileField => {
                let placeholderText = fileField.getAttribute('data-placeholder');
                let fileName = fileField.querySelector('[data-js="fileName"]');

                fileField.classList.remove('field-file--full');
                fileName.innerHTML = placeholderText;
            });
        }
    }

    //проверяем какой тип благодарности в форме и показываем его
    if(form.querySelector("[data-js='form-thanks']") !== null) {
        form.style.minHeight = form.offsetHeight + 'px'
        form.classList.add("form--sent")
    } else {
        thanksMessageShow();
    }
}

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
                const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

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
                            const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                            if(field.dataset.js === 'formSelect') {
                                field.closest('[data-js="formField"]').classList.remove('field--invalid')
                            }

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

					var submitFunctionKey = form.getAttribute('data-submit-function');
					if (typeof (submitFunctionKey) === 'string' && submitFunctionKey.length > 0) {
						try {
							window.formsProcessors[submitFunctionKey](form);
                            
						} catch (e) {
							alert('Обработчик формы не обнаружен');
						}
					} else {
						alert('Обработчик формы не указан');
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
    const numbers = form.querySelectorAll('input[data-type="number"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');

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

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
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
            showHideSubmitDocsBlocks(submitDocsForm)

            const radioTabs = submitDocsForm.querySelectorAll('[data-js="radioTab"]')

            radioTabs.forEach(radioTab => {
                radioTab.addEventListener('change', function() {
                    showHideSubmitDocsBlocks(submitDocsForm)
                })
            })

            const snilsTab = submitDocsForm.querySelector('[data-js="snils-tab"]')

            snilsTab.addEventListener('change', function() {
                showHideSubmitDocsBlocks(submitDocsForm)
            })
        })

        function showHideSubmitDocsBlocks(currentForm) {
            const blocks = currentForm.querySelectorAll('[data-js="formBlock"]')
            const formBtn = currentForm.querySelector('.form__submit')
            const formPrivacy = currentForm.querySelector('.form__privacy')

            blocks.forEach(block => {
                block.style.display = 'none'
                block.querySelectorAll('[data-js="formField"]').forEach(cField => {
                    cField.classList.remove('field--invalid')
                    if(cField.querySelector('input')) {
                        cField.querySelector('input').removeAttribute('required')
                    }
                    if(cField.querySelector('select')) {
                        cField.querySelector('select').removeAttribute('required')
                    }
                })
            })

            let levelEdValue = currentForm.querySelector('input[name="level-education"]:checked').value
            let citizenshipValue = currentForm.querySelector('input[name="citizenship"]:checked').value
            let snilsValue = currentForm.querySelector('input[data-js="snils-tab"]:checked') ? true : false

            if(levelEdValue === 'Нет') {
                currentForm.querySelector('[data-condition="ifLevelNo"]').style.display = 'flex'
                formBtn.style.display = 'none'
                formPrivacy.style.display = 'none'
            } else if(citizenshipValue === 'Да') {
                currentForm.querySelector('[data-condition="ifLevelYes"]').style.display = 'flex'
                currentForm.querySelector('[data-condition="ifCitizenshipYes"]').style.display = 'flex'
                formBtn.style.display = 'flex'
                formPrivacy.style.display = 'flex'
                currentForm.querySelector('[data-condition="ifLevelYes"]').querySelectorAll('input').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
                currentForm.querySelector('[data-condition="ifCitizenshipYes"]').querySelectorAll('select').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
                if(snilsValue) {
                    currentForm.querySelector('[data-condition="ifSnils"]').style.display = 'flex'
                    currentForm.querySelector('[data-condition="ifSnils"]').querySelectorAll('input').forEach(cInput => {
                        cInput.setAttribute('required', '')
                    })
                } else {
                    currentForm.querySelector('[data-condition="ifSnils"]').querySelectorAll('input').forEach(cInput => {
                        cInput.removeAttribute('required')
                    })
                }

            } else {
                currentForm.querySelector('[data-condition="ifLevelYes"]').style.display = 'flex'
                currentForm.querySelector('[data-condition="ifCitizenshipNo"]').style.display = 'flex'
                formBtn.style.display = 'flex'
                formPrivacy.style.display = 'flex'
                currentForm.querySelector('[data-condition="ifLevelYes"]').querySelectorAll('input').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
                currentForm.querySelector('[data-condition="ifCitizenshipNo"]').querySelectorAll('select').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
                if(snilsValue) {
                    currentForm.querySelector('[data-condition="ifSnils"]').style.display = 'flex'
                    currentForm.querySelector('[data-condition="ifSnils"]').querySelectorAll('input').forEach(cInput => {
                        cInput.setAttribute('required', '')
                    })
                } else {
                    currentForm.querySelector('[data-condition="ifSnils"]').querySelectorAll('input').forEach(cInput => {
                        cInput.removeAttribute('required')
                    })
                }
            }

            currentForm.querySelector('input[data-js="snils-tab"]').removeAttribute('required')
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
            const prevBtns = projectsForm.querySelectorAll('[data-js="formPrevStep"]')
            const nextBtns = projectsForm.querySelectorAll('[data-js="formNextStep"]')

            showHideProjectsBlocks(projectsForm)

            const projectPartnerTabs = projectsForm.querySelectorAll('[data-js="projectPartnerTab"]')

            projectPartnerTabs.forEach(projectPartnerTab => {
                projectPartnerTab.addEventListener('change', function() {
                    showHideProjectsBlocks(projectsForm)
                })
            })

            const projectProgressTabs = projectsForm.querySelectorAll('[data-js="projectProgressTab"]')

            projectProgressTabs.forEach(projectProgressTab => {
                projectProgressTab.addEventListener('change', function() {
                    showHideProjectsBlocks(projectsForm)
                })
            })

            const porposeStatusTabs = projectsForm.querySelectorAll('[data-js="porposeStatusTab"]')

            porposeStatusTabs.forEach(porposeStatusTab => {
                porposeStatusTab.addEventListener('change', function() {
                    showHideProjectsBlocks(projectsForm)
                })
            })

            const courseTabs = projectsForm.querySelectorAll('[data-tab="courseTab"]')

            courseTabs.forEach(courseTab => {
                $(courseTab).on('change', function() {
                    showHideProjectsBlocks(projectsForm)
                })
            })

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

                            agreementFieldInput.addEventListener('change', (e) => {
                                if(e.target.checked) {
                                    e.target.closest('[data-js="formProjectsModalAgreement"]').classList.remove('field--invalid')
                                } else {
                                    e.target.closest('[data-js="formProjectsModalAgreement"]').classList.add('field--invalid')
                                }
                            })

                            if(agreementFieldInput.checked) {
                                allowedToSwitch = true
                                agreementField.classList.remove('field--invalid')
                            } else {
                                agreementField.classList.add('field--invalid')
                            }
                            break;
                        case "partner":
                            let stepFields = currentStep.querySelectorAll("[data-js='formField']"),
                                errorCount = 0

                            stepFields.forEach(stepField => {
                                if(stepField.querySelector('input').hasAttribute('required')) {
                                    let stepFieldValue = stepField.querySelector('input').value
                                    let stepFieldName = stepField.querySelector('input').getAttribute('data-v-name')
                                    let stepFieldError = stepField.querySelector('[data-js="fieldError"]')

                                    if(stepFieldName == 'phone') {
                                        if(stepFieldValue.replace(/\D/g, "").length == 11) {
                                            stepField.classList.remove('field--invalid')
                                        } else {
                                            errorCount += 1
                                            stepField.classList.add('field--invalid')
                                            stepFieldError.innerHTML = 'Телефон введён неверно'
                                        }
                                    } else {
                                        if(stepFieldValue.length < 1) {
                                            errorCount += 1
                                            stepField.classList.add('field--invalid')
                                            stepFieldError.innerHTML = 'Поле обязательно для заполнения'
                                        } else {
                                            stepField.classList.remove('field--invalid')
                                        }
                                    }

                                    stepField.addEventListener('click', function() {
                                        stepField.classList.remove('field--invalid')
                                    })
                                }
                            })

                            if(errorCount == 0) {
                                allowedToSwitch = true
                            }
                            break;
                        case "project":
                            let stepFields2 = currentStep.querySelectorAll("[data-js='formField']"),
                                errorCount2 = 0

                                stepFields2.forEach(stepField => {
                                    
                                    let stepFieldInput = stepField.querySelector('input') ? stepField.querySelector('input') : stepField.querySelector('textarea') ? stepField.querySelector('textarea') : stepField.querySelector('select')

                                    if(stepFieldInput.hasAttribute('required')) {
                                        let stepFieldValue = stepFieldInput.value
                                        let stepFieldError = stepField.querySelector('[data-js="fieldError"]')
                                        if(stepFieldValue.length < 1) {
                                            errorCount2 += 1
                                            stepField.classList.add('field--invalid')
                                            stepFieldError.innerHTML = 'Поле обязательно для заполнения'
                                        } else {
                                            stepField.classList.remove('field--invalid')
                                        }
                                    }

                                    stepField.addEventListener('click', function() {
                                        stepField.classList.remove('field--invalid')
                                    })
                                })

                            if(errorCount2 == 0) {
                                allowedToSwitch = true
                            }
                            break;
                        default:
                            break;
                    }

                    if(allowedToSwitch) {
                        currentStep.classList.remove('active')
                        targetStep.classList.add('active')
                    }

                    
                })
            })

        })

        function showHideProjectsBlocks(currentForm) {
            const blocks = currentForm.querySelectorAll('[data-js="formBlock"]')

            blocks.forEach(block => {
                block.style.display = 'none'
                block.querySelectorAll('[data-js="formField"]').forEach(cField => {
                    cField.classList.remove('field--invalid')
                    if(cField.querySelector('input')) {
                        cField.querySelector('input').removeAttribute('required')
                    }
                    if(cField.querySelector('select')) {
                        cField.querySelector('select').removeAttribute('required')
                    }
                    if(cField.querySelector('textarea')) {
                        cField.querySelector('textarea').removeAttribute('required')
                    }
                })
            })

            let projectPartnerValue = currentForm.querySelector('input[name="project-partner"]:checked').value

            if(projectPartnerValue === 'Партнер' || projectPartnerValue === 'Заказчик') {
                let targetBlock = currentForm.querySelector('[data-condition="ifProjectHasPartner"]')
                targetBlock.style.display = 'flex'
                targetBlock.querySelectorAll('input').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
            }
            
            let projectProgressValue = currentForm.querySelector('input[name="project-in-progress"]:checked').value

            if(projectProgressValue === 'Да') {
                let targetBlock = currentForm.querySelector('[data-condition="ifProjectInProgress"]')
                targetBlock.style.display = 'flex'
                targetBlock.querySelectorAll('textarea').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
            }

            let projectStatusValue = currentForm.querySelector('input[name="project-proposer-status"]:checked').value

            if(projectStatusValue === 'Обучающийся университета') {
                let targetBlock = currentForm.querySelector('[data-condition="ifIsStudent"]')
                targetBlock.style.display = 'flex'
                targetBlock.querySelectorAll('input').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
                targetBlock.querySelectorAll('select').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })

                let courseTabValue = currentForm.querySelector('[data-tab="courseTab"]').value

                if(courseTabValue === "Бакалавриат") {
                    let targetBlock = currentForm.querySelector('[data-condition="ifUndergraduate"]')
                    targetBlock.style.display = 'flex'
                    targetBlock.querySelectorAll('select').forEach(cInput => {
                        cInput.setAttribute('required', '')
                    })
                } else {
                    let targetBlock = currentForm.querySelector('[data-condition="ifUndergraduate"]')
                    targetBlock.querySelectorAll('select').forEach(cInput => {
                        cInput.removeAttribute('required')
                    })
                }
            } else if(projectStatusValue === 'Сотрудник университета') {
                let targetBlock = currentForm.querySelector('[data-condition="ifIsEmployee"]')
                targetBlock.style.display = 'flex'
                targetBlock.querySelectorAll('input').forEach(cInput => {
                    cInput.setAttribute('required', '')
                })
            }

        }
    }

}