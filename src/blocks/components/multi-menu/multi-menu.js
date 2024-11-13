function multiMenu() {
    const menus = document.querySelectorAll('[data-js="multiMenu"]')

    if(menus.length < 1) return
    
    
    menus.forEach(menu => {
        const menuListItems = menu.querySelectorAll('[data-js="multiMenuItem"]')
        const multiMenuLists = menu.querySelectorAll('[data-js="multiMenuList"]')
        const levelsCount = [...new Set(Array.from(multiMenuLists).map(item => item.dataset.level))].length
        const backBtns = menu.querySelectorAll('[data-js="multiMenuBack"]')

        menuListItems.forEach(menuListItem => {

            menuListItem.addEventListener('mouseenter', (e) => {
                let leaveTrigger = false

                menuListItem.addEventListener('mouseleave', leaveTriggerToggle)

                setTimeout(() => {
                    if(!leaveTrigger) {
                        
                        slideMenu(e.target)
                    }
                    menuListItem.removeEventListener('mouseleave', leaveTriggerToggle)
                }, 200)

                function leaveTriggerToggle() {
                    leaveTrigger = true
                }
            }) 

            menuListItem.addEventListener('touchend', (e) => {
                let targetEventItem = e.target
                let currentItem = targetEventItem.closest('[data-js="multiMenuItem"]')
                let currentList = targetEventItem.closest('[data-js="multiMenuList"]')
               
                let targetList = menu.querySelector(`[data-level="${parseInt(currentList.dataset.level) + 1}"][data-index="${currentItem.dataset.index}"]`)
                
                if(targetEventItem.closest('[data-js="multiMenuIcon"]') && targetList) {
                    e.preventDefault()
                    e.stopPropagation()
                    slideMenu(currentItem)
                }
            })
        })

        backBtns.forEach(backBtn => {
            backBtn.addEventListener('click', () => {
                let currentList = backBtn.closest('[data-js="multiMenuList"]')
                let targetLevel = parseInt(currentList.dataset.level) - 1
                let currentListIndex = parseInt(currentList.dataset.index)
                let targetList = menu.querySelector(`[data-js="multiMenuList"][data-level="${targetLevel}"] [data-js="multiMenuItem"][data-index="${currentListIndex}"]`).closest('[data-js="multiMenuList"]')

                console.log(targetList)

                if(targetList) {
                    targetList.classList.add('active')
                    currentList.classList.remove('active')

                    let currentActiveItem = currentList.querySelector('.active[data-js="multiMenuItem"]')
                    
                    if(currentActiveItem) {
                        currentActiveItem.classList.remove('active')
                    }
                }
                
            })
        })

        function slideMenu(targetItem) {

            if(targetItem.classList.contains('active')) return

            let windowsWidth = window.innerWidth
            let currentList = targetItem.closest('[data-js="multiMenuList"]')
            let currentLevelIndex = parseInt(currentList.dataset.level)
            let targetListIndex = targetItem.dataset.index
            let targetList = menu.querySelector(`[data-level="${currentLevelIndex + 1}"][data-index="${targetListIndex}"]`)
            let currentMenuListItems = currentList.querySelectorAll('[data-js="multiMenuItem"]')

            if(currentLevelIndex != levelsCount) {

                currentMenuListItems.forEach(item => {
                    item.classList.remove('active')
                })

                targetItem.classList.add('active')
            }

            if(windowsWidth < 769) {
                currentList.classList.remove('active')
            }

            multiMenuLists.forEach(list => {
                if(list.dataset.level > currentLevelIndex) {
                    list.classList.remove('active')

                    let activeItem = list.querySelector('.active[data-js="multiMenuItem"]')
                    
                    if(activeItem) {
                        activeItem.classList.remove('active')
                    }
                } 
            })

            if(targetList) {
                targetList.classList.add('active')
            }

        }

    })
}