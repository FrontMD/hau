function menuList() {
    const menus = document.querySelectorAll('[data-js="multiMenu"]')

    if(menus.length < 1) return
    
    menus.forEach(menu => {
        const menuListItems = menu.querySelectorAll('[data-js="menuListItem"]')
        const levels = menu.querySelectorAll('[data-js="multiMenuLevel"]')
        const levelsCount = levels.length
        let menuLists = []

        for(let i = 1; i <= levelsCount - 1; i++) {
            menuLists.push(levels[i].querySelectorAll('[data-js="menuList"]'))
        }

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
                let targetItem = e.target

                let currentLevelBlock = targetItem.closest('[data-js="multiMenuLevel"]')
                let currentLevelIndex = currentLevelBlock.dataset.level

                if(targetItem.closest('[data-js="menuListIcon"]') && currentLevelIndex != levelsCount) {
                    e.preventDefault()
                    e.stopPropagation()
                    slideMenu(targetItem.closest('[data-js="menuListItem"]'), true)
                }
            })
        })

        function slideMenu(targetItem) {

            if(targetItem.classList.contains('active')) return

            let currentLevelBlock = targetItem.closest('[data-js="multiMenuLevel"]')
            let currentLevelIndex = currentLevelBlock.dataset.level
            let currentMenuListItems = currentLevelBlock.querySelectorAll('[data-js="menuListItem"]')

            if(currentLevelBlock.dataset.level != levelsCount) {

                currentMenuListItems.forEach(item => {
                    item.classList.remove('active')
                })

                targetItem.classList.add('active')
            }


            for(let i = currentLevelIndex - 1; i < menuLists.length; i++) {
                menuLists[i].forEach(list => {   
                    list.classList.remove('active')

                    let activeItem = list.querySelector('.active[data-js="menuListItem"]')
                    
                    if(activeItem) {
                        activeItem.classList.remove('active')
                    }
                })
            }

            if(menuLists[currentLevelIndex - 1]) {

                let currentList = Array.from(menuLists[currentLevelIndex - 1]).find(item => item.dataset.index == targetItem.dataset.index)

                if(currentList) {
                    currentList.classList.add('active')
                }
            }

            if(currentLevelIndex != levelsCount) {
                levels.forEach((level, index) => {
                    if(index == currentLevelIndex) {
                        level.classList.add('active')
                    } else {
                        level.classList.remove('active')
                    }
                })
            }
        }

    })
}