function sVacancySliders() {
    const sVcancySliders = document.querySelectorAll('[data-js="sVacancySlider"]');

    if(sVcancySliders.length < 1) return

    sVcancySliders.forEach(sVcancySlider => {
        let sVcancySliderEx = new Swiper(sVcancySlider, {
            slidesPerView: 'auto',
            spaceBetween: 20,
        })
    })

}