window.addEventListener('load',  function() {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.header__menu');
    const menuTrigger = document.querySelector('.header__menu-trigger');    

    menuTrigger?.addEventListener('click', (event) => {
        event.stopPropagation();

        const isActive  = menu?.classList.contains('active');
        if (!isActive) {
            header?.classList.add('active');
        }
        
        menu?.classList.toggle('active');
    });

    window.addEventListener('click', (event) => {
        const { target } = event;
        if (target !== menuTrigger && target !== menu) {
            menu?.classList.remove('active');
        }
    });
});