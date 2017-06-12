"use strict";

var math = require('mathjs');

math.config({
    number: 'BigNumber', // Default type of number:
                         // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 256       // Number of significant digits for BigNumbers
});

function continuedFraction(n, iterations, maxNumberOfIterations, result) {
    var nIntegerPart = math.floor(n);
    var nFractionalPart = math.chain(n).subtract(nIntegerPart).done();

    result.push(nIntegerPart);
    if (math.equal(nFractionalPart, 0) || iterations >= maxNumberOfIterations) {
        return result;
    } else {
        var reciprocal = math.chain(1).divide(nFractionalPart).done();
//        console.log(nIntegerPart, nFractionalPart, reciprocal);
        return continuedFraction(reciprocal, iterations+1, maxNumberOfIterations, result);
    }
}

for (var i = 2; i <= 10; i++) {
    var result = continuedFraction(math.sqrt(i), 0, 30, []);
    console.log(i, math.format(result));
}

// var one = math.bignumber(1);
// var seven = math.bignumber(7);
// var seventh = math.chain(one).divide(seven).done();

// console.log(math.format(math.bignumber(1/7)));
// console.log(math.format(seventh));
