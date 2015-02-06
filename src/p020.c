#include <stdio.h>

/*
Problem 20

   21 June 2002

   n! means n x (n - 1) x ... x 3 x 2 x 1

   Find the sum of the digits in the number 100!
*/

// this is the value of 100!
char* a = "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000";

int main()
{
    int i;
    int sum = 0;
    for (i = 0; i < strlen(a); i++) {
        int digit = a[i] - '0';
        sum += digit;
        printf("%d\n", sum);
    }
}

// sum of digits in 100! = 648
