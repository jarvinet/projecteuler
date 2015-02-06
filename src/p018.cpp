#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>

/*
Problem 18

   31 May 2002

   By starting at the top of the triangle below and moving to adjacent numbers on the row
   below, the maximum total from top to bottom is 23.

   3
   7 5
   2 4 6
   8 5 9 3

   That is, 3 + 7 + 4 + 9 = 23.

   Find the maximum total from top to bottom of the triangle below:

   75
   95 64
   17 47 82
   18 35 87 10
   20 04 82 47 65
   19 01 23 75 03 34
   88 02 77 73 07 63 67
   99 65 04 28 06 16 70 92
   41 41 26 56 83 40 80 70 33
   41 48 72 33 47 32 37 16 94 29
   53 71 44 65 25 43 91 52 97 51 14
   70 11 33 28 77 73 17 78 39 68 17 57
   91 71 52 38 17 14 91 43 58 50 27 29 48
   63 66 04 68 89 53 67 30 73 16 69 87 40 31
   04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

   NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every
   route. However, Problem 67, is the same challenge with a triangle containing one-hundred
   rows; it cannot be solved by brute force, and requires a clever method! ;o)

*/


using namespace std;

typedef unsigned long ValueType;
typedef int IndexType1;
typedef int IndexType2;

void printMatrix(vector < vector < ValueType > > info)
{
    for (IndexType1 i = 0, size = info.size(); i < size; ++i) {
        //cout << "line " << i + 1 << ": ";
        for ( IndexType2 j = 0, length = info[i].size(); j < length; ++j) {
            cout << info[i][j] << " ";
        }
        cout << endl;
    }
}

int main()
{
    // read file
    vector < vector < ValueType > > info;
    ifstream file("p067_triangle.txt");
    string line;
    while ( getline(file, line) ) {
        vector < ValueType > data;
        ValueType value;
        istringstream iss(line);
        while (iss >> value) {
            data.push_back(value);
        }
        info.push_back(data);
    }

    printMatrix(info);

    // calculate max sums
    // start from the second to last row and work upwards
    // look at the two values in the row below this cell, select bigger one and add that to this cell's value
    // this propagates the maximum value to the top

    for (IndexType1 i = info.size()-2; i >= 0; --i) { // index type has to be unsigned so that it can become negative and terminate the loop
        for (IndexType2 j = 0, length = info[i].size(); j < length; ++j) {
            IndexType1 i1 = i+1;
            IndexType2 j0 = j+0;
            IndexType2 j1 = j+1;
            ValueType v1 = info[i1][j0];
            ValueType v2 = info[i1][j1];
            info[i][j] += max(v1, v2);
        }
    }

    printMatrix(info);

    return 0;
}
