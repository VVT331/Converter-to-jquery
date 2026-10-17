"use strict";

import "/src/sass/style.scss";
import $ from "jquery"

import createBtns from "./modules/createButtons";
import filter from "./modules/filter";
import controlActiveClass from "./modules/ui";



$(document).ready(() => {

    let btnArr = [];
    let flagMenu = false;

    createBtns('#input-receiving', '#input-extradition', '.converter__list', '.converter__choice', btnArr, flagMenu)
    filter('#search-currency', btnArr);
    controlActiveClass('.converter__currency-trigger', '.converter__choice', '.converter', flagMenu);
});