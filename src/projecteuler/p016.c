#include <stdio.h>
#include <string.h>


/*
Problem 16

   03 May 2002

   2 ^ 15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

   What is the sum of the digits of the number 2 ^ 1000 ?

 */

// used dc to get the value of 2^1000


char* a = "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376";

int main()
{
    int len = strlen(a);
    int i;
    unsigned long sum =  0;
    for (i = 0; i < len; i++) {
        int n = a[i] - '0';
        sum += n;
    }
    printf("%ld\n", sum);
}

// answer: 1366
