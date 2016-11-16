package CompareSch;
use strict;
use warnings;
use Schedule;
use Storable qw(dclone);
use Data::Dumper;


sub compareSchedule{
  my ($completed, $scheduleInfo) = @_;
  my @completed_courses = @{$completed};
  my $schedule = dclone($scheduleInfo);


  for my $done (@{$completed_courses[0]}){
        my $title = $done->{'title'};
        for my $section (keys %$schedule){
                if($schedule->{$section}{'Course'} eq $title){
                        delete $schedule->{$section};
                }

        }

}
#print $fileh  Dumper ($schedule);

return $schedule;
}
1;
