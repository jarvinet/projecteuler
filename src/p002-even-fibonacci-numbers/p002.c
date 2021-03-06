

/*
Problem 2

   19 October 2001

   Each new term in the Fibonacci sequence is generated by adding the previous two terms. By
   starting with 1 and 2, the first 10 terms will be:

   1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

   Find  the  sum of all the even-valued terms in the sequence which do not exceed four
   million.
*/

int fib(int n)
{
    if (n < 2)
        return n;
    else
        return fib(n-1) + fib(n-2);
}

int fib2()
{
    static int a = 0;
    static int b = 1;
    int c = a + b;
    a = b;
    b = c;
    return c;
}

int main()
{
    int sum = 0;
    while (1) {
        int fib = fib2();
        if (fib >= 4000000)
            break;
        if ((fib % 2) == 0)
            sum += fib;
        printf("fib = %d, sum = %d\n", fib, sum);
     }
    printf("%d\n", sum);
}


// answer is: 4613732
