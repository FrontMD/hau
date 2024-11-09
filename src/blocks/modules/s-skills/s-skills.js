function sSkillsSliders() {
    const sSkillsSliders = document.querySelectorAll('[data-js="sSkillsSlider"]');

    if(sSkillsSliders.length < 1) return

    sSkillsSliders.forEach(sSkillsSlider => {
        let sSkillsSliderEx = new Swiper(sSkillsSlider, {
            slidesPerView: 'auto',
            spaceBetween: 25,
        })
    })

}