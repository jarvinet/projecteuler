#include <iostream>
#include <vector>
#include <math.h>
#include <limits.h>

/*
Problem 27

   27 September 2002

   Euler published the remarkable quadratic formula:

   n^2 + n + 41

   It turns out that the formula will produce 40 primes for the consecutive values n = 0 to
   39. However, when n = 40, 40 ^( ^2 ) + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, and
   certainly when n = 41, 41² + 41 + 41 is clearly divisible by 41.

   Using computers, the incredible formula  n^2 - 79n + 1601 was discovered, which produces 80
   primes for the consecutive values n = 0 to 79. The product of the coefficients, -79 and
   1601, is -126479.

   Considering quadratics of the form:

     n^2 + an + b, where |a| < 1000 and |b| < 1000

   where |n| is the modulus/absolute value of n
   e.g. |11| = 11 and |-4| = 4

   Find the product of the coefficients, a and b, for the quadratic expression that produces
   the maximum number of primes for consecutive values of n, starting with n = 0.
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
    std::vector<long> eprimes = eratosthenes(1500);
    int maxPrimes = 0;
    int maxA = -1000;
    int maxB = -1000;

    for (int a = -999; a <= 999; a++) {
        //std::cout << "a: " << a << "\n";
        for (int b = -999; b <= 999; b++) {
            int primes = 0;
            for (int n = 0; n < 99; n++) {
                int val = n*n + a*n + b;
                //std::cout << "val: " << val << "\n";
                if (prime(abs(val), eprimes)) {
                    primes++;
                } else {
                    break;
                }
            }
            if (primes > maxPrimes) {
                maxPrimes = primes;
                maxA = a;
                maxB = b;
                std::cout << "a: " << a << " b: " << b << " primes: " << primes << "\n";
            }
        }
    }
    std::cout << "maxA: " << maxA << " maxB: " << maxB << " maxA*maxB (Answer): " << maxA*maxB << "\n";

    return 0;
}
