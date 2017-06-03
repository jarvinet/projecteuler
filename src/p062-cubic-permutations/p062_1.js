"use strict";

// 123 -> "123" numberToString
function numberToString(number) {
    return number.toString();
}

// "123" -> ['1', '2', '3'] stringToArray
function stringToArray(string) {
    return string.split('');
}

// ['1', '2', '3'] -> "123" arrayToString
function arrayToString(arr) {
    return arr.join('');
}

function findCubePermutations(searchStart, searchEnd, requiredLength) {
    var cubes = {};
    for (var i = searchStart; i < searchEnd; i++) {
        var cube  = i*i*i;
        var n = stringToArray(numberToString(cube));
        n.sort();
        var key = arrayToString(n);
        if (!cubes[key]) {
            cubes[key] = [];
        }
        cubes[key].push(cube);
    }
    
    var keys = Object.keys(cubes).filter(function(currentValue, index, array) {
        return cubes[currentValue].length === requiredLength;
    });
    return keys.map(function(currentValue, index, array) {
        return cubes[currentValue];
    });
}

var cubePermutations = findCubePermutations(100, 17000, 5);
console.log(cubePermutations);
console.log('answer', cubePermutations[0][0]);
