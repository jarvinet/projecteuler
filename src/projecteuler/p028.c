#include <stdio.h>

/*
Problem 28

   11 October 2002

   Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5
   spiral is formed as follows:

   21 22 23 24 25
   20  7  8  9 10
   19  6  1  2 11
   18  5  4  3 12
   17 16 15 14 13

   It can be verified that the sum of both diagonals is 101.

   What is the sum of both diagonals in a 1001 by 1001 spiral formed in the same way?

*/

/*
                 
               73 74 75 76 77 78 79 80 81 82
               72 43 44 45 46 47 48 49 50
               71 42 21 22 23 24 25 26 51
               70 41 20  7  8  9 10 27 52
               69 40 19  6  1  2 11 28 53
               68 39 18  5  4  3 12 29 54
               67 38 17 16 15 14 13 30 55
               66 37 36 35 34 33 32 31 56
               65 64 63 62 61 60 59 58 57

ne:
  1   9  25  49  81
1^2 3^2 5^2 7^2 9^2

se:
1 3 13 31 57

sw:
1 5 17 37 65

nw:
1 7 21 43 73


ne 1^1 3^2-0(3-1) 5^2-0(5-1) 7^2-0(7-1) 1 9 25 49
nw 1^1 3^2-1(3-1) 5^2-1(5-1) 7^2-1(7-1) 1 7 21 43
sw 1^1 3^2-2(3-1) 5^2-2(5-1) 7^2-2(7-1) 1 5 17 37
se 1^1 3^2-3(3-1) 5^2-3(5-1) 7^2-3(7-1) 1 3 13 31

*/

typedef unsigned long ValueType;

int main()
{
    ValueType ne = 0;
    ValueType nw = 0;
    ValueType sw = 0;
    ValueType se = 0;
    int i;
    for (i = 1; i <= 500; i++) {
        int j = i*2+1;
        ne += j*j-0*(j-1);
        nw += j*j-1*(j-1);
        sw += j*j-2*(j-1);
        se += j*j-3*(j-1);
    }
    ValueType result = ne+nw+sw+se+1;
    printf("%d\n", result);
}
