function sPartners() {
    const sPartnersBlocks = document.querySelectorAll('[data-js="sPartners"]');
    
    if(sPartnersBlocks.length < 1) return
    
    sPartnersBlocks.forEach(sPartnersBlock => {

        const sPartnersSlider = sPartnersBlock.querySelector('[data-js="sPartnersSlider"]');
        const sPartnersSliderPrev = sPartnersBlock.querySelector('[data-js="sliderPrevBtn"]');
        const sPartnersSliderNext = sPartnersBlock.querySelector('[data-js="sliderNextBtn"]');

        let sPartnersSliderEx = new Swiper(sPartnersSlider, {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: sPartnersSliderNext,
                prevEl: sPartnersSliderPrev,
            },
            breakpoints: {
                1341: {
                    slidesPerView: 2,
                },
                1801: {
                    slidesPerView: 3,
                }
            }

        })
    })

}