
/*
Problem 6

   14 December 2001

   The sum of the squares of the first ten natural numbers is,
   1 ^ 2 + 2 ^ 2 + ... + 10 ^ 2 = 385

   The square of the sum of the first ten natural numbers is,
   (1 + 2 + ... + 10) ^ 2 = 55 ^ 2 = 3025

   Hence the difference between the sum of the squares of the first ten natural numbers and
   the square of the sum is 3025 - 385 = 2640.

   Find  the difference between the sum of the squares of the first one hundred natural
   numbers and the square of the sum.

*/


int main()
{
    int i;
    long sum = 0;
    long sumSquares = 0;
    for (i = 1; i <= 100; i++) {
        sum += i;
        sumSquares += i*i;
        printf("i = %d, sum = %d, sumSquares = %d\n", i, sum, sumSquares);
    }
    long squareSum = sum*sum;
    long diff = squareSum - sumSquares;
    printf("%d\n", diff);
}

// 25164150
