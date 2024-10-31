@@include("../../blocks/components/tabs-block/tabs-block.js")
@@include("../../blocks/components/menu-list/menu-list.js")
@@include("../../blocks/components/period-select/period-select.js")

document.addEventListener('DOMContentLoaded', () => {
    tabsBlockInit()
    menuList()
    periodSelect()
})