#include <iostream>

/*
Problem 31

   22 November 2002

   In England the currency is made up of pound, £, and pence, p, and there are eight coins in
   general circulation:

     1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

   It is possible to make £2 in the following way:

     1 × £1 + 1 × 50p + 2 × 20p + 1 × 5p + 1 × 2p + 3 × 1p

   How many different ways can £2 be made using any number of coins?
*/

// see SICP: counting change

int firstDenomination(int kindsOfCoins)
{
    switch (kindsOfCoins) {
    case 1: return 1;
    case 2: return 2;
    case 3: return 5;
    case 4: return 10;
    case 5: return 20;
    case 6: return 50;
    case 7: return 100;
    case 8: return 200;
    }
}

int countChange(int amount, int kindsOfCoins)
{
    if (amount == 0)
        return 1;
    if (amount < 0 || kindsOfCoins == 0)
        return 0;
    return countChange(amount, kindsOfCoins-1) + countChange(amount - firstDenomination(kindsOfCoins), kindsOfCoins);
}

int main()
{
    int cc = countChange(200, 8);
    std::cout << cc<< "\n";
}

// answer: 37682

