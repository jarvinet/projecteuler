#include <stdio.h>

/*
Problem 48

   18 July 2003

   The series, 1 ^1 + 2 ^2 + 3 ^3 + ... + 10 ^10 = 10405071317.

   Find the last ten digits of the series, 1 ^1 + 2 ^2 + 3 ^3 + ... + 1000 ^1000 .
*/

/*
  Again, dc is your friend
 */


int main()
{
    int i;
    for (i = 1; i <= 1000; i++) {
        printf("%d %d ^ \n", i, i);
    }
}
