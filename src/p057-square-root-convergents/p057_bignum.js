"use strict";

var math = require('mathjs');

math.config({
    number: 'BigNumber', // Default type of number:
                         // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 256       // Number of significant digits for BigNumbers
});

function a(i, matching, n1, n2) {
    if (i > 1000) {
        return matching;
    }
    var n2n = math.format(n2.n, {notation:'fixed'});
    var n2d = math.format(n2.d, {notation:'fixed'});
    if (n2n.length > n2d.length) {
        matching++;
    }
    console.log(i, matching, n2n, n2d);
    var n0 = {
        n: math.chain(2).multiply(n1.n).add(n2.n).done(),
        d: math.chain(2).multiply(n1.d).add(n2.d).done()
    };
    return a(i+1, matching, n0, n1);
}

var numberOfMatching = a(1,
  0,
  {
      n:math.bignumber(7),
      d:math.bignumber(5)
  },
  {
      n:math.bignumber(3),
      d:math.bignumber(2)
  });

console.log('number of fractions where nominator has more digits than denominator', numberOfMatching);
