#include <stdio.h>

int main()
{
    FILE* file = fopen("p022_names.txt", "r");

    char line[64];
    int lineNumber = 0;
    unsigned long totalScore = 0;
    while (fgets(line, 64, file) != NULL) {
        ++lineNumber;
        int len = strlen(line)-1;
        line[len] = '\0'; // remove newline
        int wordScore = 0;
        int i;
        for (i = 0; i < len; i++) {
            char c = line[i];
            int charScore = c - 'A' + 1;
            wordScore += charScore;
        }
        totalScore += (wordScore*lineNumber);
        //printf("%s %d\n", line, wordScore);
    }
    fclose(file);
    printf("%d\n", totalScore);

    return 0;
}
