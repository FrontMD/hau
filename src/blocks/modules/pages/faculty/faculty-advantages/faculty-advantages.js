function facultyAdvantagesSliders() {
    const facultyAdvantagesSliders = document.querySelectorAll('[data-js="facultyAdvantagesSlider"]');

    if(facultyAdvantagesSliders.length < 1) return

    facultyAdvantagesSliders.forEach(facultyAdvantagesSlider => {
        let facultyAdvantagesSliderEx = new Swiper(facultyAdvantagesSlider, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            breakpoints: {
                501: {
                    slidesPerView: 1.5
                },
                769: {
                    slidesPerView: 2.2
                },
                1024: {
                    slidesPerView: 2.8
                },
                1341: {
                    slidesPerView: 4 
                }
            }
        })
    })

}