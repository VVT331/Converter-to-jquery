function conversionСurrency(currInput, currRate) {
    return (currInput * currRate).toFixed(2);
}

function updatingValue(input, rate, output) {
    if (input && rate) {
        output.val(conversionСurrency(input, rate));
    } else {
        output.val('');
    }
}

export { updatingValue };