function tabsBlockInit() {
    const tabs = document.querySelector('[data-js="tabsBlockTabs"]');
    const slides = document.querySelector('[data-js="tabsBlockSlides"]');

    if(!tabs || !slides) return

    let tabsSliderEx = new Swiper(tabs, {
        slidesPerView: 'auto',
        spaceBetween: 40,
        freeMode: true,
        breakpoints: {
            501: {
                spaceBetween: 20, 
            },
            1025: {
                spaceBetween: 40, 
            },
        }, 
        on: {
            realIndexChange: function() {
                document.activeElement.blur()
            },
            init: function(swiper) {
                let lastTab = swiper.slides[swiper.slides.length - 1];
                let lastTabWidth = lastTab.offsetWidth;
                let lastTabText = lastTab.children[0];
                let lastTabTextWidth = lastTabText.offsetWidth;
                let lastTabCounter = lastTab.children[1];
                let lastTabCounterWidth = lastTabCounter ? lastTabCounter.offsetWidth : 0;
                

                if(lastTabTextWidth + lastTabCounterWidth > lastTabWidth) {
                    swiper.params.slidesOffsetAfter = lastTabTextWidth + lastTabCounterWidth + 10 - lastTabWidth;
                }
            },
        }
    })

    let slidesSliderEx = new Swiper(slides, {
        slidesPerView: 1,
        effect: 'fade',
        allowTouchMove: false,
        autoHeight: true,
        thumbs: {
            swiper: tabsSliderEx
        },
        on: {
            slideChange: function() {
                $('[data-js="select"]').select2('close');
                document.activeElement.blur();
            },
        }

    })

}