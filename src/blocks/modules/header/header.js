function headerHeight() {
    const header = $('[data-js="siteHeader"]');
    const initScroll = $(window).scrollTop();

    if(initScroll > 50) {
        header.addClass("site-header--small");
    }

    $(window).scroll(function() {
        const scroll = $(window).scrollTop();

        if(scroll > 110) {
            header.addClass("site-header--small");
        } else {
            header.removeClass("site-header--small");
        }
    });
}

function headerMenu() {
    const siteHeaderMenu = document.querySelector('[data-js="siteHeaderMenu"]')
    const headerMenuBtns = document.querySelectorAll('[data-js="headerMenuBtn"]')

    if(!siteHeaderMenu || headerMenuBtns.length < 1) return

    
    headerMenuBtns.forEach(headerMenuBtn => {
        headerMenuBtn.addEventListener('click', (e) => {

            e.preventDefault()
            e.stopPropagation()

            let clickedBtn = e.target.closest('[data-js="headerMenuBtn"]')
            const siteHeaderMenuItems = siteHeaderMenu.querySelectorAll('[data-js="multiMenu"]')

            if(clickedBtn.classList.contains('active')) {
                unlockBody()
                clickedBtn.classList.remove('active');
                siteHeaderMenu.classList.remove('active');

                siteHeaderMenuItems.forEach(item => {
                    item.classList.remove('active')
                })
            } else {
                let targetMenuItem = siteHeaderMenu.querySelector(`[data-js="multiMenu"][data-id="${clickedBtn.dataset.menu}"]`)

                if(!targetMenuItem) return

                lockBody()

                headerMenuBtns.forEach(item => {
                    item.classList.remove('active')
                })
                
                clickedBtn.classList.add('active');

                siteHeaderMenuItems.forEach(item => {
                    item.classList.remove('active')
                })

                targetMenuItem.classList.add('active');
                siteHeaderMenu.classList.add('active');
            }

        })
    })
}