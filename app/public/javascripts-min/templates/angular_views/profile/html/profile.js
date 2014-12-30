(function(module) {
try {
  module = angular.module('angularTemplates2JS');
} catch (e) {
  module = angular.module('angularTemplates2JS', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/public/angular_views/profile/html/profile.html',
    '<div class="views_profile" ng-controller="views_profile_profileController"><div class="content"><div class="section"><md-text-float label="Username" ng-model="headerService.profile.name"></md-text-float></div><div class="section"><p>Background:</p><div class="avatars"><img ng-click="headerService.profile.background = \'/public/images/profile_bg1.jpg\'" ng-class="{\'selected\': headerService.profile.background === \'/public/images/profile_bg1.jpg\'}" src="/public/images/profile_bg1.jpg" height="100" width="100"> <img ng-click="headerService.profile.background = \'/public/images/profile_bg2.jpg\'" ng-class="{\'selected\': headerService.profile.background === \'/public/images/profile_bg2.jpg\'}" src="/public/images/profile_bg2.jpg" height="100" width="100"> <img ng-click="headerService.profile.background = \'/public/images/profile_bg3.jpg\'" ng-class="{\'selected\': headerService.profile.background === \'/public/images/profile_bg3.jpg\'}" src="/public/images/profile_bg3.jpg" height="100" width="100"> <img ng-click="headerService.profile.background = \'/public/images/profile_bg4.jpg\'" ng-class="{\'selected\': headerService.profile.background === \'/public/images/profile_bg4.jpg\'}" src="/public/images/profile_bg4.jpg" height="100" width="100"></div></div><div class="section"><md-button ng-click="removeLocalData()" button-to-full-screen="#E38895" class="md-raised md-full-red">Remove Local Data</md-button></div></div></div>');
}]);
})();
