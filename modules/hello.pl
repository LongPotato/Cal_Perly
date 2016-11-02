use strict;
use warnings;
use Data::Dumper;
use SearchTweet;
use Schedule;

print Dumper SearchTweet::get_tweets('calpolypomona');

my $hash_ref = Schedule::getSchedule();

print Dumper (\$hash_ref);
