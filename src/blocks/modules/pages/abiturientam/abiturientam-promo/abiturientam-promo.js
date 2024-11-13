function abiturientamPromo() {
    const abiturientamPromoSliders = document.querySelectorAll('[data-js="abiturientamPromoSlider"]')

    if(abiturientamPromoSliders.length < 1) return

    abiturientamPromoSliders.forEach(abiturientamPromoSlider => {
        let abiturientamPromoSliderEx = new Swiper(abiturientamPromoSlider, {
            slidesPerView: 'auto',
            spaceBetween: 15,
        })
    })
}
