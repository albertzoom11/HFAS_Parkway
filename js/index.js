const numberInput = document.getElementById('number');
const northOrSouthInput = document.getElementById('nOrS');
const localOrExpressInput = document.getElementById('lOrE');

var errorNum = (number, northOrSouth, localOrExpress) => {
    var outputNum = 0;

    if (number > 119.1 || number < 113.4) {
        outputNum += 1;
    }

    if (northOrSouth != 's' && northOrSouth != 'n') {
        outputNum += 2;
    }

    if (localOrExpress != 'e' && localOrExpress != 'l') {
        outputNum += 4;
    }

    return outputNum;
}

var northSouthShorthand = (northOrSouth) => {
    if (northOrSouth.toLowerCase() == 'north' || northOrSouth.toLowerCase() == 'n') {
        return 'n';
    } else if (northOrSouth.toLowerCase() == 'south' || northOrSouth.toLowerCase() == 's') {
        return 's';
    }
    return northOrSouth;
}

var localExpressShorthand = (localExpress) => {
    if (localExpress.toLowerCase() == 'local' || localExpress.toLowerCase() == 'l') {
        return 'l';
    } else if (localExpress.toLowerCase() == 'express' || localExpress.toLowerCase() == 'e') {
        return 'e';
    }
    return localExpress;
}

var calculateRoute = (number, northOrSouth, localOrExpress) => {
    var nS = northSouthShorthand(northOrSouth);
    var lE = localExpressShorthand(localOrExpress);

    var errorNumber = errorNum(number, nS, lE);

    if (errorNumber > 0) {
        return errorNumber * 100;
    }

    // southbound local
    if (nS == 's' && lE == 'l') {
        if (number > 118.4) {
            return 1;
        } else if (number > 115.5) {
            return 2;
        } else {
            return 3;
        }
        // southbound express
    } else if (nS == 's' && lE == 'e') {
        if (number > 117.8) {
            return 4;
        } else if (number > 117.5) {
            return 5;
        } else if (number > 115.8) {
            return 6;
        } else {
            return 7;
        }
        // northbound express
    } else if (nS == 'n' && lE == 'e') {
        if (number < 113.8) {
            return 8;
        } else if (number < 115.8) {
            return 9;
        } else {
            return 10;
        }
        // northbound local
    } else {
        if (number < 114.7) {
            return 11;
        } else if (number < 116.1) {
            return 12;
        } else {
            return 13;
        }
    }
};

var getTableArrayFromNum = (num, number) => {
    var output = [];

    if (num == 100) {
        output = [
            'Make sure you inputted a number between 113.4 and 119.1 for the first input field.'
        ];
    } else if (num == 200) {
        output = [
            'Make sure you inputted North, South, N, or S for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 400) {
        output = [
            'Make sure you inputted Local, Express, L, or E for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 300) {
        output = [
            'Make sure you inputted a number between 113.4 and 119.1 for the first input field.',
            'Make sure you inputted North, South, N, or S for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 500) {
        output = [
            'Make sure you inputted a number between 113.4 and 119.1 for the first input field.',
            'Make sure you inputted Local, Express, L, or E for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 600) {
        output = [
            'Make sure you inputted North, South, N, or S for the second input field.',
            'Make sure you inputted Local, Express, L, or E for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 700) {
        output = [
            'Make sure you inputted a number between 113.4 and 119.1 for the first input field.',
            'Make sure you inputted North, South, N, or S for the second input field.',
            'Make sure you inputted Local, Express, L, or E for the second input field.',
            'Capitalization doesn\'t matter.'
        ];
    } else if (num == 1) {
        // wrap around to 119.1
        output = [
            'Enter the Parkway through the PNC northbound express cut through.',
            'Cut through on 119.5 to southbound express.',
            'Cut through on 119.1 to southbound local',
            'Continue on southbound local until you arrive at ' + number + "."
        ];
    } else if (num == 2) {
        // back route to lloyd road entrance
        output = [
            'Turn right onto Crawfords Corner Road',
            'Turn right onto Holmdel Road',
            'Turn left onto Hillcrest Road',
            'Turn left onto Bethany Road',
            'Turn right onto Line Road',
            'Bear Left on Line Road to avoid cul-de-sac',
            'Turn right onto Lloyd Road',
            'Bear right to enter on southbound local from Lloyd Road',
            'Continue on southbound local until you arrive at ' + number + "."
        ];
    } else if (num == 3) {
        // take pnc local southbound
        output = [
            'Enter the Parkway through the PNC southbound local entrance.',
            'Continue on southbound local until you arrive at ' + number + "."
        ];
    } else if (num == 4) {
        // wrap around to 119.5
        output = [
            'Enter the Parkway through the PNC northbound express cut through.',
            'Cut through on 119.5 to southbound express.',
            'Continue on southbound express until you arrive at ' + number + "."
        ];
    } else if (num == 5) {
        // take back route with line road and cut across 117.8
        output = [
            'Turn right onto Crawfords Corner Road',
            'Turn right onto Holmdel Road',
            'Turn left onto Hillcrest Road',
            'Turn left onto Bethany Road',
            'Turn right onto Line Road',
            'Bear Left on Line Road to avoid cul-de-sac',
            'Turn right onto Lloyd Road',
            'Bear right to enter on southbound local from Lloyd Road',
            'Cut through on 117.8 to southbound express.',
            'Continue on southbound express until you arrive at ' + number + "."
        ];
    } else if (num == 6) {
        // wrap around to 117.5
        output = [
            'Enter the Parkway through the PNC northbound express cut through.',
            'Cut through on 117.5 to southbound express.',
            'Continue on southbound express until you arrive at ' + number + "."
        ];
    } else if (num == 7) {
        // take pnc express southbound
        output = [
            'Enter the Parkway through the PNC southbound express cut through.',
            'Continue on southbound express until you arrive at ' + number + "."
        ];
    } else if (num == 8) {
        // take pnc express southbound
        output = [
            // take 112.3
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 112.3 to northbound express.',
            'Continue on northbound express until you arrive at ' + number + "."
        ];
    } else if (num == 9) {
        // take pnc express southbound
        output = [
            // take 113.8
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 113.8 to northbound express.',
            'Continue on northbound express until you arrive at ' + number + "."
        ];
    } else if (num == 10) {
        // take pnc express southbound
        output = [
            // take pnc express northbound
            'Enter the Parkway through the PNC northbound express cut through.',
            'Continue on northbound express until you arrive at ' + number + "."
        ];
    } else if (num == 11) {
        // take pnc express southbound
        output = [
            // take 113.0
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 112.3 to northbound express.',
            'Cut through on 113.0 to northbound local.',
            'Continue on northbound local until you arrive at ' + number + "."
        ];
    } else if (num == 12) {
        // take pnc express southbound
        output = [
            // take pnc arts center 114.7
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 113.8 to northbound express.',
            'Take the PNC crossover which starts on 114.1 and ends at 114.7 to northbound local.',
            'Continue on northbound local until you arrive at ' + number + "."
        ];
    } else {
        // take pnc express southbound
        output = [
            // take pnc arts center local northbound
            'Enter the Parkway through the PNC northbound local entrance.',
            'Continue on northbound local until you arrive at ' + number + "."
        ];
    }
    return output;
}

var getPictureArrayFromNum = (num) => {
    var output = [];

    if (num == 100) {
        output = [
            'numberInput.jpg'
        ];
    } else if (num == 200) {
        output = [
            'northOrSouth.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 400) {
        output = [
            'localOrExpress.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 300) {
        output = [
            'numberInput.jpg',
            'northOrSouth.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 500) {
        output = [
            'numberInput.jpg',
            'localOrExpress.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 600) {
        output = [
            'northOrSouth.jpg',
            'localOrExpress.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 700) {
        output = [
            'numberInput.jpg',
            'northOrSouth.jpg',
            'localOrExpress.jpg',
            'capitalization.jpg'
        ];
    } else if (num == 1) {
        // wrap around to 119.1
        output = [
            'gspPncE.jpg',
            '119_5.jpg',
            '119_1L.jpg',
            'arrived.jpg'
        ];
    } else if (num == 2) {
        // back route to lloyd road entrance
        output = [
            'crawfordsRight.jpg',
            'holmdelRight.jpg',
            'hillcrestLeft.jpg',
            'bethanyLeft.jpg',
            'lineRight.jpg',
            'lineLeft.jpg',
            'lloydRight.jpg',
            'gspLloyd.jpg',
            'arrived.jpg'
        ];
    } else if (num == 3) {
        // take pnc local southbound
        output = [
            'gspPncSL.jpg',
            'arrived.jpg'
        ];
    } else if (num == 4) {
        // wrap around to 119.5
        output = [
            'gspPncE.jpg',
            '119_5.jpg',
            'arrived.jpg'
        ];
    } else if (num == 5) {
        // take back route with line road and cut across 117.8
        output = [
            'crawfordsRight.jpg',
            'holmdelRight.jpg',
            'hillcrestLeft.jpg',
            'bethanyLeft.jpg',
            'lineRight.jpg',
            'lineLeft.jpg',
            'lloydRight.jpg',
            'gspLloyd.jpg',
            '117_8L.jpg',
            'arrived.jpg'
        ];
    } else if (num == 6) {
        // wrap around to 117.5
        output = [
            'gspPncE.jpg',
            '117_5.jpg',
            'arrived.jpg'
        ];
    } else if (num == 7) {
        // take pnc express southbound
        output = [
            'gspPncE.jpg',
            'arrived.jpg'
        ];
    } else if (num == 8) {
        // take pnc express southbound
        output = [
            // take 112.3
            'gspPncE.jpg',
            '112_3.jpg',
            'arrived.jpg'
        ];
    } else if (num == 9) {
        // take pnc express southbound
        output = [
            // take 113.8
            'gspPncE.jpg',
            '113_8.jpg',
            'arrived.jpg'
        ];
    } else if (num == 10) {
        // take pnc express southbound
        output = [
            // take pnc express northbound
            'gspPncE.jpg',
            'arrived.jpg'
        ];
    } else if (num == 11) {
        // take pnc express southbound
        output = [
            // take 113.0
            'gspPncE.jpg',
            '112_3.jpg',
            '113_0R.jpg',
            'arrived.jpg'
        ];
    } else if (num == 12) {
        // take pnc express southbound
        output = [
            // take pnc arts center 114.7
            'gspPncE.jpg',
            '113_8.jpg',
            '114_7R.jpg',
            'arrived.jpg'
        ];
    } else {
        // take pnc express southbound
        output = [
            // take pnc arts center local northbound
            'gspPncNL.jpg',
            'arrived.jpg'
        ];
    }
    return output;
}

const directions = document.querySelector('.directions');
function setupDirections() {
    // number must be between 113.4 and 119.1
    var number = numberInput.value;
    var northOrSouth = northOrSouthInput.value;
    var localOrExpress = localOrExpressInput.value;

    var num = calculateRoute(number, northOrSouth, localOrExpress);

    var table = getTableArrayFromNum(num, number);
    var pictures = getPictureArrayFromNum(num);

    var html = '';

    for (let i = 0; i < table.length; i++) {
        var li = `
        <li>
            <div class="collapsible-header waves-effect waves-light teal accent-3"><h6 style="margin: 0 auto;">${table[i]}</h6></div>
            <div class="collapsible-body teal accent-1" style="text-align: center;">
                <img src="images/${pictures[i]}" height="100%" width="100%" alt="Failed to show image" style="margin: 0 auto;">
            </div>
        </li>
    `;
        html += li;
    }
    directions.innerHTML = html;
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});

// Get the input field
var input = document.getElementById("lOrE");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});

var input2 = document.getElementById("nOrS");
// Execute a function when the user releases a key on the keyboard
input2.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});

var input3 = document.getElementById("number");
// Execute a function when the user releases a key on the keyboard
input3.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button").click();
    }
});