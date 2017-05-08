// xx2x37

// 3xx3x7
// 300307
// 311317
// 322327

0,1,2

for (var changingDigit = 0; changingDigit < 3; changingDigit++) {
    
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

function numberAsArrayToNumber(numberAsArray) {
    return numberAsArray.reduce(function(accumulator, currentValue, currentIndex, array) {
        return 10*accumulator+currentValue;
    }, 0);
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

function findIndexesWhereDigitIsWithinNumber(numberAsArray, changingDigit) {
    var result = numberAsArray.reduce(function(accumulator, currentValue, index, array) {
        if (currentValue === changingDigit) {
            accumulator.push(index);
        }
        return accumulator;
    }, []);
    return result;
}

function replaceDigitsAtIndexesWith(numberAsArray, indexes, digitToReplaceWith) {
    indexes.forEach(function(currentValue, index, array) {
        numberAsArray.splice(currentValue, 1, digitToReplaceWith);
    });
}

function testPrimeFamily(numberAsArray, changingDigit) {
    var result = [];
    var indexesWhereDigitIsWithinNumber = findIndexesWhereDigitIsWithinNumber(numberAsArray, changingDigit);
    while (changingDigit < 10) {
        replaceDigitsAtIndexesWith(numberAsArray, indexesWhereDigitIsWithinNumber, changingDigit);
        changingDigit++;
        var numberAsNumber = numberAsArrayToNumber(numberAsArray);
        if (isPrime2(numberAsNumber)) {
            result.push(numberAsNumber);
        }
    }
    return result;
}

var allDigits = [0,1,2,3,4,5,6,7,8,9];

[0,1,2].forEach(function (changingDigit) {
    var firstDigits = allDigits.filter(function (digit) {return digit !== changingDigit});
    var secondDigits = allDigits.filter(function (digit) {return digit !== changingDigit});
    
    firstDigits.forEach(function (firstDigit) {
        secondDigits.forEach(function (secondDigit) {
            var testNumber = [changingDigit, changingDigit, changingDigit, firstDigit, secondDigit];
            var permutations = permutator(testNumber);
            permutations.forEach(function (permutation) {
                [1,3,7,9].forEach(function (lastDigit) {
                    var n = permutation.concat([lastDigit]);
                    var number = numberAsArrayToNumber(n);
                    var primesAsArray = testPrimeFamily(n, changingDigit);
                    if (primesAsArray.length > 7) {
                        console.log(primesAsArray);
                    }
                });
            });
        });
    });
});
