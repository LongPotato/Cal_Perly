use strict;
use warnings;
use Data::Dumper;
use SearchTweet;
use Schedule;
use CompareSch;

print Dumper SearchTweet::get_tweets('calpolypomona');

my $hash_ref = Schedule::getSchedule();
my $courses = [[
		{
			'title' => 'CS 141',
		},
		{
			'title' => 'CS 241',
		},
		{
			'title' => 'CS 140',
		},
		{
			'title' => 'CS 256',
		},
		]];

my $schedule = CompareSch::compareSchedule($courses,$hash_ref);

print Dumper (\$schedule);
