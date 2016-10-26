app.controller('Controller', function($scope, $http, $timeout) {
  var ws = new WebSocket(SOCKET);

  $scope.selectPage = false;
  $scope.newsPage = false;
  $scope.loading = true;

  $scope.courses = [];
  var selectedCourses = [];

  ws.onmessage = function (msg) {
    $scope.tweets = JSON.parse(msg.data)["statuses"];
    console.log($scope.tweets);
  };

  $http.get('/courses')
  .then(function(response) {
    $scope.courses = JSON.parse(response.data)["courses"];
    $scope.loading = false;
    $scope.selectPage = true;
  });

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
    $scope.fadeOut = true;

    $timeout(function() {
      $scope.loading = true;
    }, 500);

    $timeout(function() {
      $scope.selectPage = false;
      var data = JSON.stringify(selectedCourses);

      $http.post('/schedule', data)
      .then(function(response) {
        console.log(response);
        //$scope.selectPage = false;
      });
    }, 1000);
  };

});
