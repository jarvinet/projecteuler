var result = [];
for (var i = 0; i < 1000; i++) {
    result[i] = [];
}
for (var perimeter = 1; perimeter < 1000; perimeter++) {
    for (var b = 1; b < perimeter/2; b++) {
        var c = perimeter/2 - b;
        var a = Math.sqrt(b*b + c*c);
        if (a == parseInt(a)) {
            result[a+b+c].push({a,b,c});
        }
    }
}
for (var i = 0; i < 1000; i++) {
    if (result[i].length > 0) {
        console.log(i, result[i]);
    }
}
