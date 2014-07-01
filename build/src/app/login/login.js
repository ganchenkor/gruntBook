angular.module('example-app.login', [
	'ui.router'
])

.config(function($stateProvider) {
	$stateProvider
		.state('login', {
			url: '/login', 
			templateUrl: 'login/login.tpl.html'
		});
});