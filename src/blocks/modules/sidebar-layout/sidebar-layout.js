function sidebarLayout() {
    const sidebar = $('[data-js="sidebarLayoutsidebar"]');
    const sidebarToggle = $('[data-js="sidebarToggle"]');

    sidebarToggle.on('click', function () {
        sidebar.toggleClass('sidebar-layout__sidebar--expanded')
    })
}