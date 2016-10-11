angular
    .module('CsvToXml', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../templates/home.html'
      })
      .state('output', {
        url: '/output',
        templateUrl: '../templates/output.html'
      });

      $urlRouterProvider.otherwise('/');
  }
