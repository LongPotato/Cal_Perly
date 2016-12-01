# Cal Perly

Cal Perly provides students at Cal Pomona Pomona a quick access to class schedule, class information and an easy way to read the news around the campus.

Visit it at [calperly.tk](http://35.161.75.220:3000)

## Features

* Single page, responsive web application.
* Web scraping: automatic extracts schedule data from school's website.
* Smart search: only displays the remaining classes the student needs to take to graduate.
* Data calculation: predicts future high demand classes based on user's searches.
* Live news: utilizes websockets to display a live feed of tweets related to the campus.

![1](https://github.com/LongPotato/Cal_Perly/blob/master/pics/overview.jpg)

## Screenshots

![3](https://github.com/LongPotato/Cal_Perly/blob/master/pics/schedule.jpg)
![4](https://github.com/LongPotato/Cal_Perly/blob/master/pics/tweets.jpg)

## Setup

To run the server on your local machine, make sure you installed all the Perl dependencies.

1) In the project directory, create your evironment variables for Twitter keys:
```
export TWITTER_CK = 'YOUR CONSUMER KEY'
export TWITTER_CS = 'YOUR CONSUMER SECRET'
```

2) Change directory to `server` & run the server:
```
cd server
./server daemon
```










