#include <iostream>
#include <vector>
#include <math.h>
#include <limits.h>


/*
Problem 10

   08 February 2002

   The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

   Find the sum of all the primes below two million.

*/


// unsigned long long type work on compiler g++ 3.4.6
typedef unsigned long long ValueType;

// simple implementation of Sieve of Eratosthenes

bool isDivisible(long n, std::vector<long> primes)
{
    for (int i = 0; i < primes.size(); i++) {
        long prime = primes[i];
        // if prime is larger than sqrt(n) then quit loop
        // if prime*prime > n then quit loop
        if (prime*prime > n)
            break;
        if ((n % prime) == 0)
            return true;
    }
    return false;
}

// return a vector of primes that are smaller than n
std::vector<long> eratosthenes(long n)
{
    std::vector<long> primes;

    for (long i = 2; i < n; i++) {
        if (!isDivisible(i, primes)) {
            primes.push_back(i);
        }
    }

    return primes;
}

// return true if n is prime
bool naive(long n)
{
    if (n == 2)
        return true;

    if ((n % 2) == 0)
        return false;

    long upperLimit = long(floor(sqrt(n)));
    for (long i = 3; i <= upperLimit; i+= 2) {
        if ((n % i) == 0)
            return false;
    }
    return true;
}

bool prime(long n, std::vector<long> primes)
{
    if (isDivisible(n, primes))
        return false;
    
    return naive(n);
}

int main()
{
    std::cout << "ULONG_MAX: " << ULLONG_MAX << "\n";


    std::vector<long> eprimes = eratosthenes(1500);
    std::vector<long> primes;
    ValueType sum = 0;
    for (unsigned long i = 2; i < 2000000; i++) {
        if (prime(i, eprimes)) {
            ValueType newSum = sum + i;
            if (newSum < sum) {
                // overflow
                std::cout << "Overflow!\n";
            }
            sum = newSum;
            //primes.push_back(i);
            //std::cout << primes.size() << ": " << i << "\n";
            std::cout << i << " " << sum << "\n";
        }
    }
    std::cout << sum << "\n";

}


// answer: 142913828922

