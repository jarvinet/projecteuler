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

function isInteger(n) {
    return n == parseInt(n);
}

function isSquareNumber(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
}

function isTriangleNumber(n) {
    return isSquareNumber(8*n+1);
}

function generateNthTriangleNumber(n) {
    return n*(n+1)/2;
}

function isPentagonalNumber(n) {
    var x = (Math.sqrt(24*n+1)+1)/6;
    return isInteger(x);
}

function generateNthPentagonalNumber(n) {
    return (3*n*n - n)/2;
}

function isHexagonalNumber(n) {
    var x = (Math.sqrt(8*n+1)+1)/4;
    return isInteger(x);
}

function generateNthHexagonalNumber(n) {
    return n*(2*n-1);
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

function getFactors(num) {
    const isEven = num % 2 === 0;
    let inc = isEven ? 1 : 2;
    let factors = [1, num];

    for (let curFactor = isEven ? 2 : 3; Math.pow(curFactor, 2) <= num; curFactor += inc) {
        if (num % curFactor !== 0) continue;
        factors.push(curFactor);
        let compliment = num / curFactor;
        if (compliment !== curFactor) factors.push(compliment);
    }
    
    return factors;
}

function factor(n) {
    if (isNaN(n) || !isFinite(n) || n%1!=0 || n==0) return ''+n;
    if (n<0) return '-'+factor(-n);
    var minFactor = leastFactor(n);
    if (n==minFactor) return ''+n;
    return minFactor+'*'+factor(n/minFactor);
}

// find the least factor in n by trial division
function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;  
    if (n==0) return 0;  
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;  
    if (n%3==0) return 3;  
    if (n%5==0) return 5;  
    var m = Math.sqrt(n);
    for (var i=7;i<=m;i+=30) {
        if (n%i==0)      return i;
        if (n%(i+4)==0)  return i+4;
        if (n%(i+6)==0)  return i+6;
        if (n%(i+10)==0) return i+10;
        if (n%(i+12)==0) return i+12;
        if (n%(i+16)==0) return i+16;
        if (n%(i+22)==0) return i+22;
        if (n%(i+24)==0) return i+24;
    }
    return n;
}
