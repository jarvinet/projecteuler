function isInteger(n) {
    return n == parseInt(n);
}


function isPentagonalNumber(n) {
    var x = (Math.sqrt(24*n+1)+1)/6;
    return isInteger(x);
}

 // for (var i = 0; i < 200; i++) {
 //     console.log(i, isPentagonalNumber(i));
 // }

function nthPentagonalNumber(n) {
    return (3*n*n - n)/2;
}

for (var i = 1; i < 9999; i++) {
    var a = nthPentagonalNumber(i);
    for (var j = 1; j < 9999; j++) {
        var b = nthPentagonalNumber(j);
        console.log("two pentagonal numbers", a, b);
        var sum = a+b;
        if (isPentagonalNumber(sum)) {
            console.log("their sum is pentagonal", sum);
            var diff = Math.abs(a-b);
            if (isPentagonalNumber(diff)) {
                console.log("their difference is pentagonal", diff);
            }                    
        }
    }
}
