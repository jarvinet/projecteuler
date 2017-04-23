function mul(n) {
    var result = 1;
    for (var i = 1; i<=n; i++) {
        result = result * n;
        result = result % 10000000000;
    }
    return result;
}

function sum(n) {
    var result = 0;
    for (var i = 1; i<=n; i++) {
        result = result + mul(i);
        result = result % 10000000000;
    }
    return result;
}

console.log(sum(1000));
