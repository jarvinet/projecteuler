"use strict";

const util = require('util')

function isPrime2(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    var m=Math.sqrt(n);
    for (var i=3;i<=m;i+=2) {
        if (n%i==0) return false;
    }
    return true;
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

function arrayMin(arrayOfNumbers) {
    return arrayOfNumbers.reduce(function(accumulator, currentValue, currentIndex, array) {
        return Math.min(accumulator, currentValue);
    }, Number.MAX_VALUE);
}

function convertNumberToIndividualDigits(n) {
    return n.toString().split("");
}

function removeDuplicatesFromArray(digitsAsStrings) {
    return digitsAsStrings.reduce(function(accumulator, currentValue, currentIndex, array) {
        if (accumulator.indexOf(currentValue) === -1) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
}

function convertArrayOfStringsToNumber(arrayOfStrings) {
    return arrayOfStrings.map(function(digitPermutationAsString) {
        return parseInt(digitPermutationAsString.join(""));
    });
}

function logit(obj) {
    return util.inspect(obj, false, null);
}

function a(parent, array) {
    var parentRemoved = array.filter(function(number) {
        return number !== parent;
    });
        
    return parentRemoved.map(function(item) {
        return {
            'number': item,
            'distanceToParent': Math.abs(parent-item),
            'children': a(item, parentRemoved)
        };
    });
}

function printer(level, objects, line) {
    if (level === 3) {
        console.log(line);
    }
    objects.forEach(function(object) {
        printer(level+1, object.children, line.concat([object.number, object.distanceToParent]));
    });
}

function removeDuplicates(array){
    var result = [];
    array.forEach(function(item){
        if (result.indexOf(item) < 0) {
            result.push(item);
        }
    });
    return result;
}

function findPrimePermutations(n) {
    //    console.log("n", n);

    var digitsAsStrings = convertNumberToIndividualDigits(n);
//    console.log("digitsAsStrings", digitsAsStrings);

//    var duplicatesRemoved = removeDuplicatesFromArray(digitsAsStrings);
    
    var digitPermutationsAsStrings = permutator(digitsAsStrings);
//    console.log("digitPermutationsAsStrings", digitPermutationsAsStrings);

    // convert to numbers
    var permutationsAsNumbers = convertArrayOfStringsToNumber(digitPermutationsAsStrings);
//   console.log("permutationsAsNumbers",permutationsAsNumbers);
    
    // remove numbers that are less than 1000
    var smallOnesRemoved = permutationsAsNumbers.filter(function(number) {
        return number > 999;
    });

    //    console.log("permutationsAsNumbers", permutationsAsNumbers);
    var permutationsThatArePrimes = smallOnesRemoved.filter(isPrime2);
//    console.log("permutationsThatArePrimes", permutationsThatArePrimes);

    var hash = {};
    permutationsThatArePrimes.forEach(function(prime1) {
        permutationsThatArePrimes.forEach(function(prime2) {
            var distance = Math.abs(prime1-prime2);
            if (!hash[distance]) {
                hash[distance] = [];
            }
            hash[distance].push(prime1);
            hash[distance].push(prime2);
        })
    });
    Object.keys(hash).forEach(function(key){
        hash[key] = removeDuplicates(hash[key]);
    });
    Object.keys(hash).forEach(function(key){
        if (key > 0 && hash[key].length === 3) {
            console.log(key, hash[key]);
        }
    });
//    console.log(hash);
    
//    var tree = a(0, permutationsThatArePrimes);
//    console.log(logit(tree));
//    printer(0, tree, []);
//    console.log("file", file);
}

// var tree = a(0, [1487, 4817, 8147]);
// console.log(logit(tree));
// var file = [];
// printer(0, tree, [], file);
// console.log("file", file);

//findPrimePermutations(9629);

for (var i = 1000; i < 9999; i++) {
    if (isPrime2(i)) {
        findPrimePermutations(i);
    }
}
// console.log(9629, isPrime2(9629));
