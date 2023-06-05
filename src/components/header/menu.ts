window.onload = function() {
    const menu = document.querySelector('.header__menu');
    const menuTrigger = document.querySelector('.header__menu-trigger');

    

    menuTrigger?.addEventListener('click', (event) => {
        event.stopPropagation();
        menu?.classList.toggle('active');
    });

    window.addEventListener('click', (event) => {
        const { target } = event;
        if (target !== menuTrigger && target !== menu) {
            menu?.classList.remove('active');
        }
    });
};