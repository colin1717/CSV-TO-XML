angular
    .module('CsvToXml', ['ui.router', 'ngPapaParse', 'ngclipboard'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../templates/home.html'
      })
      .state('json', {
        url: '/json',
        templateUrl: '../templates/json.html'
      })
      .state('xml', {
        url: '/xml',
        templateUrl: '../templates/xml.html'
      });

      $urlRouterProvider.otherwise('/');
  }
