function sPartners() {
    const sPartnersBlocks = document.querySelectorAll('[data-js="sPartners"]');
    
    if(sPartnersBlocks.length < 1) return
    
    sPartnersBlocks.forEach(sPartnersBlock => {

        const sPartnersSlider = sPartnersBlock.querySelector('[data-js="sPartnersSlider"]');
        const sPartnersSliderPrev = sPartnersBlock.querySelector('[data-js="sliderPrevBtn"]');
        const sPartnersSliderNext = sPartnersBlock.querySelector('[data-js="sliderNextBtn"]');

        let sPartnersSliderEx = new Swiper(sPartnersSlider, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            navigation: {
                nextEl: sPartnersSliderNext,
                prevEl: sPartnersSliderPrev,
            }
        })
    })

}