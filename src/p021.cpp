#include <iostream>
#include <vector>
#include <map>

/*
Problem 21

   05 July 2002

   Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide
   evenly into n).
   If d(a) = b and d(b) = a, where a != b, then a and b are an amicable pair and each of a and
   b are called amicable numbers.

   For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110;
   therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) =
   220.

   Evaluate the sum of all the amicable numbers under 10000.
*/

/*
foreach i 1 to 10000
  b = proper divisors of i
  c = sum of b
  d = proper divisors of c
  e = sum of d
  if (i == e) then (i,d) is an amicable pair
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
    // if (i,j) is an amicable pair then (j,i) is also
    // maintain a cache of amicable pairs (j,i) found so far
    // 
    std::map<int,int> amicablePairs;

    for (int i = 1; i <= 10000; i++) {
        std::map<int,int>::iterator iter = amicablePairs.find(i);
        if (iter != amicablePairs.end())
            continue;

        ValueType j = cachedSumOfProperDivisors(i);
        ValueType k = cachedSumOfProperDivisors(j);
        if (k == i && i != j) {
            // (i,j) is an amicable pair
            amicablePairs.insert(std::make_pair(j,i));
            std::cout << "i: " << i << " j: " << j << "\n";
        }
    }
    
    ValueType sum = 0;
    for (std::map<int,int>::iterator iter = amicablePairs.begin(); iter != amicablePairs.end(); ++iter) {
        sum += iter->first;
        sum += iter->second;
    }
    std::cout << sum << "\n";
}
