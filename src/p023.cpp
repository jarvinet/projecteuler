#include <iostream>
#include <vector>
#include <map>
#include <set>

/*
Problem 23

   02 August 2002

   A perfect number is a number for which the sum of its proper divisors is exactly equal to
   the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14
   = 28, which means that 28 is a perfect number.

   A number whose proper divisors are less than the number is called deficient and a number
   whose proper divisors exceed the number is called abundant.

   As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that
   can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can
   be shown that all integers greater than 28123 can be written as the sum of two abundant
   numbers. However, this upper limit cannot be reduced any further by analysis even though
   it is known that the greatest number that cannot be expressed as the sum of two abundant
   numbers is less than this limit.

   Find  the sum of all the positive integers which cannot be written as the sum of two
   abundant numbers.

*/

typedef unsigned int ValueType;

std::map<int,int> sumOfDivisors;

ValueType sumOfProperDivisors(int n)
{
    std::vector<int> divisors;
    int upperLimit = n;
    for (int i = 1; i < upperLimit; i++) {
        if ((n % i) == 0)
            divisors.push_back(i);
    }
    ValueType sum = 0;
    for (int i = 0, sz = divisors.size(); i < sz; i++)
        sum += divisors[i];
    return sum;
}

ValueType cachedSumOfProperDivisors(int n)
{
    std::map<int,int>::iterator i = sumOfDivisors.find(n);
    ValueType sum;
    if (i == sumOfDivisors.end()) {
        // not found
        sum = sumOfProperDivisors(n);
        sumOfDivisors.insert(std::make_pair(n, sum));
    } else {
        // found
        sum = i->second;
    }
    return sum;
}

int main()
{
    std::vector<ValueType> abundantNumbers;


    // find all abundant numbers less than
    for (int i = 1; i <= 28123; i++) {

        ValueType sum = cachedSumOfProperDivisors(i);
        if (sum > i) {
            // i is an abundant number
            abundantNumbers.push_back(i);
        }
    }


#if 0
    std::cout << "abundantNumbers" << "\n";;
    for (std::vector<ValueType>::iterator i1 = abundantNumbers.begin(); i1 != abundantNumbers.end(); ++i1) {
        std::cout << *i1 << "\n";;
    }
    std::cout << "abundantNumbers" << "\n";;
#endif

    // add all pairs of abundant numbers together
    std::set<int> sums; // sums of two abundant numbers
    for (std::vector<ValueType>::iterator i1 = abundantNumbers.begin(); i1 != abundantNumbers.end(); ++i1) {
        for (std::vector<ValueType>::iterator i2 = abundantNumbers.begin(); i2 != abundantNumbers.end(); ++i2) {
            int sum = *i1 + *i2;
            sums.insert(sum);
        }
    }
#if 0
    std::cout << "sums of abundantNumbers" << "\n";;
    for (std::set<int>::iterator i = sums.begin(); i != sums.end(); ++i) {
        std::cout << *i << "\n";
    }
    std::cout << "sums of abundantNumbers" << "\n";;
#endif

    // find all numbers that are not sums of two abundant numbers
    ValueType sum = 0;
    for (int i = 1; i <= 28123; i++) {
        std::set<int>::iterator iter = sums.find(i);
        if (iter == sums.end()) {
            // not found 
            sum += i;
            //std::cout << "i: " << i << " sum: " << sum << "\n";
        }
    }
    std::cout << "Number of abundant numbers: " << abundantNumbers.size() << "\n";
    std::cout << "Number of sums of two abundant numbers: " << sums.size() << "\n";
    std::cout << "Sum of abundant numbers: " << sum << "\n";

}
