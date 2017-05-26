"use strict";

var math = require('mathjs');

math.config({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 256        // Number of significant digits for BigNumbers
});

//console.log(math.sqrt(-4));
function sumOfDigits(numberAsArrayOfDigits) {
    var sum = numberAsArrayOfDigits.reduce(function (accumulator, currentValue, index, array) {
        return accumulator + parseInt(currentValue);
    }, 0);
    return sum;
}

function largestSum() {
    var result = 0;

    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            var numberAsString = math.format(math.pow(math.bignumber(i), math.bignumber(j)), {notation: 'fixed'} );
            var sum = sumOfDigits(numberAsString.split(''));
            if (sum > result) {
                result = sum;
                console.log(sum, numberAsString, i, j);
            }
        }
    }
    return result;
}

var biggestSumSoFar = largestSum();
//var biggestSumSoFar = math.format(math.pow(2, 4), {notation: 'auto', exponential: {lower:1e3, upper:10000}});
//var biggestSumSoFar = math.format(math.pow(math.bignumber(29), math.bignumber(44)), {notation:'fixed'});
//var biggestSumSoFar = 1e5;

console.log('largest sum of digits is', biggestSumSoFar);
