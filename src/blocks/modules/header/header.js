function headerHeight() {
    const header = $('[data-js="siteHeader"]');
    const initScroll = $(window).scrollTop();

    if(initScroll > 50) {
        header.addClass("site-header--small");
    }

    $(window).scroll(function() {
        const scroll = $(window).scrollTop();

        if(scroll > 50) {
            header.addClass("site-header--small");
        } else {
            header.removeClass("site-header--small");
        }
    });
}