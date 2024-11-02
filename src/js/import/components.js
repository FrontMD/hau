@@include("../../blocks/components/tabs-block/tabs-block.js")
@@include("../../blocks/components/multi-menu/multi-menu.js")
@@include("../../blocks/components/period-select/period-select.js")
@@include("../../blocks/components/media-slider/media-slider.js")
@@include("../../blocks/components/form/form.js")

document.addEventListener('DOMContentLoaded', () => {
    tabsBlockInit()
    multiMenu()
    periodSelect()
    mediaSlider()
    validation()
})