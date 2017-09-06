app.controller('TodosCtrl', function($scope, $cordovaSQLite, $state, $ionicPopup, $ionicActionSheet, $timeout, $cordovaPreferences, $ionicHistory, $ionicLoading, $stateParams) {

  $scope.profile_edit = 0;
  var profile_edit = 0;
  //alert("it loads again");
  if ($stateParams.param1 !== 0 && $stateParams.param1 !== undefined) {
  //  alert("state params " + $stateParams.param1);
    $scope.profile_edit = $stateParams.param1;
    profile_edit = $stateParams.param1;
  }else{
    $scope.profile_edit = 0;
    profile_edit = 0;
  }

  $scope.fetch_id = 0;
  $scope.fetch_firstname = '';
  $scope.fetch_email = '';
  $scope.fetch_password = '';
  $scope.fetch_user_type = '';
  $scope.fetch_phone = '';
  $scope.fetch_address = '';
  $scope.fetch_dob = '';
  var logged_user = 0;
  var fetch_id = 0;
  var fetch_firstname = '';
  var fetch_email = '';
  var fetch_password = '';
  var fetch_user_type = '';
  var fetch_phone = '';
  var fetch_address = '';
  var fetch_dob = '';
  $scope.user_text = "click to choose"
  $scope.user_type = 3;



  $scope.data = {
    'name': '',
    'email': '',
    'password': '',
    'phone': '',
    'address': '',
    'dob': ''
  };

  $cordovaPreferences.fetch('id')
    .success(function(value) {
    //  alert("success getting id from preference " +value );

       if(value !== 0 && value !== '' && profile_edit == 1) {
         logged_user = value;

      //  alert("profile edit success : " + $scope.profile_edit);

        var query2 = "SELECT * FROM people where id = ?";
        $cordovaSQLite.execute(db, query2, [value]).then(function(result) {

          //alert("length of the result" + result.rows.length);

          if (result.rows.length > 0) {

            $scope.data.id = result.rows.item(0).id;
            $scope.data.name = result.rows.item(0).firstname;
          //  alert("name " + result.rows.item(0).firstname);
            $scope.data.email = result.rows.item(0).email;
            $scope.data.password = result.rows.item(0).password;
            $scope.data.phone = result.rows.item(0).phone;
            $scope.data.address = result.rows.item(0).address;

            $scope.data.user_type = result.rows.item(0).user_type;
          //  $scope.data.dob = result.rows.item(0).dob;
          //  alert("after fetch " + $scope.data.id);
          }

        }, function(error) {
          console.log('SELECT error: ' + error.message);
        });


      }

    });

  //   $scope.$watchCollection('data', function (data) {
   //
  //     alert("watch collection enters");
   //
  //     $scope.fetch_id = fetch_id ;
  //     $scope.fetch_firstname = fetch_firstname;
  //     alert("watchCollection name " + fetch_firstname);
  //     $scope.fetch_email = fetch_email;
  //     $scope.fetch_password = fetch_password;
  //     $scope.fetch_phone = fetch_phone;
  //     $scope.fetch_address = fetch_address;
   //
  //     $scope.fetch_user_type = fetch_user_type;
  //     $scope.fetch_dob = fetch_dob;
  //  });

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.$on('$ionicView.enter', function() {
    $scope.show($ionicLoading);

    $cordovaPreferences.fetch('id')
      .success(function(value) {
      //  alert("success getting id from preference " +value );

        if (value !== 0 && value !== '' &&  profile_edit == 0) {
        //  alert("login already done : " + profile_edit);
          $scope.gosearch();

        }
        // else if (value !== 0 && value !== '' && profile_edit == 1) {
        //
        //   alert("profile edit success : " + $scope.profile_edit);
        //
        //   var query2 = "SELECT * FROM people where id = ?";
        //   $cordovaSQLite.execute(db, query2, [value]).then(function(result) {
        //
        //     alert("length of the result" + result.rows.length);
        //
        //     if (result.rows.length > 0) {
        //       $scope.fetch_id = result.rows.item(0).id;
        //       $scope.fetch_firstname = result.rows.item(0).firstname;
        //       alert("name " + result.rows.item(0).firstname);
        //       $scope.fetch_email = result.rows.item(0).email;
        //       $scope.fetch_password = result.rows.item(0).password;
        //       $scope.fetch_phone = result.rows.item(0).phone;
        //       $scope.fetch_address = result.rows.item(0).address;
        //
        //       $scope.fetch_user_type = result.rows.item(0).user_type;
        //       $scope.fetch_dob = result.rows.item(0).dob;
        //       alert("after fetch " + $scope.fetch_id);
        //     }
        //
        //   }, function(error) {
        //     console.log('SELECT error: ' + error.message);
        //   });
        //
        //
        // }

      });


    $scope.hide($ionicLoading);
  });

  // This event is triggered when the view has finished loading
  $scope.$on('$ionicView.loaded', function() {


    // alert("endted content loaded method" + $scope.profile_edit);
    //
    // if ($scope.profile_edit === 1) {
    //
    //
    // }

  })





  $scope.getUserid = function() {

  }


  // $scope.todolist = function() {
  //
  //   $cordovaPreferences.fetch('id')
  //     .success(function(value) {
  //       $scope.logged_user = value;
  //       //alert("User Id: " + value);
  //       //alert("user id after enters todo list: " + $scope.logged_user);
  //     })



  // console.log($scope.logged_user);
  //   alert("Entered todolist userid " + $scope.logged_user);
  //
  //
  // }


  $scope.showFilter = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Admin'
      }, {
        text: 'User'
      }, ],
      titleText: 'User Type',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {

        if (index === 0) {
          $scope.user_text = "Admin";
          $scope.user_type = 1;
        }

        if (index === 1) {
          $scope.user_text = "User";
          $scope.user_type = 2;
        }
        console.log($scope.user_type)
      }
    });
    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 2000);
  };



  $scope.insert = function(data) {


    if ($scope.data.name === '') {
      alert("Please fill the name");

    } else if ($scope.data.email === '') {
      alert("Please fill the email-id");
    } else if ($scope.data.password === '') {
      alert("Please fill the password");
    } else if ($scope.user_type === 3) {
      alert("Please select the user type");
    } else if ($scope.data.phone === '') {
      alert("Please fill the phone number");
    } else if ($scope.data.address === '') {
      alert("Please fill the address");
    } else if ($scope.data.dob === null) {
      alert("Please fill the date of birth");
    } else if ($scope.data.email !== '') {

      if(logged_user !== 0 && logged_user !== '' && profile_edit == 1) {

        var query = "UPDATE people SET firstname = ?, email = ?, password = ?, user_type = ?, phone = ?, address = ?, dob = ? where id = ?";
        console.log($scope.data.name + " " + $scope.data.email + " " + $scope.data.password + " " + $scope.user_type + " " + $scope.data.phone + " " + $scope.data.address + " " + $scope.data.dob);
        $cordovaSQLite.execute(db, query, [$scope.data.name, $scope.data.email, $scope.data.password, $scope.user_type, $scope.data.phone, $scope.data.address, $scope.data.dob, profile_edit]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
          alert("User profile updated sucessfully");
          $scope.gosearch();
        }, function(err) {
          console.error(err);
        });


      }else{

      var query1 = "Select * from people where email = ?";
      $cordovaSQLite.execute(db, query1, [$scope.data.email]).then(function(result1) {
        if (result1.rows.length > 0) {
          console.log("SELECTED -> " + result1.rows.item(0).email);
          alert('Email already exists');
        } else {
        //  alert('Its a new Email id');
          var query = "INSERT INTO people (firstname, email, password, user_type, phone, address, dob ) VALUES (?,?,?,?,?,?,?)";
          console.log($scope.data.name + " " + $scope.data.email + " " + $scope.data.password + " " + $scope.user_type + " " + $scope.data.phone + " " + $scope.data.address + " " + $scope.data.dob);
          $cordovaSQLite.execute(db, query, [$scope.data.name, $scope.data.email, $scope.data.password, $scope.user_type, $scope.data.phone, $scope.data.address, $scope.data.dob]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            alert("New user created sucessfully");
            $state.go('todos');
          }, function(err) {
            console.error(err);
          });
        }
      }, function(error) {
        console.log('SELECT error: ' + error.message);
      });
    }

    } else {

    }

  }

  $scope.login = function(data) {
    console.log("login details " + $scope.data.email + " " + $scope.data.password);
    var query1 = "Select * from people where email = ? AND password = ?";
    $cordovaSQLite.execute(db, query1, [$scope.data.email, $scope.data.password]).then(function(result1) {
      if (result1.rows.length > 0) {
        console.log("SELECTED ->" + result1.rows.item(0).id + " " + result1.rows.item(0).email + " " + result1.rows.item(0).password + " " + result1.rows.item(0).id + " " + result1.rows.item(0).user_type);
        $cordovaPreferences.store('id', result1.rows.item(0).id);
        $cordovaPreferences.store('user_type', result1.rows.item(0).user_type);
        $cordovaPreferences.store('user_name', result1.rows.item(0).firstname);
        //  alert('login sucessful');
        //  $scope.logged_user = result1.rows.item(0).id;
        //  $scope.getUserid();
        //alert('after getuserid() called  :' + $scope.logged_user);
        //console.log('after getuserid() called  :' + $scope.logged_user);
        $scope.gosearch();

        // $cordovaPreferences.fetch('id')
        // .success(function(value) {
        //   alert("User Id: " + value);
        // })
      } else {
        alert('email/password not match');
      }
    }, function(error) {
      console.log('SELECT error: ' + error.message);
    });

  }


  $scope.select = function(firstname) {
    console.log("Entered in select method");

    // var query = "SELECT * FROM people WHERE firstname = ?";
    // $cordovaSQLite.execute(db, query, [firstname]).then(function(res) {
    //   if (res.rows.length > 0) {
    //     console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).email + " " + res.rows.item(0).user_type + " " + res.rows.item(0).phone + " " + res.rows.item(0).adddress + " " + res.rows.item(0).dob);
    //     var resu = "SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).email + " " + res.rows.item(0).user_type + " " + res.rows.item(0).phone + " " + res.rows.item(0).adddress + " " + res.rows.item(0).dob;
    //     alert(resu);
    //   } else {
    //     console.log("No results found");
    //   }
    // }, function(err) {
    //   console.error(err);
    // });

    $scope.alldataSMS = [];

    var query = "SELECT * FROM people";
    $cordovaSQLite.execute(db, query).then(function(result) {
      for (var x = 0; x < result.rows.length; x++) {
        console.log("SELECTED -> " + result.rows.item(x).firstname + " " + result.rows.item(x).email + " " + result.rows.item(x).user_type + " " + result.rows.item(x).phone + " " + result.rows.item(x).address);


        $scope.alldataSMS.push({
          id: result.rows.item(x).id,
          name: result.rows.item(x).name,
          email: result.rows.item(x).email,
          user_type: result.rows.item(x).user_type,
          phone: result.rows.item(x).phone,
          address: result.rows.item(x).address,
          dob: result.rows.item(x).dob
        });
      };
    }, function(error) {
      console.log('SELECT error: ' + error.message);
    });






  }

  $scope.gosign = function() {
    $state.go('signup', {
      param1: 0
    });

  }
  $scope.gosearch = function() {
    $state.go('app.search');


  }


  $scope.back = function() {
    $ionicHistory.goBack();
    window.history.back();
  }

});


app.controller('todolist', function($scope, $cordovaSQLite, $state, $ionicPopup, $ionicActionSheet, $timeout, $cordovaPreferences, $ionicHistory, $ionicPlatform, $ionicLoading, $stateParams) {


  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };


  $scope.allTodos = [];
  $scope.user_list = [];
  $scope.logged_user = 0;
  $scope.user_type = 0;
  $scope.user_name = '';
  $scope.assign_show = '';
  $scope.data = {
    'desc': ''
  };
  var actual_todo_status = 0;
  var updated_user_status = 0;




  $scope.$on('$ionicView.beforeEnter', function() {
    //runs every time the page activates
    $cordovaPreferences.fetch('id')
      .success(function(value) {
        $scope.logged_user = value;
        //  alert("top most preference called: $scope.logged_user :" + $scope.logged_user);
        //  alert("top most preference called: value :" + value);
      });
    $cordovaPreferences.fetch('user_type')
      .success(function(value) {
        $scope.user_type = value;
        if (value === 2) {
          $scope.assign_show = true;
        } else {
          $scope.assign_show = false;

        }
        //  alert("preference user type " + $scope.user_type);
      });
    $cordovaPreferences.fetch('user_name')
      .success(function(value) {
        $scope.user_name = value;
        //  alert("preference user type " + $scope.user_type);
      });

  });

  $scope.$on('$ionicView.enter', function() {
    // code to run each time view is entered
    $scope.show($ionicLoading);
    $scope.allTodos = [];
    $scope.user_list = [];
    if ($scope.logged_user === 0) {

      console.log("if loop result" + $scope.logged_user === 0);
      alert("current user id :" + $scope.logged_user);
      alert("if loop result" + $scope.logged_user === 0);
      //  alert("No todos need to complete");

    } else {

      //  alert(" condition false" + $scope.logged_user);
      var query2 = "";
      if ($scope.user_type == 1) {
        query2 = "SELECT * FROM todos where created_by = ?";
      } else {
        query2 = "SELECT * FROM todos where assigned_to = ?";
      }
      $cordovaSQLite.execute(db, query2, [$scope.logged_user]).then(function(result) {

        //  alert("length of the result" + result.rows.length);
        for (var x = 0; x < result.rows.length; x++) {
          console.log("SELECTED -> " + result.rows.item(x).id + " " + result.rows.item(x).desc + " " + result.rows.item(x).created_by + " " + result.rows.item(x).todo_status + " " + result.rows.item(x).assigned_to_name);
          $scope.allTodos.push({
            id: result.rows.item(x).id,
            desc: result.rows.item(x).desc,
            created_by: result.rows.item(x).created_by,
            assigned_to: result.rows.item(x).assigned_to,
            assigned_to_name: result.rows.item(x).assigned_to_name,
            todo_status: result.rows.item(x).todo_status
          });
        };
      }, function(error) {
        console.log('SELECT error: ' + error.message);
      });

      var query3 = "SELECT * FROM people where user_type = ?";
      $cordovaSQLite.execute(db, query3, [2]).then(function(result1) {

        //  alert("length of the result" + result.rows.length);
        for (var x = 0; x < result1.rows.length; x++) {
          console.log("SELECTED -> " + result1.rows.item(x).id + " " + result1.rows.item(x).firstname + " " + result1.rows.item(x).email + " " + result1.rows.item(x).user_type);
          $scope.user_list.push({
            id: result1.rows.item(x).id,
            name: result1.rows.item(x).firstname
          });
        };
      }, function(error) {
        console.log('SELECT error: ' + error.message);
      });
    }

    $scope.hide($ionicLoading);
  });

  $ionicPlatform.ready(function() {



  });

  $scope.show_user_list = function(todoid) {
  //  $event.preventDefault();
  //  $event.stopPropagation();
    var buttonsGroup = [];
    for (var i = 0; i < $scope.user_list.length; i++) {
      var text = {
        "text": $scope.user_list[i].name,
        "id": $scope.user_list[i].id
      };
      buttonsGroup.push(text);
    }

    // $ionicActionSheet.show({
    //   buttons: buttonsGroup
    // })

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({


      buttons: buttonsGroup,
      titleText: 'Users List',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        //  alert(" cliked index :" + this.buttons[index].id);
        //  alert(" cliked todo id :" + todoid);
        var u_id = this.buttons[index].id;
        var u_name = this.buttons[index].text;
        //  alert(" cliked name :" + index.name);
        var query = '';
        if ($scope.user_type === 1) {
          query = "UPDATE todos SET assigned_to = ?, assigned_to_name = ? WHERE id = ?;";

          alert("update final assigned_to and assigned_to_name " + this.buttons[index].id + " && " + this.buttons[index].text);
          $cordovaSQLite.execute(db, query, [u_id, u_name, todoid]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            alert("Todo assigned sucessfully");

            $state.go($state.current, {}, {
              reload: true
            });

          }, function(err) {
            console.error(err);
          });
        }

        // if (index === buttonsGroup.id) {
        //   $scope.user_text = "Admin";
        //   $scope.user_type = 1;
        // }
        //
        // if (index === 1) {
        //   $scope.user_text = "User";
        //   $scope.user_type = 2;
        // }
        //  console.log($scope.user_type)
      }
    });
    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 2000);
  };




  $scope.getOpt = function(userid, todoid) {
    //  alert("getOpt method called");
    //  alert("selected userid : " + userid);
    //  alert("selected todoid : " + todoid);

  }



  // ionic platform reday function closed



  // edittodo function starts

  $scope.edittodo = function(data) {


  }

  // edittodo function ends

  // go_edittodo function starts

  $scope.go_edittodo = function(todoid) {

    $state.go('app.edittodo', {
      param1: todoid
    });
  }

  // go_edittodo function ends



  // addtodo function starts

  $scope.addtodo = function(data) {

      console.log("desc " + $scope.data.desc);
    //  alert("desc " + $scope.data.desc);
      $cordovaPreferences.fetch('id')
        .success(function(value) {
          $scope.logged_user = value;
        //  alert("User Id: " + value);
        })
        .error(function(error) {
          $scope.logged_user = 0;
        })

      console.log("User " + $scope.logged_user);

      if ($scope.data.desc !== '' && $scope.logged_user !== 0) {
        console.log("Entered todo add");
        console.log("desc " + $scope.data.desc);
        console.log("User " + $scope.logged_user);
        var query = "INSERT INTO todos (desc, created_by, assigned_to, assigned_to_name, todo_status) VALUES (?,?,?,?,?)";
        console.log($scope.data.desc);
        $cordovaSQLite.execute(db, query, [$scope.data.desc, $scope.logged_user, $scope.logged_user, $scope.user_name, 0]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
          //  $scope.todolist();
          $scope.data.desc = '';
          $state.go($state.current, {}, {
            reload: true
          });
        }, function(err) {
          console.error(err);
        });
      } else {

      }
    }
    // addtodo function ends

  // todocomp function starts
  $scope.todocomp = function(id) {
  //  $event.preventDefault();
  //  $event.stopPropagation();

    //alert("todocomple cliked id: " + id);

    var query2 = "SELECT todo_status FROM todos where id = ?";
    $cordovaSQLite.execute(db, query2, [id]).then(function(result) {
      if (result.rows.length > 0) {
        actual_todo_status = result.rows.item(0).todo_status;
      //  alert("actual todo status while fetch " + actual_todo_status);
        if (($scope.user_type === 1) && (actual_todo_status === 0)) {
          updated_user_status = 1;
          alert("todo completed");
        } else if (($scope.user_type === 2) && (actual_todo_status === 0)) {
          updated_user_status = 2;
          alert("todo sent for review");
        } else if (($scope.user_type === 1) && (actual_todo_status === 2)) {
          updated_user_status = 1;
          alert("todo completed");
        } else {
          updated_user_status = 0;
        }
        //alert(" after edit user status :" + updated_user_status);
        $scope.todocomp_exten(id);
      }
    }, function(error) {
      console.log('SELECT error: ' + error.message);
    });



  }

  // todocomp function ends

  $scope.todocomp_exten = function(id) {

    var query = '';
  //  alert("update final user_type " + $scope.user_type);
    if ($scope.user_type !== 0 && $scope.user_type !== '') {

      if ($scope.user_type !== 1) {
        query = "UPDATE todos SET todo_status = ? WHERE Id = ?;";
      } else if ($scope.user_type !== 2) {
        query = "UPDATE todos SET todo_status = ? WHERE Id = ?;";
      }
      alert("update final user status" + updated_user_status);
      $cordovaSQLite.execute(db, query, [updated_user_status, id]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
        alert("update success");

        $state.go($state.current, {}, {
          reload: true
        });

      }, function(err) {
        console.error(err);
      });


    }
  }

  // assign methiod starts here

  // assign methiod ends here

  $scope.gosearch = function() {
    $state.go('app.search');
  }

  $scope.go_profile = function() {

    $state.go('signup', {
      param1: '1'
    });
  }

  $scope.logout = function() {
    $cordovaPreferences.store('id', '');
    $cordovaPreferences.store('user_type', '');
    $state.go('todos');
  }
});

app.controller('edittodo', function($scope, $cordovaSQLite, $state, $ionicPopup, $ionicActionSheet, $timeout, $cordovaPreferences, $ionicHistory, $ionicPlatform, $ionicLoading, $stateParams) {

  $scope.selected_todo = 0;
  //alert("it loads again");
  if ($stateParams.param1 !== 0 && $stateParams.param1 !== undefined) {
    //  alert("todo id is "+ $stateParams.param1);
    $scope.selected_todo = $stateParams.param1;
  }
  $scope.logged_user = 0;
  $scope.user_type = 0;
  $scope.user_name = '';
  $scope.fetch_desc = '';
  $scope.assign_show = '';
  $scope.data = {
    'desc': ''
  };



  $scope.$on('$ionicView.beforeEnter', function() {
    //runs every time the page activates
    $cordovaPreferences.fetch('id')
      .success(function(value) {
        $scope.logged_user = value;
        //  alert("top most preference called: $scope.logged_user :" + $scope.logged_user);
        //  alert("top most preference called: value :" + value);
      });
    $cordovaPreferences.fetch('user_type')
      .success(function(value) {
        $scope.user_type = value;
        if (value === 2) {
          $scope.assign_show = true;
        } else {
          $scope.assign_show = false;

        }
        //  alert("preference user type " + $scope.user_type);
      });
    $cordovaPreferences.fetch('user_name')
      .success(function(value) {
        $scope.user_name = value;
        //  alert("preference user type " + $scope.user_type);
      });

  });

  $scope.$on('$ionicView.enter', function() {
    // code to run each time view is entered
    $scope.show($ionicLoading);
    $scope.allTodos = [];
    if ($scope.logged_user === 0) {

      console.log("if loop result" + $scope.logged_user === 0);
      alert("current user id :" + $scope.logged_user);
      alert("if loop result" + $scope.logged_user === 0);
      //  alert("No todos need to complete");

    } else {

      //  alert(" condition false" + $scope.logged_user);
      var query2 = "";
      if ($scope.user_type == 1) {
        query2 = "SELECT * FROM todos where id = ?";
        // } else {
        //   query2 = "SELECT * FROM todos where assigned_to = ?";
        // }
        $cordovaSQLite.execute(db, query2, [$scope.selected_todo]).then(function(result) {

        //  alert("length of the result" + result.rows.length);

          if (result.rows.length > 0) {
            //alert("SELECTED -> " + result.rows.item(1).desc);
            $scope.fetch_desc = result.rows.item(0).desc;
          //  alert("after fetch " + $scope.fetch_desc);
          }
          // for (var x = 0; x < result.rows.length; x++) {
          //   console.log("SELECTED -> " + result.rows.item(x).id + " " + result.rows.item(x).desc + " " + result.rows.item(x).created_by + " " + result.rows.item(x).todo_status + " " + result.rows.item(x).assigned_to_name);
          //   $scope.allTodos.push({
          //     id: result.rows.item(x).id,
          //     desc: result.rows.item(x).desc,
          //     created_by: result.rows.item(x).created_by,
          //     assigned_to: result.rows.item(x).assigned_to,
          //     assigned_to_name: result.rows.item(x).assigned_to_name,
          //     todo_status: result.rows.item(x).todo_status
          //   });
          // };
        }, function(error) {
          console.log('SELECT error: ' + error.message);
        });
      }

    }

    $scope.hide($ionicLoading);
  });

  // todocomp function starts
  $scope.edit_todo = function(data) {



      alert("data.desc : " + $scope.data.desc);
      if ($scope.data.desc !== '') {
        var query = "UPDATE todos SET desc = ? WHERE Id = ?;";

        alert("update final user status" + $scope.data.desc + " " + $scope.selected_todo);
        $cordovaSQLite.execute(db, query, [$scope.data.desc, $scope.selected_todo]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
          alert("Todo sucessfully edited");

          $scope.gosearch();

        }, function(err) {
          console.error(err);
        });

      }

    }
    // todocomp function starts

  // todocomp function starts
  $scope.delete_todo = function() {


      var query = "DELETE FROM todos WHERE id = ?";
      //  alert("update final user status" + $scope.data.desc +" "+ $scope.selected_todo);
      $cordovaSQLite.execute(db, query, [$scope.selected_todo]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
        alert("Todo sucessfully deleted");

        $scope.gosearch();

      }, function(err) {
        console.error(err);
      });



    }
    // todocomp function starts

  $scope.gosearch = function() {
    $state.go('app.search');
  }

});
