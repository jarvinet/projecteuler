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

var permutations = permutator([9,8,7,6,5,4,3,2,1,0]);

//var permutations = [[1,4,0,6,3,5,7,2,8,9]];

//console.log(permutations);

function isDivisible(n, x) {
    return n%x === 0;
}

function numberAsArrayToNumber(numberAsArray) {
    return numberAsArray.reduce(function(accumulator, currentValue, currentIndex, array) {
        return 10*accumulator+currentValue;
    }, 0);
}

function hasSubstringDivisibility(numberAsArray) {
    var firstPrimes = [2, 3, 5, 7, 11, 13, 17];
    return firstPrimes.reduce(function(accumulator, currentValue, currentIndex, array) {
        var indexToNumberArray = currentIndex + 1;
//        console.log("indexToNumberArray", indexToNumberArray);
        var subNumberAsArray = numberAsArray.slice(indexToNumberArray, indexToNumberArray+3);
//        console.log("subNumberAsArray", subNumberAsArray);
        var subNumberAsNumber = numberAsArrayToNumber(subNumberAsArray);
//        console.log("subNumberAsNumber", subNumberAsNumber);
        return accumulator && isDivisible(subNumberAsNumber, currentValue);
    }, true);
}

var permutationsWithSubstringDivisibility = permutations.filter(hasSubstringDivisibility);

console.log(permutationsWithSubstringDivisibility);

var sum = permutationsWithSubstringDivisibility.reduce(function(accumulator, currentValue, currentIndex, array) {
    var numberAsNumber = numberAsArrayToNumber(currentValue);
    return accumulator+numberAsNumber;
}, 0);

console.log(sum);
