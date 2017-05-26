#include <iostream>
#include <math.h>

/*
Problem 30

   08 November 2002

   Surprisingly there are only three numbers that can be written as the sum of fourth powers
   of their digits:

     1634 = 1^4 + 6^4 + 3^4 + 4^4
     8208 = 8^4 + 2^4 + 0^4 + 8^4
     9474 = 9^4 + 4^4 + 7^4 + 4^4

   As 1 = 1^4 is not a sum it is not included.

   The sum of these numbers is 1634 + 8208 + 9474 = 19316.

   Find the sum of all the numbers that can be written as the sum of fifth powers of their
   digits.
*/

/*
10000
2^5 = 32
3^5 = 243

99999

One should really establish lower and upper limits for the number, don't know how though.
I just tested all the numbers between 99 and 999999.

*/

typedef unsigned long long ValueType;

/**
 * Put digits of a positive number into an array
 * return the number of digits
 * E.g.
 * number = 48
 * digits will be:
 * digits[0] = 8
 * digits[1] = 4
 * return value will be 2
 */
int fillDigits(int number, int digits[])
{
    int index = 0;
    while (number > 0) {
        int leftmostDigit = number % 10;
        digits[index] = leftmostDigit;
        index++;
        number /= 10;
    }
    return index;
}

int printNumberAndDigits(int number, int nDigits, int digits[])
{
    std::cout << number << " ";
    for (int i = nDigits-1; i >= 0; i--) {
        std::cout << digits[i] << " ";
    } 
    std::cout << "\n";
}

double printNumberAndSumOfPowers(int number, int nDigits, int digits[], int power)
{
    double sum = 0;
    std::cout << number << " ";
    for (int i = nDigits-1; i >= 0; i--) {
        int digit = digits[i];
        double p = pow(digit, power);
        sum += p;
        std::cout << digit << "^" << power << " = " << p << " ";
    } 
    std::cout << " sum: " << sum << "\n";
    return sum;
}

double sumOfPowers(int nDigits, int digits[], int power)
{
    double sum = 0;
    for (int i = nDigits-1; i >= 0; i--) {
        int digit = digits[i];
        double p = pow(digit, power);
        sum += p;
    } 
    return sum;
}

int main()
{
    long sumOfAll = 0;
    for (int i = 99; i < 999999; i++) {
        int digits[9];
        int nDigits = fillDigits(i, digits);
        //printNumberAndDigits(i, nDigits, digits);
        //printNumberAndSumOfPowers(i, nDigits, digits, 2);
        double sop = sumOfPowers(nDigits, digits, 5);
        if (sop == i) {
            std::cout << i << "\n";
            sumOfAll += i;
        }
    }
    std::cout << "sumOfAll: " << sumOfAll << "\n";
    
}
