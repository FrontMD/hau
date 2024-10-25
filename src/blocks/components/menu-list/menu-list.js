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
                let targetItem = e.target

                if(targetItem.classList.contains('active')) return

                /*setTimeout(() => {

                }, 100)*/

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
            })
        })

    })
}