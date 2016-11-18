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
  $scope.ranking = [];

  var ws = new WebSocket(SOCKET);
  var ws2 = new WebSocket(SOCKET2);
  var selectedCourses = [];

  ws.onopen = function () {
    ws.send('getTweets');
  };

  ws2.onopen = function () {
    ws2.send('getDemand');
  };

  ws.onclose = function () {
    ws.send('wake');
  };

  ws.onmessage = function (msg) {
    $scope.tweets = JSON.parse(msg.data)["statuses"];
  };

  ws2.onmessage = function (msg) {
    var demand = JSON.parse(msg.data);
    $scope.ranking = [];

    for (var course in demand) {
      if (demand[course] > 1) {
        $scope.ranking.push([course, demand[course]]);
      }
    }
    $scope.ranking.sort(
      function(a, b) {
        return b[1] - a[1];
      }
    );
    $scope.ranking = $scope.ranking.slice(0, 5);
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
        $scope.suggests = response.data;
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

  $scope.openDemand = function() {
    $scope.demandPage = true;
    $scope.mainPage = false;
    $scope.newsPage = false;
    ws2.send('getDemand');
  }
});
