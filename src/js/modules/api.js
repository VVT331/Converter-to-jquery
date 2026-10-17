import $ from "jquery";

const getDataCurr = function (url) {
    return $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET',
        error: (data, textStatus, erorr) => {
            throw new Error(`An error has occurred: ${erorr}`);
        }
    });
};

export default getDataCurr;