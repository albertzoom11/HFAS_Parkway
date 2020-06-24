const numberInput = document.getElementById('number');
const northOrSouthInput = document.getElementById('nOrS');
const localOrExpressInput = document.getElementById('lOrE');

var errorMsg = (number, northOrSouth, localOrExpress) => {
    var stringError = false;
    var output = [];
    if (number > 119.2 || number < 113.4) {
        output.push('Make sure you inputted a number between 113.4 and 119.2 for the first input field.');
    }
    
    if (northOrSouth != 's' && northOrSouth != 'n') {
        output.push('Make sure you inputted North, South, N, or S for the second input field.');
        stringError = true;
    }
    
    if (localOrExpress != 'e' && localOrExpress != 'l') {
        output.push('Make sure you inputted Local, Express, L, or E for the second input field.');
        stringError = true;
    }

    if (stringError) {
        output.push('Capitalization doesn\'t matter.');
    }

    return output;
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

    var output = errorMsg(number, nS, lE);

    if (output.length > 0) {
        return output;
    }


    // southbound local
    if (nS == 's' && lE == 'l') {
        if (number > 119.1) {
            // wrap around to 120.5
            output = [
                'Enter the Parkway through the PNC northbound express cut through.',
                'Cut through on 120.6 to southbound express.',
                'Cut through on 120.5 to southbound local',
                'Continue on southbound local until you arrive at ' + number + "."
            ];
        } else if (number > 118.4) {
            // wrap around to 119.1
            output = [
                'Enter the Parkway through the PNC northbound express cut through.',
                'Cut through on 119.5 to southbound express.',
                'Cut through on 119.1 to southbound local',
                'Continue on southbound local until you arrive at ' + number + "."
            ];
        } else if (number > 115.5) {
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
        } else {
            // take pnc local southbound
            output = [
                'Enter the Parkway through the PNC southbound local entrance.',
                'Continue on southbound local until you arrive at ' + number + "."
            ];
        }
    // southbound express
    } else if (nS == 's' && lE == 'e') {
        if (number > 117.8) {
            // wrap around to 119.5
            output = [
                'Enter the Parkway through the PNC northbound express cut through.',
                'Cut through on 119.5 to southbound express.',
                'Continue on southbound express until you arrive at ' + number + "."
            ];
        } else if (number > 117.5) {
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
        } else if (number > 115.8) {
            // wrap around to 117.5
            output = [
                'Enter the Parkway through the PNC northbound express cut through.',
                'Cut through on 117.5 to southbound express.',
                'Continue on southbound express until you arrive at ' + number + "."
            ];
        } else {
            // take pnc express southbound
            output = [
                'Enter the Parkway through the PNC southbound express cut through.',
                'Continue on southbound express until you arrive at ' + number + "."
            ];
        }
    // northbound express
    } else if (nS == 'n' && lE == 'e') {
        if (number < 113.8) {
            // take 112.3
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 112.3 to northbound express.',
            'Continue on northbound express until you arrive at ' + number + "."
        } else if (number < 115.8) {
            // take 113.8
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 113.8 to northbound express.',
            'Continue on northbound express until you arrive at ' + number + "."
        } else {
            // take pnc express northbound
            'Enter the Parkway through the PNC northbound express cut through.',
            'Continue on northbound express until you arrive at ' + number + "."
        }
    // northbound local
    } else {
        if (number < 114.7) {
            // take 113.0
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 112.3 to northbound express.',
            'Cut through on 113.0 to northbound local.',
            'Continue on northbound local until you arrive at ' + number + "."
        } else if (number < 116.1) {
            // take pnc arts center 114.7
            'Enter the Parkway through the PNC southbound express cut through.',
            'Cut through on 113.8 to northbound express.',
            'Take the PNC crossover which starts on 114.1 and ends at 114.7 to northbound local.',
            'Continue on northbound local until you arrive at ' + number + "."
        } else {
            // take pnc arts center local northbound
            'Enter the Parkway through the PNC northbound local entrance.',
            'Continue on northbound local until you arrive at ' + number + "."
        }
    }
    return output;
};

const directions = document.querySelector('.directions');
function setupDirections() {
    // number must be between 113.4 and 119.2
    var number = numberInput.value;
    var northOrSouth = northOrSouthInput.value;
    var localOrExpress = localOrExpressInput.value;

    var table = calculateRoute(number, northOrSouth, localOrExpress);
    var html = '';

    table.forEach(step => {
        var li = `
        <li>
            <div class="collapsible-header waves-effect waves-light teal accent-3"><h6 style="margin: 0 auto;">${step}</h6></div>
        </li>
    `;
        html += li;
    });
    directions.innerHTML = html;
}