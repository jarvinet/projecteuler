var string = ".";
var i = 1;
while (string.length < 1000010) {
    string += i;
    i++;
}
//console.log(string);

var indexes = [1,10,100,1000,10000,100000,1000000];
var product = indexes.reduce(function(accumulator, currentValue, currentIndex, array) {
    var value = string.charAt(currentValue);
    return accumulator*value;
} ,1);
console.log(product);
