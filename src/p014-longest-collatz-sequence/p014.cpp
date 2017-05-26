#include <iostream>
#include <vector>
#include <limits.h>

/*
Problem 14

   05 April 2002

   The following iterative sequence is defined for the set of positive integers:

   n -> n/2 (n is even)
   n -> 3n + 1 (n is odd)

   Using the rule above and starting with 13, we generate the following sequence:
   13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1

   It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms.
   Although it has not been proved yet (Collatz Problem), it is thought that all starting
   numbers finish at 1.

   Which starting number, under one million, produces the longest chain?

   NOTE: Once the chain starts the terms are allowed to go above one million.

 */

typedef unsigned long long ValueType;

ValueType collatz(ValueType n, ValueType calls)
{
    if (n <= 1)
        return calls;
    else if ((n % 2) == 0) // even
        return collatz(n/2, calls+1);
    else // odd
        return collatz(3*n+1, calls+1);
}

int main()
{
    std::cout << "ULONG_MAX: " << ULLONG_MAX << "\n";

    ValueType longest = 0;
    for (int i = 2; i < 1000000; i++) {
        ValueType calls = collatz(i, 1);
        if (calls > longest) {
            longest = calls;
            std::cout << i << ": " << longest << "\n";
        }
        //std::cout << i << ": " << calls << "\n";
    }
}

// answer: 837799
