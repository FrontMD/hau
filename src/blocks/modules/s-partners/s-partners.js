function sPartnersSliders() {
    const sPartnersSliders = document.querySelectorAll('[data-js="sPartnersSlider"]');

    if(sPartnersSliders.length < 1) return

    sPartnersSliders.forEach(sPartnersSlider => {
        let sVcancySliderEx = new Swiper(sPartnersSlider, {
            slidesPerView: 3,
            spaceBetween: 0,
        })
    })

}