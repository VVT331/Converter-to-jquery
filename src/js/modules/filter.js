import $ from "jquery";

const filter = (triggerSelector, array) => {
    const trigger = $(triggerSelector);

    trigger.on('input', function () {
        const text = $(trigger).val().trim().toUpperCase();

        $(array).each((index, btn) => {

            const btnCode = btn.attr('data-code').toUpperCase();

            if (btnCode.startsWith(text)) {
                btn.show();
            } else {
                btn.hide();
            }
        });
    });
};

export default filter;