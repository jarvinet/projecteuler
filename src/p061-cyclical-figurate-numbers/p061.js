"use strict";


function generateNthTriangleNumber(n) {
    return n*(n+1)/2;
}

function generateNthSquareNumber(n) {
    return n*n;
}

function generateNthPentagonalNumber(n) {
    return n*(3*n - 1)/2;
}

function generateNthHexagonalNumber(n) {
    return n*(2*n-1);
}

function generateNthHeptagonalNumber(n) {
    return n*(5*n-3)/2;
}

function generateNthOctagonalNumber(n) {
    return n*(3*n-2);
}

function gen(lowerLimit, upperLimit, generator) {
    var numbers = [], n = 1;
    var number;
    do {
        number = generator(n);
        if (number >= lowerLimit && number <= upperLimit) {
            numbers.push(number);
        }
        n++;
    } while (number < upperLimit);
    return numbers;
}

function isChainable(n1, n2) {
    return n1[2] === n2[0] && n1[3] === n2[1];
}

function isChain(arrayOfStrings) {
    return arrayOfStrings.reduce(function(accumulator, currentValue, index, array) {
        if (index > 0) {
            var previousValue = array[index-1];
            accumulator = accumulator && isChainable(previousValue, currentValue);
        }
        return accumulator;
    }, true);
}

function numbersToStrings(arrayOfNumbers) {
    return arrayOfNumbers.map(function(number) {
        return number.toString();
    });
}

function stringsToNumbers(arrayOfStrings) {
    return arrayOfStrings.map(function(currentValue, index, array) {
        return parseInt(currentValue);
    });
}

var n = [
    numbersToStrings(gen(1000, 10000, generateNthTriangleNumber)),
    numbersToStrings(gen(1000, 10000, generateNthSquareNumber)),
    numbersToStrings(gen(1000, 10000, generateNthPentagonalNumber)),
    numbersToStrings(gen(1000, 10000, generateNthHexagonalNumber)),
    numbersToStrings(gen(1000, 10000, generateNthHeptagonalNumber)),
    numbersToStrings(gen(1000, 10000, generateNthOctagonalNumber))
];
// n = [
//     numbersToStrings(gen(1000, 10000, generateNthTriangleNumber)),
//     numbersToStrings(gen(1000, 10000, generateNthSquareNumber)),
//     numbersToStrings(gen(1000, 10000, generateNthPentagonalNumber))
// ];

//console.log(n);
//var chain = ['8128', '2882', '8281'];
//console.log(chain, isChain(chain));

function createNewArrayMinus(numbers, indexNotToInclude) {
    var result = [];
    for (var i = 0; i < numbers.length; i++) {
        if (i !== indexNotToInclude) {
            result.push(numbers[i]);
        }
    }
    return result;
}

function a(requiredLength, candidateNumbers, numbers) {
//    console.log(candidateNumbers, numbers.length);
    if (candidateNumbers.length >= requiredLength) {
        var closedChainCandidate = candidateNumbers.concat(candidateNumbers[0]);
        return isChain(closedChainCandidate) ? candidateNumbers: [];
    }
    // if (numbers.length === 0) {
    //     return [];
    // }
    for (var i = 0; i < numbers.length; i++) {
        var numbersToTry = numbers[i];
        for (var j = 0; j < numbersToTry.length; j++) {
            var numberToTry = numbersToTry[j];
            var candidates = candidateNumbers.concat(numberToTry);
            if (isChain(candidates)) {
                var b = a(requiredLength, candidates, createNewArrayMinus(numbers, i));
                if (b.length > 0) {
                    return b;
                }
            }
        }
    }
    return [];
}

function sum(arr) {
    return arr.reduce(function(accumulator, currentValue, index, array) {
        return accumulator + currentValue;
    }, 0);
}

var chain = a(6, [], n);

console.log('the chain', chain);
console.log('answer', sum(stringsToNumbers(chain)));
