"use strict";

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

function isInteger(n) {
    return n == parseInt(n);
}

function isCube(number) {
    return isInteger(Math.cbrt(number));
}

//var arr = [1,2,3,4,5,6,7,8];
//var permutations = permutator(arr);
//console.log(permutations.length);

// 123 -> "123" numberToString
function numberToString(number) {
    return number.toString();
}

// "123" -> ['1', '2', '3'] stringToArray
function stringToArray(string) {
    return string.split('');
}

// ['1', '2', '3'] -> "123" arrayToString
function arrayToString(arr) {
    return arr.join('');
}

// "123" -> 123 stringToNumber
function stringToNumber(string) {
    return parseInt(string);
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

function testCube(number) {
    var permutations = permutator(stringToArray(numberToString(number)));
//    console.log(permutations.length);
    var permutationsAsNumbers = permutations.map(function(permutation) {
        return stringToNumber(arrayToString(permutation));
    });
    var duplicatesRemoved = removeDuplicates(permutationsAsNumbers);
    var cubes = duplicatesRemoved.filter(function(number) {
        return isCube(number);
    });
    return {
        'numberOfPermutations': permutations.length,
        'cubes': cubes
    };
}

//console.log(testCube(41063625));
//console.log(testCube(279));

function test() {
    for (var i = 1000; i < 1200; i++) {
        var cube = i*i*i;
        var cubes = testCube(cube);
        console.log(i, cube, cubes.numberOfPermutations, cubes.cubes);
        if (cubes.length === 5) {
            console.log(cubes);
        }
    }
}

