"use strict";

var math = require('mathjs');

math.config({
  number: 'BigNumber', // Default type of number:
                       // 'number' (default), 'BigNumber', or 'Fraction'
  precision: 256       // Number of significant digits for BigNumbers
});

function a(i, n1, n2) {
    if (i > 10) {
        return;
    }
    console.log(i, n2.n, n2.d);
    var n0 = {
        n: 2*n1.n + n2.n,
        d: 2*n1.d + n2.d
    };
    a(i+1, n0, n1);
}

a(1, {n:7, d:5}, {n:3, d:2});
