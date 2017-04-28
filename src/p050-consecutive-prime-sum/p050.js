function isPrime2(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    var m=Math.sqrt(n);
    for (var i=3;i<=m;i+=2) {
        if (n%i==0) return false;
    }
    return true;
}

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

function sumArray(array) {
    return array.reduce(function(accumulator, currentValue, currentIndex, array) {
        return accumulator + currentValue;
    }, 0);
}

function primesBetweenIndexes(primes, i, j) {
    return primes.filter(function(element, index, array) {
        return index >= i && index <= j;
    });
}

function f(limit) {
    var primes = findPrimes(genArray(2, limit));
    console.log(primes.length);
    
    var maxLength = 0;
    var maxPrime = 0;
    for (var i = primes.length; i >= 0; i--) {
        var prime = primes[i];
        for (var startingPosition = 0; startingPosition < i/2; startingPosition++) {
            var sum = 0;
            var sumLength = 0;
            for (var j = startingPosition; sum < prime; j++) {
                var primeToAdd = primes[j];
                sum += primeToAdd;
                sumLength++;
            }
            if (sumLength > maxLength && sum === prime) {
                maxLength = sumLength;
                maxPrime = prime;
                console.log(maxPrime, maxLength);
            }
        }
    }
    console.log(maxPrime, maxLength);
}

f(1000000);
