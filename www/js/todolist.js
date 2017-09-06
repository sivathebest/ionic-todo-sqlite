app.controller('todolist', function($scope, $cordovaSQLite, $state, $ionicPopup, $ionicActionSheet, $timeout, $cordovaPreferences, $ionicHistory, $ionicPlatform) {
  $scope.allTodos = [];
  var logged_user = 0;
  $ionicPlatform.ready(function() {
    $cordovaPreferences.fetch('id')
      .success(function(value) {
        logged_user = value;
        alert("top most preference called: logged_user :" + logged_user);
        alert("top most preference called: value :" + value);
      })

    if (logged_user === 0) {

      console.log("if loop result" + logged_user === 0);
      alert("current user id" + logged_user);
      alert("if loop result" + logged_user === 0);
      //  alert("No todos need to complete");

    } else {

      alert(" condition false" + logged_user);
      var query2 = "SELECT * FROM todos where created_by = ?";
      $cordovaSQLite.execute(db, query2, [logged_user]).then(function(result) {

        alert("length of the result" + result.rows.length);
        for (var x = 0; x < result.rows.length; x++) {
          console.log("SELECTED -> " + result.rows.item(x).id + " " + result.rows.item(x).desc + " " + result.rows.item(x).created_by);
          $scope.allTodos.push({
            id: result.rows.item(x).id,
            desc: result.rows.item(x).desc,
            created_by: result.rows.item(x).created_by,
            assigned_to: result.rows.item(x).assigned_to,
            todo_status: result.rows.item(x).todo_status
          });
        };
      }, function(error) {
        console.log('SELECT error: ' + error.message);
      });
    }
  });

  // ionic platform reday function closed

  // addtodo function starts

  $scope.addtodo = function(data) {
    $cordovaPreferences.fetch('id')
      .success(function(value) {
        logged_user = value;
        alert("User Id: " + value);
      })
      .error(function(error) {
        logged_user = 0;
      })
    console.log("desc " + $scope.data.desc);
    console.log("User " + logged_user);

    if ($scope.data.desc !== '' && logged_user !== 0) {
      console.log("Entered todo add");
      console.log("desc " + $scope.data.desc);
      console.log("User " + logged_user);
      var query = "INSERT INTO todos (desc, created_by, assigned_to, todo_status) VALUES (?,?,?,?)";
      console.log($scope.data.desc);
      $cordovaSQLite.execute(db, query, [$scope.data.desc, logged_user, logged_user, 0]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      //  $scope.todolist();
      $state.go('search');
      }, function(err) {
        console.error(err);
      });
    } else {

    }
  }
// addtodo function ends
});
