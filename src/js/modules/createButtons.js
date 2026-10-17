import $ from "jquery";

import getDataCurr from "./api";
import { updatingValue } from "./updateValue";
import { removeActiveClass, updatingSelectValue } from "./ui";

const createBtns = (inputSelector, outputSelector, wrapperSelector, menuSelector, array, openModalFlag) => {

    const inputEl = $(inputSelector),
        outputEl = $(outputSelector),
        listValues = $(wrapperSelector),
        menu = $(menuSelector);

    let inputValue = 1,
        attrRate = 1;


    class ButtonRenderer {
        constructor(quote, rate, parentSelector) {
            this.quote = quote;
            this.rate = rate;
            this.parentSelector = $(parentSelector);
        }

        create(rateBtn, quoteBtn) {
            const btn = $(`
                <button class="converter__list-btn" type="button">
                    <span class="converter__list-code">${this.quote}</span>
                    <p class="converter__list-rate"> rate = ${this.rate}</p>
                    <span class="converter__list-name">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12l5 5 9-10" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </button>`);
            btn.attr('data-rate', rateBtn);
            btn.attr('data-code', quoteBtn);
            btn.addClass('converter__list-btn');

            this.parentSelector.append(btn);

            array.push(btn);
        }
    }

    getDataCurr('https://api.frankfurter.dev/v2/rates?base=usd')
        .done((data) => {
            $(data).each((index, { quote, rate }) => {
                new ButtonRenderer(quote, rate, listValues).create(rate, quote);
            });


            $(array).each((index, btn) => {

                btn.on('click', () => {

                    removeActiveClass(array);

                    btn.addClass('converter__list-btn_active');

                    attrRate = +btn.attr('data-rate');
                    inputValue = +inputEl.val();

                    updatingSelectValue('.converter__currency-trigger', btn.attr('data-code'), btn.attr('data-rate'));

                    updatingValue(inputValue, attrRate, outputEl);

                    menu.removeClass('animate__zoomIn');
                    menu.addClass(['animate__animated', 'animate__zoomOut']);
                    document.body.style.overflow = '';
                    openModalFlag = false;

                    menu.one('animationend', () => {
                        menu.removeClass(['converter__choice_active', 'animate__animated', 'animate__zoomOut']);
                    });
                });
            });

            inputEl.on('input', () => {
                inputValue = +inputEl.val();
                updatingValue(inputValue, attrRate, outputEl);
            });

        }).fail((data, textErorr, erorr) => {
            throw new Error(`The download failed: ${erorr}`);
        });
};

export default createBtns