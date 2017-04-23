function isInteger(n) {
    return n == parseInt(n);
}

function isPrime2(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    var m=Math.sqrt(n);
    for (var i=3;i<=m;i+=2) {
        if (n%i==0) return false;
    }
    return true;
}

function findLargestPrimeSmallerThan(n) {
    for (var i = n-1; i > 0; i--) {
        if (isPrime2(i)) {
            return i;
        }
    }
    return undefined;
}

function satisfiesGolbachsOtherConjecture(numberToTest, candidatePrime) {
    var difference = numberToTest-candidatePrime;
    var x = Math.sqrt(difference/2);
    return isInteger(x);
}

function primesLessThan(n) {
    var result = [];
    for (var i = 2; i < n; i++) {
        if (isPrime2(i)) {
            result.push(i);
        }
    }
    return result;
}
          
for (var i = 1; i < 99999; i += 2) {
    if (!isPrime2(i)) {
        var primesLess = primesLessThan(i);
        var canBeExpressedWithThesePrimes = primesLess.some(function(prime) {
            return satisfiesGolbachsOtherConjecture(i, prime);
        });
        console.log(i, canBeExpressedWithThesePrimes);
        if (canBeExpressedWithThesePrimes.length === 0) {
            console.log(i);
        }
    }
}
// 5777 = 109 + 2 * 53^2
