function mainBurger() {
    const menuOpenBtn = document.querySelector('[data-js="mainBurgerOpen"]')
    const menu = document.querySelector('[data-js="mainBurgerMenu"]')

    if(!menuOpenBtn || !menu) return

    const menuCloseBtn = menu.querySelector('[data-js="mainBurgerClose"]')

    menuOpenBtn.addEventListener('click', () => {
        menu.classList.add('active')
        lockBody()
    })

    if(menuCloseBtn) {
        menuCloseBtn.addEventListener('click', () => {
            menu.classList.remove('active')
            unlockBody()
        })
    }
}