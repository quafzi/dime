'use strict';

(function(ng) {
  var apps = [];
  var module = ng.module('dime', apps);
  module.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);
} (angular));
