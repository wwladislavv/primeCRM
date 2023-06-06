window.addEventListener('load', function() {
    const toggleTrigger = document.querySelector('.toggleFooter');
    const footerLinkLists = document.querySelectorAll('.footer__info-item ul');
    
    toggleTrigger?.addEventListener('click', () => {
        toggleTrigger.classList.toggle('active');
        footerLinkLists.forEach((list) => {
            list.classList.toggle('inactive');
        });
    });
});
