/*

Problem 9

   25 January 2002

   A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
   a ^ 2 + b ^ 2 = c ^2

   For example, 3 ^ 2  + 4 ^ 2 = 9 + 16 = 25 = 5 ^ 2 .

   There exists exactly one Pythagorean triplet for which a + b + c = 1000.
   Find the product abc.
*/


int main()
{
    int a,b,c;

    for (a = 1; a < 1000; a++) {
        for (b = a; b < 1000; b++) {
            for (c = b; c < 1000; c++) {
                if (((a*a + b*b) == c*c) && a+b+c == 1000)
                    printf("%d %d %d %d\n", a, b, c, a*b*c);
            }
        }
    }
}

// a=200 b=375 c=425
