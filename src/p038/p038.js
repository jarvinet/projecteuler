
function hasAllDigits(array) {
    for (var i = 1; i <= 9; i++) {
        if (array.indexOf(i.toString()) === -1) {
            return false;
        }
    }
    return true;
}

for (var i = 9267; i < 9999; i++) {
    var i2 = 2*i;
    var concatenated = ""+i+i2;
//    console.log("concatenated "+concatenated);
    var array = Array.from(concatenated);
//    console.log("array "+array);
    if (hasAllDigits(array)) {
        console.log("***"+concatenated);
    }
}


