app.controller('Controller', function($scope, $http, $timeout, $interval) {
  $scope.mainPage = true;
  $scope.welcomePage = true;
  $scope.selectPage = false;
  $scope.schedulePage = false;
  $scope.demandPage = false;
  $scope.newsPage = false;
  $scope.loading = false;
  $scope.fadeIn = false;
  $scope.fadeOut = false;

  $scope.courses = [];
  $scope.suggests = {};

  var ws = new WebSocket(SOCKET);
  var selectedCourses = [];

  ws.onopen = function () {
    ws.send('getTweets');
  };

  ws.onclose = function () {
    console.log('wake');
    ws.send('wake');
  };

  ws.onmessage = function (msg) {
    $scope.tweets = JSON.parse(msg.data)["statuses"];
  };

  $interval(function() {
    ws.send('getTweets');
  }, 30000);

  $scope.start = function() {
    $scope.welcomePage = false;
    $scope.loading = true;
    $http.get('/courses')
    .then(function(response) {
      $scope.courses = JSON.parse(response.data)["courses"];
      $scope.loading = false;
      $scope.mainPage = true;
      $scope.selectPage = true;
    });
  };

  $scope.selectCourse = function(course) {
    var contain = false;
    var index;

    for (var i = 0; i < selectedCourses.length; i++) {
      if (course.title == selectedCourses[i].title) {
        contain = true;
        index = i;
      }
    }

    if (contain) {
      selectedCourses.splice(index, 1);
    } else {
      selectedCourses.push(course);
    }
  };

  $scope.getSchedule = function() {
    $scope.suggests = {};
    $scope.fadeOut = true;

    $timeout(function() {
      $scope.loading = true;
    }, 500);

    $timeout(function() {
      $scope.selectPage = false;
      var data = JSON.stringify(selectedCourses);

      $http.post('/schedule', data)
      .then(function(response) {
        var schedule = response.data;

        for (var section in schedule) {
          if ($scope.suggests[schedule[section]['Course']] == null) {
            $scope.suggests[schedule[section]['Course']] = [];
          }
          $scope.suggests[schedule[section]['Course']].push(schedule[section]);
        }

        $scope.loading = false;
        $scope.schedulePage = true;
        $scope.fadeIn = true;
      });
    }, 1000);
  };

  $scope.searchAgain = function () {
    $scope.fadeOut = false;
    $scope.loading = false;
    $scope.schedulePage = false;
    $scope.mainPage = true;
    $scope.selectPage = true;
  };

});
