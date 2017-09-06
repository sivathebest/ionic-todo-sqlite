// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db=null;

var app=angular.module('starter', ['ionic', 'ngCordova', 'ionic-modal-select'])

app.run(function($ionicPlatform, $cordovaSQLite, $ionicPlatform) {
  $ionicPlatform.ready(function() {
     if (window.cordova) {
      db = $cordovaSQLite.openDB({ name:  "my.db" , iosDatabaseLocation: 'default' }); //device
    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
    }
    // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS people");
    // $cordovaSQLite.execute(db, "DROP TABLE IF EXISTS todos");
     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, email text, password text, user_type integer, phone integer, address text, dob integer)");
     $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS todos (id integer primary key, desc text, created_by integer, assigned_to integer, assigned_to_name text, todo_status integer)");


    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Wait for device API libraries to load
    //
    /*document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }

    // Populate the database
    //
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)');
        /*tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');*/
   /* }

    // Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }*/






  });
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('todos',{
    url:'/',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'TodosCtrl'
  });
  $stateProvider.state('app', {
  url: '/app',
  abstract: true,
  templateUrl: 'templates/menu.html',
  controller: 'todolist'
})
  $stateProvider.state('signup', {
  url: "/singup/:param1",
  cache: false,
  templateUrl: 'templates/signup.html',
  controller: 'TodosCtrl'
  });
  $stateProvider.state('app.search', {
  url: "/search",
  cache: false,
  views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  });
  $stateProvider.state('app.edittodo', {
  url: "/edittodo/:param1",
  cache: false,
  views: {
      'menuContent': {
        templateUrl: 'templates/edittodo.html',
        controller: 'edittodo'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
