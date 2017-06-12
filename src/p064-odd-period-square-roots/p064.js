"use strict";

function isInteger(n) {
    return n == parseInt(n);
}

function continuedFraction2(S, maxNumberOfIterations) {
    var sqrtS = Math.sqrt(S);
    var m = [0];
    var d = [1];
    var a0 = Math.floor(Math.sqrt(S));
    var a = [a0];
    if (!isInteger(sqrtS)) {
        for (var n = 0; n < maxNumberOfIterations; n++) {
            m[n+1] = d[n]*a[n] - m[n];
            d[n+1] = (S - m[n+1]*m[n+1])/d[n];
            a[n+1] = Math.floor((a0+m[n+1])/d[n+1]);
            if (a[n+1] === 2*a0) {
                break;
            }
        }
    }
    return a;
}

function continuedFraction(n, iterations, maxNumberOfIterations, result) {
    var nIntegerPart = Math.floor(n);
    var nFractionalPart = n - nIntegerPart;

    result.push(nIntegerPart);
    if (nFractionalPart === 0 || iterations >= maxNumberOfIterations) {
        return result;
    } else {
        var reciprocal = 1/nFractionalPart;
//        console.log(nIntegerPart, nFractionalPart, reciprocal);
        return continuedFraction(reciprocal, iterations+1, maxNumberOfIterations, result);
    }
}

function try1() {
    for (var i = 2; i <= 10; i++) {
        var result = continuedFraction(Math.sqrt(i), 0, 20, []);
        console.log(i, result);
    }
}

function try2() {
    var even = 0;
    var odd = 0;
    for (var i = 1; i <= 10000; i++) {
        var result = continuedFraction2(i, 500);
        // pop off the leftmost digit
        result.shift();
        var length = result.length;
        if (length === 0) {
            // ignore it
        } else if (length % 2 === 0) {
            even++;
        } else {
            odd++;
        }
        console.log(i, result, even, odd);
    }
    return odd;
}

var numberOfOddPeriods = try2();
console.log('numberOfOddPeriods', numberOfOddPeriods);
