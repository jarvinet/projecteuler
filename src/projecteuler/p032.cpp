#include <iostream>
#include <math.h>
#include <set>

/*
Problem 32

   06 December 2002

   We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n
   exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigitial.

   The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand,
   multiplier, and product is 1 through 9 pandigital.

   Find the sum of all products whose multiplicand/multiplier/product identity can be written
   as a 1 through 9 pandigital.
   HINT: Some products can be obtained in more than one way so be sure to only include it
   once in your sum.
*/


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

int stuffArray(int numDigits, int digits[], int numDigitsA, int digitsA[])
{
    for (int i = 0; i < numDigitsA; i++) {
        digits[numDigits + i] = digitsA[i];
    }
    return numDigits + numDigitsA;
}

int compare(const void* a, const void* b)
{
    return ( *(int*)a - *(int*)b );
}

bool isPandigital(int numDigits, int digits[])
{
    qsort(digits, numDigits, sizeof(int), compare);
    for (int i = 0 ; i < numDigits; i++) {
        if (digits[i] != i+1)
            return false;
    }
    return true;
}

int main()
{
    std::set<int> products;
    for (int i = 2; i < 9999; i++) {
        for (int j = 2; j < 9999; j++) {
            int k = i*j;
            int digitsI[10];
            int digitsJ[10];
            int digitsK[10];
            int numDigitsI = fillDigits(i, digitsI);
            int numDigitsJ = fillDigits(j, digitsJ);
            int numDigitsK = fillDigits(k, digitsK);
            int nDigits = numDigitsI + numDigitsJ + numDigitsK;
            if (nDigits < 9)
                continue; // jump to next in the inner loop
            if (nDigits > 9)
                break; // jump to next in outer loop

            // we have nine digits, see if the identity is pandigital
            // stuff all in same array
            int digits[10];
            int numDigits = 0;
            numDigits = stuffArray(numDigits, digits, numDigitsI, digitsI);
            numDigits = stuffArray(numDigits, digits, numDigitsJ, digitsJ);
            numDigits = stuffArray(numDigits, digits, numDigitsK, digitsK);

            if (isPandigital(numDigits, digits)) {
                std::cout << "i " << i << " j " << j << " k " << k << " numDigits " << numDigits << "\n";
                products.insert(k);
            }
        }
    }

    
    std::cout << "unique products: " << "\n";
    int sum = 0;
    for (std::set<int>::const_iterator i = products.begin(); i != products.end(); ++i) {
        sum += *i;
        std::cout << *i << "\n";
    }
    std::cout << "sum: " << sum << "\n";
}
