function abiturientamPromo() {
    const abiturientamPromoSliders = document.querySelectorAll('[data-js="abiturientamPromoSlider"]')

    if(abiturientamPromoSliders.length < 1) return

    abiturientamPromoSliders.forEach(abiturientamPromoSlider => {
        let abiturientamPromoSliderEx = new Swiper(abiturientamPromoSlider, {
            slidesPerView: 1.5,
            spaceBetween: 10,
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
                    
                }
            }
        })
    })
}
