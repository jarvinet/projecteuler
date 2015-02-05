#include <iostream>


/*
Problem 19

   14 June 2002

   You  are given the following information, but you may prefer to do some research for
   yourself.
     * 1 Jan 1900 was a Monday.
     * Thirty days has September,
       April, June and November.
       All the rest have thirty-one,
       Saving February alone,
       Which has twenty-eight, rain or shine.
       And on leap years, twenty-nine.
     * A leap year occurs on any year evenly divisible by 4, but not on a century unless it
       is divisible by 400.

   How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901
   to 31 Dec 2000)?
*/

int days[][13] = 
{
    //  jan feb mar apr may jun jul aug sep oct nov dec
    { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }, // non-leap years
    { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }  // leap years
};


class Date
{
private:
    int day;
    int month;
    int year;
    int weekday; // 0 = monday, 1 = tuesday, 2 = wednesday, 3 = thursday, 4 = friday, 5 = saturday, 6 = sunday

public:
    Date(int day, int month, int year, int weekday);

    int getDay();
    int getMonth();
    int getYear();
    int getWeekday();

    void inc();
    bool isLeapYear();
    void print();
    bool operator<=(const Date& that);
    bool operator>=(const Date& that);
    bool condition();

};

bool Date::condition()
{
    return (day == 1) && (weekday == 6);
}

bool Date::operator<=(const Date& that)
{
    if (this->year > that.year)
        return false;
    else if (this->year < that.year)
        return true;
    else // this.year == that.year
    {
        if (this->month > that.month)
            return false;
        else if (this->month < that.month)
            return true;
        else // this.month == that.month
            return this->day <= that.day;
    }
}

bool Date::operator>=(const Date& that)
{
    if (this->year < that.year)
        return false;
    else if (this->year > that.year)
        return true;
    else // this.year == that.year
    {
        if (this->month < that.month)
            return false;
        else if (this->month > that.month)
            return true;
        else // this.month == that.month
            return this->day >= that.day;
    }
}

Date::Date(int day, int month, int year, int weekday)
    : day(day), month(month), year(year), weekday(weekday)
{
}


bool Date::isLeapYear()
{
    return ((year % 4) == 0 ) && ((year % 100) != 0) || ((year % 400) == 0);
}

void Date::inc()
{
    if (month == 12 && day == days[0][month]) {
        year++;
        month = 1;
        day = 1;
    } else if (month == 2) {
        bool leap = isLeapYear();
        int index = leap ? 1 : 0;
        if (day == days[index][month]) {
            month++;
            day = 1;
        } else {
            day++;
        }
    } else if (day == days[0][month]) {
        month++;
        day = 1;
    } else {
        day++;
    }

    weekday++;
    weekday %= 7;
}

void Date::print()
{
    std::cout << "Day: " << day << " month: " << month << " year: " << year << " weekday: " << weekday << "\n";
}

int main()
{
    Date date(1, 1, 1900, 0); // 1st Jan 1900 was a monday
    Date lowerLimit(1,1,1901, 0); // start here 1 jan 1901
    Date upperLimit(31,12,2000, 0); // end here 31 dec 2000
    int start = 0;
    int end = 365*101;
    int count = 0;
    for (int i = start; i < end; i++) 
    {
        if (date >= lowerLimit && date <= upperLimit && date.condition()) {
            count++;
            date.print();
        }
        date.inc();
    }
    std::cout << count << "\n";
}


