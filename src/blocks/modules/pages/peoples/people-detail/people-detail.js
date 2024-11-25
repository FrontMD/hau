function peopleDetail() {
    const peopleDetails = document.querySelectorAll('[data-js="peopleDetail"]')

    if(peopleDetails.length < 1) return

    const showMoreBtnLayout = `                                
                                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.748341 9.86383L2.8571 12.1503L6.60429 8.69424L9.14477 6.35118L7.03605 4.06472L3.28711 0L0.746637 2.34306L4.49554 6.40782L0.748341 9.86383Z" fill="currentColor"/>
                                </svg>
                                <span class="show-more">
                                показать все
                                </span>
                                <span class="show-less">
                                    скрыть
                                </span>
                            `

    peopleDetails.forEach(peopleDetail => {
        const peopleDetailImg = peopleDetail.querySelector('[data-js="peopleDetailImg"]')
        const peopleDetailContent = peopleDetail.querySelector('[data-js="peopleDetailContent"]')
        const peopleDetailTitle = peopleDetail.querySelector('[data-js="peopleDetailTitle"]')
        const peopleDetailInfo = peopleDetail.querySelector('[data-js="peopleDetailInfo"]')
        const infoRealHeight = peopleDetailInfo.offsetHeight
        
        if(peopleDetailContent.offsetHeight > peopleDetailImg.offsetHeight) {

            const targetMaxHeight = peopleDetailImg.offsetHeight - peopleDetailTitle.offsetHeight - parseInt(getComputedStyle(peopleDetailContent)['padding-top']) - parseInt(getComputedStyle(peopleDetailContent)['padding-bottom']) - 60;

            peopleDetailInfo.style.maxHeight =  targetMaxHeight + 'px';

            let showMoreBtn = document.createElement('button');
            showMoreBtn.innerHTML = showMoreBtnLayout;
            showMoreBtn.setAttribute('type', 'button')
            showMoreBtn.setAttribute('class', 'people-detail__showmore')
            showMoreBtn.setAttribute('data-js', 'peopleDetailShowMore')

            peopleDetailContent.classList.add('collapsed')
            peopleDetailContent.appendChild(showMoreBtn)

            showMoreBtn.addEventListener('click', () => {
                if(peopleDetailContent.classList.contains('collapsed')) {
                    peopleDetailContent.classList.remove('collapsed')
                    peopleDetailInfo.style.maxHeight = infoRealHeight + 'px'
                } else {
                    peopleDetailInfo.style.maxHeight = targetMaxHeight + 'px'
    
                    setTimeout(() => {
                        peopleDetailContent.classList.add('collapsed')
                    }, 200)
                }
            }) 
        }

    })
}