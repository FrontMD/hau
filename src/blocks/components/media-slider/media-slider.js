function mediaSlider() {
    const imageSliders = document.querySelectorAll('[data-js="imageSlider"]');

    if(imageSliders.length < 1) return

    imageSliders.forEach(imageSlider => {
        let imageSliderEx = new Swiper(imageSlider, {
            slidesPerView: 1.5,
            spaceBetween: 0,
            breakpoints: {
                501: {
                    slidesPerView: 2.1,   
                },
                1024: {
                    slidesPerView: 2.9,   
                },
                1921: {
                    slidesPerView: 4.9,   
                }
            }
        })
    })

}