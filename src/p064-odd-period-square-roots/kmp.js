
// Knuth Morris Pratt
// http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/
// https://apps.topcoder.com/forums/?module=Thread&threadID=732619&start=0&mc=12

// partial matching table

// abcd, a, ab, abc
function properPrefixes(array) {
    var result = [];
    for (var end = 1; end < array.length; end++) {
        result.push(array.slice(0, end));
    }
    return result;
}

// abcd, bcd, cd, d
function properSuffixes(array) {
    var result = [];
    for (var start = 1; start < array.length; start++) {
        result.push(array.slice(start, array.length));
    }
    return result;
}

function arrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function isInArray(item, arr) {
    return arr.some(function(currentValue, index, array) {
        return arrayEqual(item, currentValue);
    });
}

function setIntersection(arr1, arr2) {
    return arr1.filter(function(currentValue, index, array) {
        return isInArray(currentValue, arr2);
    });
}

function findLongestElement(arr) {
    return arr.reduce(function(accumulator, currentValue, index, array) {
        return currentValue.length > accumulator ? currentValue.length : accumulator;
    }, 0);
}

function partialMatchingTable(arr) {
    return arr.map(function(currentValue, index, array) {
        var substring = array.slice(0, index+1);
        var suffixes = properSuffixes(substring);
        var prefixes = properPrefixes(substring);
        var intersection = setIntersection(suffixes, prefixes);
        var longest = findLongestElement(intersection);
        return longest;
    });
}

function findFirstIndexWhereValueIsGreaterThanOrEqualTo(n, matchingTable) {
    var result = -1;
    for (var i = 0; i < matchingTable.length; i++) {
        if (matchingTable[i] >= n) {
            result = i;
            break;
        }
    }
    return result;
}

function findPeriod(str) {
    var length = str.length;
    var doubleArray = (str+str).split('');
    var matchingTable = partialMatchingTable(doubleArray);
    var index = findFirstIndexWhereValueIsGreaterThanOrEqualTo(length, matchingTable);
    var period = index-length+1;
    return period;
}

var str;
str = "111161111611";
console.log(str, findPeriod(str));
str = "ab";
console.log(str, findPeriod(str));

//console.log(partialMatchingTable("aba".split('')));
//console.log(partialMatchingTable("abaabaabaaba".split('')));

// var test = [1,2,3,4,5,6];
// console.log(properPrefixes(test));
// console.log(properSuffixes(test));

// test = "hagrid".split('');
// console.log(properPrefixes(test));
// console.log(properSuffixes(test));

// test = "snape".split('');
// console.log(properPrefixes(test));
// console.log(properSuffixes(test));
