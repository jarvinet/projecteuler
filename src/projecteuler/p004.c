
/*
Problem 4

   16 November 2001

   A  palindromic number reads the same both ways. The largest palindrome made from the
   product of two 2-digit numbers is 9009 = 91 × 99.

   Find the largest palindrome made from the product of two 3-digit numbers.

*/

// return true if n is a palindrome number
int isPalindromeI(int n)
{
    char str[9];
    sprintf(str, "%d", n);
    return isPalindromeS(str);
}

int isPalindromeS(const char* str)
{
    int len = strlen(str);
    int upperLimit = len/2;
    int i;
    for (i = 0; i <= upperLimit; i++) {
        int low = i;
        int high = len - i - 1;
        char l = str[low];
        char u = str[high];
        if (l != u)
            return 0;
    } 
    return 1;
}

int main()
{
    int i,j;

    int largest = 0;

    for (i = 100; i < 1000; i++) {
        for (j = 100; j < 1000; j++) {
            int product = i*j;
            if ((product > largest) && isPalindromeI(product))
                largest = product;
        }
    }
    printf("%d\n", largest);
}

// answer 906609
