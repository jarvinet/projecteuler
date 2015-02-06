#include <iostream>
#include <vector>
#include <algorithm>

/*
Problem 24

   16 August 2002

   A permutation is an ordered arrangement of objects. For example, 3124 is one possible
   permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically
   or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1
   and 2 are:

   012   021   102   120   201   210

   What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8
   and 9?

*/

using namespace std;

void print(vector<int> v)
{
    for (int i = 0; i < v.size(); i++) {
        cout << v[i] << " ";
    }
    cout << "\n";
}

int main()
{
    vector<int> v;

    for (int i = 0; i < 10; i++) {
        v.push_back(i);
    }

    for (unsigned int i = 1; i < 1000010; i++) {
        if (i > 999990) {
            cout << i << ": ";
            print(v);
        }
        next_permutation(v.begin(), v.end());
    }
}
