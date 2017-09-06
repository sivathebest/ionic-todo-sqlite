app.factory('todoService', function($firebeseArray){
	var ref = new Firebase('https://siva-todos.firebaseio.com/');

	/*var config = {
    apiKey: "aAIzaSyBCFYN70kxY2w5jOidfNgFAq692GgnJrnI",
    authDomain: "siva-todos.firebaseapp.com",
    databaseURL: "https://siva-todos.firebaseio.com",
    storageBucket: "siva-todos.appspot.com",
    messagingSenderId: "631559808991"
    };

    firebase.initializeApp(config);

    var todos = firebase.database().ref();*/


	var todos = $firebaseArray(ref);
	var todoService = {
		all: todos,
		get: function(todoId){
			return todos.$getRecord(todoId);

		}
	}


	return todoService;
});
