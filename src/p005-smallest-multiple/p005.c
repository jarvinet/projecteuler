/*
Problem 5

   30 November 2001

   2520  is the smallest number that can be divided by each of the numbers from 1 to 10
   without any remainder.

   What is the smallest number that is evenly divisible by all of the numbers from 1 to 20?

*/


// see if number n is evenly divisible by all numbers between start and end
int evenlyDivisible(int n, int start, int end)
{
    int i;
    for (i = start; i <= end; i++) {
        if ((n % i) != 0)
            return 0;
    }
    return 1;
}


int main(int argc, char* argv[])
{
    int smallest = atoi(argv[1]);
    int i;
    for (i = smallest; i > 0; i--) {
        if ((i < smallest) && evenlyDivisible(i, 1, 20))
            smallest = i;
    }
    printf("%d", smallest);
}


// answer 232792560
