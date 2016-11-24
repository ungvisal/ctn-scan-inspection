angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.scanCTN', {
    cache: false,
    url: '/scanCtn/:vid',
    views: {
      'menuContent': {
        templateUrl: 'templates/scanCTN.html',
        controller: 'ScanCtnCtrl'
      }
    }
  })

  .state('app.ctnDetail', {
    cache: false,
    url: '/ctnDetail/:item',
    views: {
      'menuContent': {
        templateUrl: 'templates/ctnDetail.html',
        controller: 'CtnDetailCtrl'
      }
    }
  })

  /*.state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html',
          controller: 'SettingCtrl'
        }
      }
    })*/

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/search');
});
