"use strict";

function numberOfDigitsInNumber(n) {
    return Math.floor(Math.log10(n))+1;
}

function solve() {
    var match = 0;
    for (var b = 1; b <= 10; b++) {
        for (var e = 1; e <= 30; e++) {
            var n = Math.pow(b, e);
            var nd = numberOfDigitsInNumber(n);
            console.log(b, e, n, nd);
            if (nd === e) {
                match++;
            }
        }
    }
    return  match;
}

console.log('answer', solve());
