"use strict";

import "/src/sass/style.scss";
import $ from "jquery"

$(document).ready(() => {

    const receiving = $('#input-receiving'),
        extradition = $('#input-extradition'),
        listValues = $('.converter__list'),
        menuValues = $('.converter__choice'),
        btnOpenMenu = $('.converter__currency-trigger');


    let btnArr = [],
        receivingValue = 1,
        attrRate = 1;

    btnOpenMenu.on('click', () => {
        menuValues.toggleClass('converter__choice_active');
    });



    const getDataCurr = function (url) {
        return $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            error: (data, textStatus, erorr) => {
                throw new Error(`An error has occurred: ${erorr}`);
            }
        });
    }

    function removeActiveClass(allBtn) {
        $(allBtn).each((index, btn) => {
            btn.removeClass('converter__list-btn_active');
        })
    }

    function conversionСurrency(currInput, currRate) {
        return (currInput * currRate).toFixed(2);
    }

    function updatingValue(input, rate) {
        if (input && rate) {
            extradition.val(conversionСurrency(input, rate));
        } else {
            extradition.val(0);
        }
    }

    function updatingMainValue(selector, code, rate) {
        const mainCodeEl = $(selector).find('.converter__currency-code'),
            mainRateEl = $(selector).find('.converter__currency-rate');

        mainCodeEl.text(code);
        mainRateEl.text(`rate = ${rate}`);
    }

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

            btnArr.push(btn);
        }
    }

    getDataCurr('https://api.frankfurter.dev/v2/rates?base=usd')
        .done((data) => {
            $(data).each((index, { quote, rate }) => {
                new ButtonRenderer(quote, rate, listValues).create(rate, quote);
            });


            $(btnArr).each((index, btn) => {

                btn.on('click', (e) => {

                    removeActiveClass(btnArr);

                    btn.addClass('converter__list-btn_active');

                    attrRate = +btn.attr('data-rate');
                    receivingValue = +receiving.val();

                    updatingMainValue('.converter__currency-trigger', btn.attr('data-code'), btn.attr('data-rate'));

                    updatingValue(receivingValue, attrRate);
                    menuValues.removeClass('converter__choice_active');


                });
            });

            receiving.on('input', () => {
                receivingValue = +receiving.val();
                updatingValue(receivingValue, attrRate);

            });


        }).fail((data, textErorr, erorr) => {
            throw new Error(`The download failed: ${erorr}`);
        });
});