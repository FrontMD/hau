function abiturientamInfo() {
    const abiturientamInfoSliders = document.querySelectorAll('[data-js="abiturientamInfoSlider"]')

    if(abiturientamInfoSliders.length < 1) return

    abiturientamInfoSliders.forEach(abiturientamInfoSlider => {
        let abiturientamInfoSliderEx = new Swiper(abiturientamInfoSlider, {
            slidesPerView: 1.2,
            spaceBetween: 10,
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                }
            }
        })
    })
}
