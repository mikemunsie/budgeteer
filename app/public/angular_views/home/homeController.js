(function() {

  angular
    .module("views_home")
    .controller("views_home_homeController", homeController);

  function homeController($scope, components_header_headerService) {

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      title: "Hello World"
    });

    _init();

    // ========================================
    // Routines
    // ========================================

    function _init() {
      components_header_headerService.title = "";
      components_header_headerService.headerBackground = "";
      components_header_headerService.selectedLink = "home";
    }

  }

})();
