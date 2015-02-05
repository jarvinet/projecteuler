#include <iostream>
#include <vector>
#include <math.h>
#include "primality.hpp"

// simple implementation of Sieve of Eratosthenes

bool isDivisible(long n, std::vector<long> primes)
{
    for (int i = 0; i < primes.size(); i++) {
        long prime = primes[i];
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

// return truen if n is prime
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

bool prime(long n) 
{
    long upperLimit = long(floor(sqrt(n)));
    std::vector<long> primes = eratosthenes(upperLimit);
    return prime(n, primes);
}

int main()
{
    for (int i = 0; i < 2000; i++) {
        std::cout << i << " " << prime(i) << "\n";
    }
    std::cout << "\n";

}

