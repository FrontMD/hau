class ProgrammsListView {
    static COOKIE_NAME = 'programmsViewMode';
    static COOKIE_DAYS = 7;

    constructor() {
        this.programmsLists = [];
        this.initEventListeners();
        this.reinit();
    }

    static setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    static getCookie(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1];
    }

    initEventListeners() {
        document.addEventListener('click', this.handleToggleClick.bind(this));
        document.addEventListener('ajax_reload', () => this.reinit());
    }

    handleToggleClick(e) {
        const toggleBtn = e.target.closest('[data-js="visualToggleBtn"]');
        if (!toggleBtn) return;

        const programmsList = toggleBtn.closest('[data-js="programmsList"]');
        if (!programmsList) return;

        e.preventDefault();
        e.stopPropagation();

        const targetMode = toggleBtn.dataset.mode;
        this.toggleViewMode(programmsList, targetMode);
        ProgrammsListView.setCookie(ProgrammsListView.COOKIE_NAME, targetMode, ProgrammsListView.COOKIE_DAYS);
    }

    toggleViewMode(programmsList, targetMode) {
        const toggleBtns = programmsList.querySelectorAll('[data-js="visualToggleBtn"]');
        const cards = programmsList.querySelectorAll('[data-js="programmCard"]');

        const updateView = (removeClass, addClass, cardAction) => {
            programmsList.classList.remove(removeClass);
            programmsList.classList.add(addClass);
            toggleBtns.forEach(btn => btn.classList.remove('active'));
            programmsList.querySelector(`[data-mode="${targetMode}"]`).classList.add('active');
            cards.forEach(card => cardAction(card));
        };

        if (targetMode === 'cards') {
            updateView(
                'programms-list--rows',
                'programms-list--cards',
                card => card.classList.remove('programm-card--row')
            );
        }

        if (targetMode === 'rows') {
            updateView(
                'programms-list--cards',
                'programms-list--rows',
                card => card.classList.add('programm-card--row')
            );
        }
    }

    applySavedViewMode() {
        const savedMode = ProgrammsListView.getCookie(ProgrammsListView.COOKIE_NAME);
        if (!savedMode) return;

        this.programmsLists.forEach(programmsList => {
            this.toggleViewMode(programmsList, savedMode);
        });
    }

    reinit() {
        this.programmsLists = document.querySelectorAll('[data-js="programmsList"]');
        this.applySavedViewMode();
    }
}