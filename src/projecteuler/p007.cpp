#include <iostream>
#include <vector>

/*
Problem 7

   28 December 2001

   By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

   What is the 10001st prime number?

*/

bool isDivisible(long n, std::vector<long> primes)
{
    for (int i = 0; i < primes.size(); i++) {
        long prime = primes[i];
        if ((n % prime) == 0)
            return true;
    }
    return false;
}

int main()
{
    std::vector<long> primes;

    for (long i = 2; primes.size() < 10005; i++) {
        if (!isDivisible(i, primes)) {
            primes.push_back(i);
            std::cout << primes.size() << ": " << i << "\n";
        }
    }
    std::cout << primes[10001] << "\n";
}


// answer: 104743
