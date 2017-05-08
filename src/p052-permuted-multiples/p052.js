
function removeStringFromArrayOfStrings(stringToRemove, arrayOfStrings) {
    var index = arrayOfStrings.indexOf(stringToRemove)
    if (index >= 0) {
        var deletedElements = arrayOfStrings.splice(index, 1);
    }
    return arrayOfStrings;
}

function removeStringFromArrayOfArrayOfStrings(stringToRemove, arrayOfArrayOfStrings) {
    return arrayOfArrayOfStrings.map(function(arrayOfStrings) {
        return removeStringFromArrayOfStrings(stringToRemove, arrayOfStrings);
    });
}

function arePermutations(arrayOfArrayOfStrings) {
    var firstArray = arrayOfArrayOfStrings[0];
    while (firstArray.length > 0) {
        var stringToRemove = firstArray[0];
        arrayOfArrayOfStrings = removeStringFromArrayOfArrayOfStrings(stringToRemove, arrayOfArrayOfStrings);
        firstArray = arrayOfArrayOfStrings[0];
    }
    return areAllArraysInArraysEmpty(arrayOfArrayOfStrings);
}

function areAllArraysInArraysEmpty(numbersAsArrays) {
    var isSomeNonEmpty = numbersAsArrays.some(function(currentValue, index, array) {
        return currentValue.length > 0;
    });
    return !isSomeNonEmpty;
}

function numberToArrayOfStrings(number) {
    return number.toString().split("");
}

function f(number, multiplies) {
    
    var arrayOfNumbers = multiplies.map(function(currentValue, index, array) {
        return currentValue*number;
    });

    var arrayOfArrayOfStrings = arrayOfNumbers.map(function(currentValue, index, array) {
        return numberToArrayOfStrings(currentValue);
    });

    var arePerms = arePermutations(arrayOfArrayOfStrings);
    if (arePerms) {
        console.log('arePermutations', arePerms);
        console.log(arrayOfNumbers);
    }
}

//f(125874, [1,2]);
//f(12874, [1,2]);

for (var i = 100000; i < 999999; i++) {
    f(i, [1,2,3,4,5,6]);
}

