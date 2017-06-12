"use strict";

function manageArrays(arr) {
    var currentPeriod = [];
    var previousPeriod = [arr[0]];
    var periods = [previousPeriod];

    for (var i = 1, j = 0; i < arr.length; i++) {
        currentPeriod.push(arr[i]);
        // console.log('currentPeriod', currentPeriod);
        // console.log('previousPeriod', previousPeriod);
        if (previousPeriod[j] === currentPeriod[j]) {
            j++;
            if (previousPeriod.length === currentPeriod.length) {
                periods.push(currentPeriod);
                previousPeriod = currentPeriod;
                currentPeriod = [];
                j = 0;
            }
        } else {
            periods.push(currentPeriod);
            previousPeriod = [].concat.apply([], periods);
            currentPeriod = [];
            periods = [previousPeriod];
            j = 0;
        }
        
    }
    return periods;
}

var arrays = [ 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 1, 1, 1, 10, 5, 16, 1, 16, 12, 31 ];
//var arrays = [1,2,1,4,6,1,2,1,2,6];

console.log(arrays, manageArrays(arrays));
