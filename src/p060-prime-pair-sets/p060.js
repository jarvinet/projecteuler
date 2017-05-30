"use strict";

function sieve(firstItem, arr) {
    return arr.filter(function(item) {
        return item % firstItem > 0;
    });
}

function findPrimes(arr) {
    var primes = [];
    while (arr.length > 0) {
        var firstItem = arr[0];
        primes.push(firstItem);
        arr = sieve(firstItem, arr);
    }
    return primes;
}

function genArray(start, end) {
    var result =[];
    for (var i = start; i < end; i++) {
        result.push(i);
    }
    return result;
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

function removeDuplicates(array) {
    return array.reduce(function(accumulator, currentValue, currentIndex, array) {
        if (accumulator.indexOf(currentValue) < 0) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
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

function satisfies(arr) {
    var permutations = permutator(arr);
    //console.log('permutations', permutations);
    var firstTwoConcatenated = permutations.map(function(permutation) {
        return parseInt('' + permutation[0] + permutation[1]);
    });
    var duplicatesRemoved = removeDuplicates(firstTwoConcatenated);
    //console.log('duplicatesRemoved', duplicatesRemoved);

    var notPrimes = duplicatesRemoved.filter(function(primeCandidate) {
        return !isPrime2(primeCandidate);
    });
    //console.log('notPrimes', notPrimes);
    return notPrimes.length === 0;
}

var primes = findPrimes(genArray(2,9999));
var candidatePrimes = [];

function a(requiredLength, candidatePrimes, primes) {
    for (var i = 0; i < primes.length; i++) {
        var candidates = candidatePrimes.concat(primes[i]);
        if (satisfies(candidates)) {
            if (candidates.length >= requiredLength) {
                return candidates;
            }
            var b = a(requiredLength, candidates, primes);
            if (b.length > 0) {
                return b;
            }
        }
    }
    return [];
}

console.log(a(5, candidatePrimes, primes));
