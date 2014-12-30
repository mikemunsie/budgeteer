(function(module) {
try {
  module = angular.module('angularTemplates2JS');
} catch (e) {
  module = angular.module('angularTemplates2JS', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/public/angular_views/home/html/home.html',
    '<div class="views_home" ng-controller="views_home_homeController"><div class="splash"><div class="bg"></div><div class="overlay"></div><div class="logo">budgeteer</div><div class="subtitle">start managing your budget.</div><div class="actionButtons"><md-button button-to-full-screen="#4284F6" transition-link="budget" class="md-raised md-full-blue">manage my budget</md-button><md-button button-to-full-screen="#F6872D" transition-link="profile" class="md-raised md-full-orange">edit profile</md-button></div></div></div>');
}]);
})();
