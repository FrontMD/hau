function tabsBlockInit() {
    const tabsBlock = document.querySelector('[data-js="tabsBlock"]');

    if(!tabsBlock) return

    const slidesList = tabsBlock.querySelectorAll('[data-js="tabsBlockSlide"]')
    const tabsList = tabsBlock.querySelectorAll('[data-js="tabsBlockTab"]')

    tabsList.forEach(tab => {
        tab.addEventListener('click', e => {

            currentTab = e.target
            currentIndex = currentTab.dataset.index

            tabsList.forEach(iTab => {
                iTab.classList.remove('tabs-block__tab--active')
            })

            currentTab.classList.add('tabs-block__tab--active')

            slidesList.forEach((slide, index) => {
                if(index == currentIndex) {
                    slide.classList.add('tabs-block__slide--active')
                } else {
                    slide.classList.remove('tabs-block__slide--active')
                }
            })
        })
    })

}