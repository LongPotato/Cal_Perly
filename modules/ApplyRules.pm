package ApplyRules;

use strict;
use warnings;
use Data::Dumper;
use Storable qw(dclone);

my $log = Mojo::Log->new;

sub filter_required_courses {
  my ($required_ref, $completed_ref, $schedule_ref) = @_;
  my @required = @{$required_ref};
  my @completed = @{$completed_ref};
  my $schedule = dclone($schedule_ref);

  my $catalog = ();
  foreach my $course (@required) {
    $catalog->{$course->{'title'}} = $course->{'type'};
  }

  # Add course type to all the courses in schedule
  foreach my $key (keys %$schedule) {
    my $c_number = $schedule->{$key}->{'Course'};
    if (exists($catalog->{$c_number})) {
      $log->debug('true haha');
      $schedule->{$key}->{'Type'} = $catalog->{$c_number};
    } else {
      # If the course is not required, remove it from schedule
      delete($schedule->{$key});
    }
  }

  # Check if user is done with elective section
  my $counter = 0;
  for my $course (@{$completed[0]}) {
    if ($course->{'type'} eq 'elec') {
      $counter += 1;
    }
    if ($counter >= 5) {
      last;
    }
  }

  if ($counter >= 5) {
    # Remove elective courses from schedule
    foreach my $key (keys %$schedule) {
      if ($schedule->{$key}->{'Type'} eq 'elec') {
        delete $schedule->{$key};
      }
    }
  }

  return $schedule;
}

1;
