@@include("../../blocks/modules/header/header.js")
@@include("../../blocks/modules/main-burger/main-burger.js")
@@include("../../blocks/modules/sidebar-layout/sidebar-layout.js")
@@include("../../blocks/modules/m-table/m-table.js")

document.addEventListener('DOMContentLoaded', () => {
    headerHeight()
    sidebarLayout()
    mTable()
    mainBurger()
})