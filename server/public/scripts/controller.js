app.controller('Controller', function($scope, $http) {

  $scope.courses = [];
  var selectedCourses = [];

  $http.get('/courses')
  .then(function(response) {
    $scope.courses = JSON.parse(response.data)["courses"];
    console.log($scope.courses);
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

    console.log(selectedCourses);
  }

});
