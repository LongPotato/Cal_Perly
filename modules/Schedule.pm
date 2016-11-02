package Schedule;
use WWW::Mechanize qw();
use IO::Socket::SSL qw();
use HTML::TreeBuilder;
use Data::Dumper;
use 5.10.0;
use strict;
use warnings;

sub getSchedule {
my $mech =  WWW::Mechanize->new(ssl_opts => {
	SSL_verify_mode => IO::Socket::SSL::SSL_VERIFY_NONE,
	verify_hostname => 0, });
my $url = "http://schedule.cpp.edu";

$mech->get($url);
my %data;
my $result = $mech->submit_form(
form_number => 2,
fields =>
{
	"ctl00\$ContentPlaceHolder1\$TermDDL" => 2173,
	"ctl00\$ContentPlaceHolder1\$ClassSubject" => 'CS',
}
,button => "ctl00\$ContentPlaceHolder1\$SearchButton"
);
$mech->submit();

my $tree = HTML::TreeBuilder->new_from_content($result->content);

if (my $div = $tree->look_down(_tag => "div", id => "class_list")){

	my @list = $div->find(_tag => 'li');


	foreach my $item (@list)
	{
		my $span = $item->look_down(_tag => 'span');
		my $course = $span->as_trimmed_text();
		my $title = $course . $span->right();

		for my $row ($item->look_down(_tag => q{tr} ))
		{
			my @keys = $row->look_down(_tag => q{th} );
			my @vals = $row->look_down(_tag => q{td} );
			for (my $i = 0; $i < scalar @keys; $i++)
			{
				my $key = $keys[ $i ]->as_trimmed_text();
				my $val = $vals[ $i ]->as_trimmed_text();
				$data{$title}{$key} = $val;

			}
		}

		$data{$title}{'Course'} = $course;

	}

}

$tree->delete();
return \%data;
};

1;
