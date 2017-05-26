#include <iostream>
#include <string>
#include "gmpxx.h"

/*
Problem 55

   24 October 2003

   If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.

   Not all numbers produce palindromes so quickly. For example,

   349 + 943 = 1292,
   1292 + 2921 = 4213
   4213 + 3124 = 7337

   That is, 349 took three iterations to arrive at a palindrome.

   Although  no one has proved it yet, it is thought that some numbers, like 196, never
   produce a palindrome. A number that never forms a palindrome through the reverse and add
   process is called a Lychrel number. Due to the theoretical nature of these numbers, and
   for the purpose of this problem, we shall assume that a number is Lychrel until proven
   otherwise. In addition you are given that for every number below ten-thousand, it will
   either (i) become a palindrome in less than fifty iterations, or, (ii) no one, with all
   the computing power that exists, has managed so far to map it to a palindrome. In fact,
   10677 is the first number to be shown to require over fifty iterations before producing a
   palindrome: 4668731596684224866951378664 (53 iterations, 28-digits).

   Surprisingly, there are palindromic numbers that are themselves Lychrel numbers; the first
   example is 4994.

   How many Lychrel numbers are there below ten-thousand?

   NOTE: Wording was modified slightly on 24 April 2007 to emphasise the theoretical nature
   of Lychrel numbers.

*/

using namespace std;

bool isPalindrome(string str)
{
    int len = str.size();
    for (int i = 0, lim = len/2; i <= lim; i++)
        if (str[i] != str[len-1-i])
            return false;
    return true;
}

bool isLychrel(int n)
{
    bool ret = true;
    mpz_class ab(n);
    cout << ab << "\n";
    for (int i = 0; i < 50; i++) 
    {
        string s = ab.get_str();
        bool pal = isPalindrome(s);
        if (pal) {
            ret = false;
            break;
        }
        reverse(s.begin(), s.end());
        mpz_class ba(s, 10);
        mpz_class abba = ab+ba;
        cout << "ab: " << ab << " ba: " << ba << " abba: " << abba << "\n";
        ab = abba;
    }

    //cout << "\n";

    return ret;
}

bool isLychrel2(int n)
{
    bool ret = true;
    mpz_class ab(n);
    string s = ab.get_str();
    cout << ab << "\n";
    for (int i = 0; i < 50; i++) 
    {
        reverse(s.begin(), s.end());
        mpz_class ba(s, 10);
        mpz_class abba = ab+ba;
        cout << "ab: " << ab << " ba: " << ba << " abba: " << abba << "\n";
        ab = abba;
        s = ab.get_str();
        bool pal = isPalindrome(s);
        if (pal) {
            ret = false;
            break;
        }
    }

    //cout << "\n";

    return ret;
}

int main()
{
    int num = 0;

#if 0
    int a = 196;
    cout << a << " " << isLychrel(a) << "\n";
#endif

    for (int i = 1; i < 10000; i++) {
        if (isLychrel2(i))
            num++;
    }
    cout << num << "\n";

    return 0;
}

