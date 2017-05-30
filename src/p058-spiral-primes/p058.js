"use strict";

function isPrime2(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    var m=Math.sqrt(n);
    for (var i=3;i<=m;i+=2) {
        if (n%i==0) return false;
    }
    return true;
}

var numberOfNumbers = 1;
var numberOfPrimes = 0;

for (var sl = 3; sl < 30000; sl += 2) {
    var newNumbersOnTheDiagonal = [];
    for (var n = 0; n < 4; n++) {
        var numberOnTheDiagonal = sl*sl - n*(sl-1);
        newNumbersOnTheDiagonal.push(numberOnTheDiagonal);
    }
    var newPrimesOnTheDiagonal = newNumbersOnTheDiagonal.filter(function(number) {
        return isPrime2(number);
    });
    numberOfNumbers += 4;
    numberOfPrimes += newPrimesOnTheDiagonal.length;
    
    var ratio = numberOfPrimes / numberOfNumbers;
    if (ratio < 0.10) {
        console.log(sl, ratio, numberOfPrimes, numberOfNumbers);
        break;
    }
}
