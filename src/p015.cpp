#include <map>
#include <sstream>
#include <iostream>


/*
Problem 15

   19 April 2002

   Starting in the top left corner of a 2 × 2 grid, there are 6 routes (without backtracking)
   to the bottom right corner.

   How many routes are there through a 20 × 20 grid?

*/

/*

1x1 2
1x2 3
1x3 4
2x2 6
2x3 10 1x3 + 2x2

f(1,m) = m+1
f(n,1) = n+1
f(n,m) = f(n-1,m)+f(n,m-1)

f(1,m) = 1
f(n,1) = 1
f(n,m) = f(n-1,m)+f(n,m-1)


++++++++++
++++++++++
++++++++++
++++++++++

+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |
+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |
+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |
+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |
+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |
+-+-+-+-+-+-+-+-+-+-+
| | | | | | | | | | |


1x1 1
2x2 2
3x3 6
4x4 20
5x5 70
6x6 252
7x7 924
8x8 3432
9x9 12870
10x10 48620
11x11 184756
12x12 705432
13x13 2704156
14x14 10400600
15x15 40116600

2 2 2
2 3 3
2 4 4
2 5 5
2 6 6
2 7 7
2 8 8
2 9 9
3 3 6
3 4 10
3 5 15
3 6 21
3 7 28
3 8 36
3 9 45
4 4 20
4 5 35
4 6 56
4 7 84
4 8 120
4 9 165
5 5 70
5 6 126
5 7 210
5 8 330
5 9 495
6 6 252
6 7 462
6 8 792
6 9 1287
7 7 924
7 8 1716
7 9 3003
8 8 3432
8 9 6435
9 9 12870

*/

long f(int n, int m)
{
    if (n <= 1 || m <= 1)
        return 1;
    else
        return f(n-1, m) + f(n, m-1);
}

typedef unsigned long long valuetype;

typedef std::map<int,valuetype> MapIntLong;

typedef std::map<int, MapIntLong> MapIntIntLong;

MapIntIntLong cache;

valuetype cachedF(const int n, const int m)
{
    valuetype value;
    if (n <= 1 || m <= 1)
        return 1;
    else {
        MapIntIntLong::iterator i = cache.find(n);
        if (i != cache.end()) {
            // found
            MapIntLong cache2 = i->second;
            MapIntLong::iterator j = cache2.find(m);
            if (j != cache2.end()) {
                // found, return cached value
                value = j->second;
            } else {
                // not found
                value = cachedF(n-1, m) + cachedF(n, m-1);
                cache2.insert(std::make_pair(m, value));
            }
        } else {
            // not found
            MapIntLong cache2;
            value = cachedF(n-1, m) + cachedF(n, m-1);

            cache2.insert(std::make_pair(m, value));
            cache.insert(std::make_pair(n, cache2));
        }
    }
    return value;
}


typedef std::map<std::string, valuetype> MapStringLong;

MapStringLong cache2;

valuetype cachedF2(int n, int m)
{
    valuetype value;
    if (n <= 1)
        return m+1;
    if (m <= 1)
        return n+1;
    else {
        std::stringstream os;
        os << n << m;
        const std::string key = os.str();
        MapStringLong::iterator i = cache2.find(key);
        if (i == cache2.end()) {
            // not found 
            value = cachedF2(n-1, m) + cachedF2(n, m-1);
            cache2.insert(std::make_pair(key, value));
            
        } else {
            // found
            value = i->second;
        }
    }
    return value;
}


int main()
{
#if 0
    for (int i = 2; i < 10; i++) {
        for (int j = i; j < 10; j++) {
            std::cout << i << " " << j << " " << cachedF2(i,j) << "\n";
        }
    }
#else
    for (int i = 1; i < 22; i++) {
        //printf("%d %d\n", i, f(i,i));
        //printf("%d %d\n", i, cachedF(i,i));
        //printf("%d %d\n", i, cachedF2(i,i));
        std::cout << i << " " << cachedF2(i,i) << "\n";
    }
#endif
}

// answer: 137846528820
