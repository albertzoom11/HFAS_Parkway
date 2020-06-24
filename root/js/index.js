const numberInput = document.getElementById('number');
const northOrSouthInput = document.getElementById('nOrS');
const localOrExpressInput = document.getElementById('lOrE');


function calculateRoute() {
    // number must be between 113.4 and 119.2
    var number = numberInput.value;
    var northOrSouth = northOrSouthInput.value;
    var localOrExpress = localOrExpressInput.value;
    var output = [];

    // southbound local
    if (northOrSouth.toLowercase() == 's' && localOrExpress.toLowercase() == 'l') {
        if (number > 119.1) {
            // wrap around to 120.5
        } else if (number > 118.4) {
            // wrap around to 119.1
        } else if (number > 115.8) {
            // back route to lloyd road entrance
        } else {
            // take pnc local southbound
        }
    // southbound express
    } else if (northOrSouth.toLowercase() == 's' && localOrExpress.toLowercase() == 'e') {
        if (number > 117.8) {
            // wrap around to 119.5
        } else if (number > 117.5) {
            // take back route with line road and cut across 117.8
        } else if (number > 115.8) {
            // wrap around to 117.5
        } else {
            // take pnc express southbound
        }
    // northbound express
    } else if (northOrSouth.toLowercase() == 'n' && localOrExpress.toLowercase() == 'e') {
        if (number < 113.8) {
            // take 112.3
        } else if (number < 115.8) {
            // take 113.8
        } else {
            // take pnc express northbound
        }
    // northbound local
    } else {
        if (number < 114.7) {
            // take 113.0
        } else if (number < 115.8) {
            // take pnc arts center 114.7
        } else {
            // take pnc arts center local northbound
        }

    }

    return output;
};