function generateNthTriangleNumber(n) {
    return n*(n+1)/2;
}

function isPentagonalNumber(n) {
    var x = (Math.sqrt(24*n+1)+1)/6;
    return isInteger(x);
}

function isHexagonalNumber(n) {
    var x = (Math.sqrt(8*n+1)+1)/4;
    return isInteger(x);
}

function isInteger(n) {
    return n == parseInt(n);
}

for (var i = 1; i < 99999; i++) {
    var t = generateNthTriangleNumber(i);
    if (isPentagonalNumber(t)) {
        console.log(i, "th triangle number", t, "is also a pentagonal number");
        if (isHexagonalNumber(t)) {
            console.log(i, "th triangle number", t, "is also a hexagonal number");
        }
    }
}
