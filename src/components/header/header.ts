window.addEventListener('load', function() {
    const header = document.querySelector('.header');
    const menu = document.querySelector('.header__menu');

    window.addEventListener('scroll', () => {
        const { scrollY } = window;
        
        menu?.classList.remove('active');

        if (scrollY > 0) {
            header?.classList.add('active');
        } else {
            header?.classList.remove('active');
        }
    });
});
