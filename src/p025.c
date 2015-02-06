#include <math.h>

/*
Problem 25

   30 August 2002

   The Fibonacci sequence is defined by the recurrence relation:

     F(n) = F(n-1) + F(n-2) , where F(1) = 1 and F(2) = 1.

   Hence the first 12 terms will be:

     F _( [1] ) = 1
     F _( [2] ) = 1
     F _( [3] ) = 2
     F _( [4] ) = 3
     F _( [5] ) = 5
     F _( [6] ) = 8
     F _( [7] ) = 13
     F _( [8] ) = 21
     F _( [9] ) = 34
     F _( [10] ) = 55
     F _( [11] ) = 89
     F _( [12] ) = 144

   The 12th term, F _( [12] ) , is the first term to contain three digits.

   What is the first term in the Fibonacci sequence to contain 1000 digits?
*/


/*
floor(log10(n))+1 gives you the number of digits in (base 10) number n

how manyt digits F(1000) has?
log(phi^1000/sqrt(5)), where phi is the golden ratio 1.61

 */

typedef unsigned long long ValueType;

int main()
{
    double sqrt5 = sqrt(5);
    double goldenRatio = (1 + sqrt5)/2;
    double logSqrt5 = log10(sqrt5);
    double logGoldenRatio = log10(goldenRatio);
    ValueType a = 1;
    ValueType b = 1;
    ValueType c;
    int i;
    for (i = 3; i < 9999; i++) {
        c = a+b;
        a = b;
        b = c;
        double numDigits = floor(i*logGoldenRatio-logSqrt5) + 1;
        
        printf("fib%d num digits %f\n", i, numDigits);
#if 0
        if (numDigits > 999) {
            printf("fib%d = %ld num digits %f\n", i, b, numDigits);
        }
#endif
        if (numDigits > 999) {
            break;
        }
    }
}
