function isInteger(n) {
    return n == parseInt(n);
}

// This version has the fewest lines of code - but is very slow.
// It checks if n is dividible by every integer 2, 3, 4, 5 ... 
// up to sqrt(n)

function isPrime1(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    var m=Math.sqrt(n);
    for (var i=2;i<=m;i++) if (n%i==0) return false;
    return true;
}

// The next version is better: it checks the divisor 2 separately;
// then, it proceeds to check odd divisors only, from 3 up to sqrt(n).
// At most half of the numbers between 3 and sqrt(n) are checked.

function isPrime2(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    var m=Math.sqrt(n);
    for (var i=3;i<=m;i+=2) {
        if (n%i==0) return false;
    }
    return true;
}

// Even better: first, check if n is divisible by 2 or 3.
// Then check only the odd divisors that are not multiples of 3.
// At most 1/3 of divisors under sqrt(n) are checked;
// other divisors are multiples of either 2 or 3 anyway.

function isPrime3(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    if (n%3==0) return (n==3);
    var m=Math.sqrt(n);
    for (var i=5;i<=m;i+=6) {
        if (n%i==0)     return false;
        if (n%(i+2)==0) return false;
    }
    return true;
}

function numberOfDigitsInNumber(n) {
    return Math.floor(Math.log10(n))+1;
}

var isSquareNumber = function (n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};

function isTriangleNumber(n) {
    return isSquareNumber(8*n+1);
}

function permutator(inputArr) {
    var results = [];
    
    function permute(arr, memo) {
        var cur, memo = memo || [];
        
        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }
        
        return results;
    }
    
    return permute(inputArr);
}

