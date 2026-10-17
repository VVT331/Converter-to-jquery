import $ from "jquery";
import 'animate.css';

function controlActiveClass(triggerSelecotor, menuSelector, converterSelector, openModalFlag) {
    const trigger = $(triggerSelecotor),
        converter = $(converterSelector),
        menu = $(menuSelector);

    trigger.on('click', () => {
        if (menu.hasClass('converter__choice_active')) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    converter.on('click', (e) => {
        const target = $(e.target);

        if (openModalFlag && !target.closest('.converter__wrapper')) {
            hideMenu();
        }
    });

    function showMenu() {
        menu.removeClass('animate__zoomOut');
        menu.addClass(['converter__choice_active', 'animate__animated', 'animate__zoomIn']);
        document.body.style.overflow = 'hidden';
        openModalFlag = true;
    }

    function hideMenu() {
        menu.removeClass('animate__zoomIn');
        menu.addClass(['animate__animated', 'animate__zoomOut']);
        document.body.style.overflow = '';
        openModalFlag = false;

        menu.one('animationend', () => {
            menu.removeClass(['converter__choice_active', 'animate__animated', 'animate__zoomOut']);
        });
    }
}

function removeActiveClass(btnArray) {
    $(btnArray).each((index, btn) => {
        btn.removeClass('converter__list-btn_active');
    })
}

function updatingSelectValue(parentSelector, code, rate) {
    const mainCodeEl = $(parentSelector).find('.converter__currency-code'),
        mainRateEl = $(parentSelector).find('.converter__currency-rate');

    mainCodeEl.text(code);
    mainRateEl.text(`rate = ${rate}`);
}

export default controlActiveClass;
export { removeActiveClass, updatingSelectValue };