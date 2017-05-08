

function binomialCoefficient(n, k) {
    var product = 1;
    for (var i = 1; i <= k; i++) {
        product *= (n + 1 - i)/i;
    }
    return product;
}
var counter = 0;
for (var n = 1; n <= 100; n++) {
    for (var k = 1; k <= n; k++) {
        var bc = binomialCoefficient(n, k);
        
        console.log(n, k, bc);
        if (bc > 1000000) {
            counter++;
        }
    }
}
console.log('counter', counter);
