#!/usr/bin/perl


# Problem 26
#
#    13 September 2002
#
#    A  unit fraction contains 1 in the numerator. The decimal representation of the unit
#    fractions with denominators 2 to 10 are given:
#
#      1 / 2 =  0.5
#      1 / 3 =  0.(3)
#      1 / 4 =  0.25
#      1 / 5 =  0.2
#      1 / 6 =  0.1(6)
#      1 / 7 =  0.(142857)
#      1 / 8 =  0.125
#      1 / 9 =  0.(1)
#      1 / 10 =  0.1
#
#    Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 
#    1 / 7 has a 6-digit recurring cycle.
#
#    Find the value of d < 1000 for which 1 / d contains the longest recurring
#    cycle in its decimal fraction part.


use strict;
use warnings;

use constant COUNT  => $ARGV[0]||99;
use constant LENGTH => length COUNT;

use bignum a => 3*COUNT; # accuracy ...

my $longest = 0;

for my $n (1..COUNT) {
  my $f = substr(1/$n, 0, 3*COUNT); # precision too ...
  if ( $f =~ /(\d+?)\1+(?!\d{${\COUNT}})/ ) { # a little leeway ...
    my $len = length $1;
    if ($len > $longest) {
      $longest = $len;
      printf " 1/%-*d = %-30.30s -> %s\n", LENGTH, $n, $f, $1;
    }
  }
  else {
    # should never happen ...
    die "Insufficient precision/accuracy?  Cannot handle the following
+:\n$f\n";
  }
}
print "$longest\n";
