function spoilers() {
    const accordions = document.querySelectorAll("[data-js='accordion']");

	const openSpoiler = (spoiler) => {
		let headerHeight = 0;
		if (window.innerWidth > 1100){
			headerHeight = 100;
		}
		const content = spoiler.querySelector(".accordion__content");
		spoiler.classList.add("active");

		let accordionActiveHeaight = $("active .accordion__content").height();
		if(typeof(accordionActiveHeaight) === "undefined") {
			accordionActiveHeaight = 0;
		}
		content.style.maxHeight = content.scrollHeight + "px";
		ScrollTrigger.refresh();
	};

	const closeSpoiler = (accordion) => {
		const content = accordion.querySelector(".accordion__content");
		accordion.classList.remove("accordion__active");

		content.style.maxHeight = null;
	};


	spoilers.forEach((spoiler) => {
		const intro = spoiler.querySelector(".accordion__intro");
		const content = spoiler.querySelector(".accordion__content");

		intro.onclick = () => {
			if (content.style.maxHeight) {
				closeSpoiler(spoiler);
			} else {
				openSpoiler(spoiler);
				$(spoilers).not($(spoiler)).each(function(){
					closeSpoiler($(this)[0]);
				});
			}
		};

	});
}