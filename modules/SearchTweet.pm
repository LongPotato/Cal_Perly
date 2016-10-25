package SearchTweet;

use strict;
use Data::Dumper;
use HTTP::Request::Common;
use JSON;
use LWP::UserAgent;
use MIME::Base64;
use Mozilla::CA; # Gets HTTPS working on Mac OSX (10.10)

sub get_tweets {
  my $key_word = $_[0];

  ### Setup access credentials
  my $consumer_key = $ENV{'TWITTER_CK'};
  my $consumer_secret = $ENV{'TWITTER_CS'};

  ### Get the Access Token
  my $bearer_token = "$consumer_key:$consumer_secret";
  my $bearer_token_64 = encode_base64($bearer_token, "");

  my $user_agent = LWP::UserAgent->new;

  my $token_request = POST(
    "https://api.twitter.com/oauth2/token",
    "Content-Type" => "application/x-www-form-urlencoded;charset=UTF-8",
    "Authorization" => "Basic $bearer_token_64",
    Content => { "grant_type" => "client_credentials" },
  );

  my $token_response = $user_agent->request($token_request);
  my $token_json = decode_json($token_response->content);

  my $timeline_request = GET(
    "https://api.twitter.com/1.1/search/tweets.json?q=" . $key_word,
    "Authorization" => "Bearer " . $token_json->{access_token}
  );

  my $timeline_response = $user_agent->request($timeline_request);

  my $timeline_json = decode_json($timeline_response->content);

  return $timeline_json;
};

1;
