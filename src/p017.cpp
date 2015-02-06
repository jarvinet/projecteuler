#include <iostream>

/*
Problem 17

   17 May 2002

   If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there
   are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

   If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how
   many letters would be used?

   NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two)
   contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of
   "and" when writing out numbers is in compliance with British usage.
*/


/*
0001                                one
0002                                two
0003                                three
0004                                four
0005                                five
0006                                six
0007                                seven
0008                                eight
0009                                nine
0010                                ten
0011                                eleven
0012                                twelve
0013                                thirteen
0014                                fourteen
0015                                fifteen
0016                                sixteen
0017                                seventeen
0018                                eighteen
0019                                nineteen
0020                                twenty
0021                                twenty      one
0022                                twenty      two
0023                                twenty      three

0115              one   hundred and fifteen
0342              three hundred and forty       two
0600              six   hundred
0718              seven hundred and eighteen
1000 one thousand
*/

const char* onesS[] = 
{
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
};

const char* teensS[] = 
{
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
};

const char* tensS[] =
{
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
};

std::string toString(int n)
{
    int ones      = n/   1 % 10;
    int tens      = n/  10 % 10;
    int hundreds  = n/ 100 % 10;
    int thousands = n/1000 % 10;

    std::string result;

    if (thousands > 0) {
        result += onesS[thousands];
        result += " thousand ";
    }
    if (hundreds > 0) {
        result += onesS[hundreds];
        result += " hundred ";
    }
    if ((thousands > 0 || hundreds > 0) && (tens > 0 || ones > 0))
        result += "and ";
    switch (tens) {
    case 0:
        break;
    case 1:
        result += teensS[ones];
        break;
    default:
        result += tensS[tens];
        result += " ";
        break;
    }
    if (tens != 1 && ones != 0)
        result += onesS[ones];

    return result;
}

int countChars(std::string str)
{
    int len = 0;
    for (int i = 0; i < str.size(); i++) {
        char c  = str[i];
        if (c >= 'a' && c <= 'z')
            len++;
    }
    return len;
}

int main()
{
    int sum = 0;
    for (int n = 1; n <= 1000; n++) {
#if 0
        int ones      = n/   1 % 10;
        int tens      = n/  10 % 10;
        int hundreds  = n/ 100 % 10;
        int thousands = n/1000 % 10;
        std::cout << n << "\n";
        std::cout << "ones: " << ones << "\n";
        std::cout << "tens: " << tens << "\n";
        std::cout << "hundreds: " << hundreds << "\n";
        std::cout << "thousands: " << thousands << "\n";
#endif
        std::string result = toString(n);
        int length = countChars(result);
        sum += length;
        std::cout << n << " " << length << " " << sum << ": " << result << "\n";
    }
}
