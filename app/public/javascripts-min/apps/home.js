(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

  // Import Views
  require("../../angular_views/home");
  require("../../angular_views/budget");
  require("../../angular_views/profile");
  require("../../angular_views/edit");

  var dependencies = [
    "views_home",
    "views_budget",
    "views_profile",
    "views_edit",
    "ngRoute"
  ];

  angular
    .module("app-home", dependencies)
    .config(homeConfig);

  function homeConfig($interpolateProvider, $routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "/public/angular_views/home/html/home.html"
      })
      .when('/budget', {
        templateUrl: "/public/angular_views/budget/html/budget.html"
      })
      .when('/profile', {
        templateUrl: "/public/angular_views/profile/html/profile.html"
      })
      .when('/edit', {
        templateUrl: "/public/angular_views/edit/html/edit.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  }

})();
},{"../../angular_views/budget":30,"../../angular_views/edit":33,"../../angular_views/home":36,"../../angular_views/profile":38}],2:[function(require,module,exports){
(function() {

  angular
    .module("angularTemplates2JS", []);

})();
},{}],3:[function(require,module,exports){
require("./__angularTemplates2JS.js");
},{"./__angularTemplates2JS.js":2}],4:[function(require,module,exports){
(function() {

  var dependencies = [
    "LocalStorageModule",
    "ngCookies",
    "ngRoute",
    "toaster",
    "ngRoute"
  ];

  angular
    .module("components_budget", []);

})();
},{}],5:[function(require,module,exports){
(function() {

  angular
    .module("components_budget")
    .factory("components_budget_budgetService", budgetService);

  function budgetService(components_dataModel_dataService) {

    var model = components_dataModel_dataService({
      name: "budgetModel",
      autoSaveEnabled: true,
      autoSaveInterval: 3000,
      model: {
        bills: [],
        salary: []
      }
    });

    var budgetModel = model.read();

    // ========================================
    // Interface
    // ========================================

    return {
      addBill: addBill,
      addSalary: addSalary,
      budgetModel: budgetModel,
      convertToMoney: convertToMoney,
      createBudgetPieData: createBudgetPieData,
      getSummary: getSummary,
      getTotalSalary: getTotalSalary,
      getTotalBills: getTotalBills,
      getTotalSavings: getTotalSavings,
      model: model,
      removeBill: removeBill,
      removeSalary: removeSalary,
      sanitizeMoney: sanitizeMoney
    };

    // ========================================
    // Routines
    // ========================================

    function addBill(bill) {
      if (isNaN(bill.value)) {
        salary.value = 0;
      }
      budgetModel.bills.push({
        name: bill.name,
        value: parseFloat(bill.value).toFixed(2)
      });
    }

    function addSalary(salary) {
      if (isNaN(salary.value)) {
        salary.value = 0;
      }
      budgetModel.salary.push({
        name: salary.name,
        value: parseFloat(salary.value).toFixed(2)
      });
    }

    function convertToMoney(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function createBudgetPieData() {
      if (budgetModel.bills.length > 0 && budgetModel.salary.length > 0) {
        return {
          content: [
            {
              label: "Bills",
              value: parseInt(getTotalBills(), 0),
              color: "#F6872D"
            },
            {
              label: "Savings",
              value: parseInt(getTotalSavings(), 0),
              color: "#4CCF4C"
            }
          ]
        };
      } else {
        return {
          content: [
            {
              label: "No budget found.",
              value: 100,
              color: "#F6872D"
            }
          ]
        };
      }
    }

    function getSummary() {
      return {
        salary: getTotalSalary(),
        bills: getTotalBills(),
        savings: getTotalSavings()
      };
    }

    function getTotalSalary() {
      var total = 0;
      sanitizeMoney();
      _.forEach(budgetModel.salary, function(salaryItem) {
        total+=parseFloat(salaryItem.value);
      });
      console.log(total);
      total = parseFloat(total).toFixed(2);
      return total;
    }

    function getTotalBills() {
      var total = 0;
      sanitizeMoney();
      _.forEach(budgetModel.bills, function(billItem) {
        total+=parseFloat(billItem.value);
      });
      total = parseFloat(total).toFixed(2);
      return total;
    }

    function getTotalSavings() {
      var salaryTotal = getTotalSalary();
      var billsTotal = getTotalBills();
      return parseFloat(salaryTotal - billsTotal).toFixed(2);
    }

    function removeBill(billItem) {
      _.remove(budgetModel.bills, billItem);
    }

    function removeSalary(salaryItem) {
      _.remove(budgetModel.salary, salaryItem);
    }

    function sanitizeMoney() {
      _.forEach(budgetModel.bills, function(billItem) {
        if (isNaN(billItem.value)) {
          billItem.value = billItem.value.replace(/[^0-9\.]+/g,"");
          billItem.value = billItem.value === '' ? 0 : billItem.value;
        }
        billItem.value = parseFloat(billItem.value).toFixed(2);
      });
      _.forEach(budgetModel.salary, function(salaryItem) {
        if (isNaN(salaryItem.value)) {
          salaryItem.value = salaryItem.value.replace(/[^0-9\.]+/g,"");
          salaryItem.value = salaryItem.value === '' ? 0 : salaryItem.value;
        }
        salaryItem.value = parseFloat(salaryItem.value).toFixed(2);
      });
    }

  }

})();
},{}],6:[function(require,module,exports){
// Modules
require("./__budget.js");
require("./budgetService.js");
},{"./__budget.js":4,"./budgetService.js":5}],7:[function(require,module,exports){
(function() {

  var dependencies = [
    "ngMaterial"
  ];

  angular
    .module("components_d3pie", dependencies);

})();
},{}],8:[function(require,module,exports){
(function(){

  angular
    .module("components_d3pie")
    .directive('d3pie', d3pieDirective);

  function d3pieDirective() {
    return {
      restrict: 'A',
      scope: {
        "pieData": "="
      },
      link: function(scope, element, attr) {
        var previousWidth = $(window).width();
        element.addClass("d3pie");
        redrawPie(scope, element, attr);
        $(window).on("resize.d3pie", function() {
          if ($(window).width() !== previousWidth) {
            previousWidth = $(window).width();
            redrawPie(scope, element, attr);
          }
        });
      }
    };
  }

  // ========================================
  // Routines
  // ========================================

  function redrawPie(scope, element, attr) {
    var data = scope.pieData;
    element.find("*").remove();
    var pie = new d3pie(element[0], {
      labels: {
        outer: {
          format: "percentage",
          hideWhenLessThanPercentage: null,
          pieDistance: 10,
          color: "#000"
        },
        inner: {
          format: "label",
          hideWhenLessThanPercentage: false
        },
        mainLabel: {
          color: "#fff",
          font: "roboto",
          fontSize: 13
        },
        percentage: {
          color: "#000",
          font: "arial",
          fontSize: 10,
          decimalPlaces: 0
        },
      },
      size: {
        canvasHeight: element.width(),
        canvasWidth: element.width(),
        pieInnerRadius: 50,
        pieOuterRadius: null
      },
      data: data
    });
  }

})();
},{}],9:[function(require,module,exports){
// Modules
require("./__d3pie.js");
require("./d3pieDirective.js");
},{"./__d3pie.js":7,"./d3pieDirective.js":8}],10:[function(require,module,exports){
/**
 * DataModel Component
 *
 * Creates a data persistent model that can be shared between
 * various controllers. The model is mapped through local storage
 * to help keep track of the data if the user refreshes a page.
 *
 */

(function(){

	var dependencies = [
	  "LocalStorageModule"
	];

	angular
		.module("components_dataModel", dependencies);

})();
},{}],11:[function(require,module,exports){
(function(){

  angular
    .module("components_dataModel")
    .factory("components_dataModel_dataService", dataService);

  function dataService(localStorageService, $interval, $timeout){
    return function(newModel) {
      return new DataModel(newModel, localStorageService, $interval, $timeout);
    };
  }

  function DataModel(newModel, localStorageService, $interval, $timeout){
    var options = {
      autoSaveInterval: 6000,
      autoSaveEnabled: false,
      localStorage: true,
      model: {}
    };
    var autoSaveTimer = null;
    var models = DataModel.models;

    _init();

    // ========================================
    // Interface
    // ========================================

    return {
      _init: _init,
      autoSave: autoSave,
      create: create,
      loadModelFromLocalStorage: loadModelFromLocalStorage,
      read: read,
      remove: remove,
      reset: reset,
      save: save
    };

    // ========================================
    // Routines
    // ========================================

    function _init() {
      options = _.extend(options, newModel);
      if (localStorage) {
        loadModelFromLocalStorage();
      }
      if (!models[options.name]) {
        create();
      }
      if (options.autoSaveEnabled) {
        autoSave();
      }
    }

    function autoSave() {
      autoSaveTimer = $interval(function(){
        save();
      }, options.autoSaveInterval);
    }

    function create() {
      models[options.name] = {
        originalModel: options.model,
        model: angular.copy(options.model)
      };
      return this;
    }

    function loadModelFromLocalStorage() {
      if (localStorageService.get(options.name)) {
        models[options.name] = localStorageService.get(options.name);
      }
      return this;
    }

    function read() {
      return models[options.name].model;
    }

    function remove() {
      localStorageService.remove(options.name);
      $interval.cancel(autoSaveTimer);
      return this;
    }

    function reset() {
      angular.copy(models[options.name].originalModel, models[options.name].model);
      save();
      return models[options.name].model;
    }

    function save() {
      localStorageService.set(options.name, models[options.name]);
      return this;
    }

  }

  DataModel.models = {};

})();
},{}],12:[function(require,module,exports){
// Modules
require("./__dataModel.js");
require("./dataService.js");
},{"./__dataModel.js":10,"./dataService.js":11}],13:[function(require,module,exports){
(function() {

  var dependencies = [
    "ngMaterial",
    "components_profile",
    "components_budget"
  ];

  angular
    .module("components_header", dependencies);

})();
},{}],14:[function(require,module,exports){
(function() {

  angular
    .module("components_header")
    .controller("components_header_headerController", headerController);

  function headerController($scope, $location, components_header_headerService, $mdSidenav) {

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      headerService: components_header_headerService,
      openSidebar: openSidebar,
      gotoLink: gotoLink,
      goBack: goBack
    });

    _init();

    // ========================================
    // Routines
    // ========================================

    function _init() {

    }

    function goBack() {
      components_header_headerService.showBackButton = false;
      window.history.go(-1);
    }

    function gotoLink(link) {
      components_header_headerService.showBackButton = false;
      $location.url(link);
      $mdSidenav('left').toggle();
    }

    function openSidebar() {
      $mdSidenav('left').toggle();
    }

  }

})();

},{}],15:[function(require,module,exports){
(function() {

  angular
    .module("components_header")
    .factory("components_header_headerService", headerService);

  function headerService(components_profile_profileService) {

    // ========================================
    // Interface
    // ========================================

    return {
      title: "",
      selectedLink: "nothing",
      showBackButton: false,
      profile: components_profile_profileService.model.read()
    };
  }

})();
},{}],16:[function(require,module,exports){
// Dependencies
require("../../angular_components/profile");
require("../../angular_components/budget");

// Modules
require("./__header.js");
require("./headerService.js");
require("./headerController.js");
},{"../../angular_components/budget":6,"../../angular_components/profile":24,"./__header.js":13,"./headerController.js":14,"./headerService.js":15}],17:[function(require,module,exports){
/**
 * Markup
 * <md-icon icon-fill="red" icon="'/img/icons/test.svg'" style="width: 32px; height: 32px;"></md-icon>
 */

(function() {

  var dependencies = [
    "ngMaterial"
  ];

  angular
    .module("components_iconFill", dependencies);

})();
},{}],18:[function(require,module,exports){
(function(){

  angular
    .module("components_iconFill")
    .directive('iconFill', iconFillDirective);

  function iconFillDirective() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var object = angular.element(element[0].children[0]);
        if (angular.isDefined(attr.iconFill)) {
          object.load(object.attr("icon"), false, function () {
            object.find("svg").css("fill", attr.iconFill);
            if (angular.isDefined(attr.iconHeight)) {
              object.find("svg").css("height", attr.iconHeight);
            }
            if (angular.isDefined(attr.iconWidth)) {
              object.find("svg").css("width", attr.iconWidth);
            }
          });
        }
      }
    };
  }

})();
},{}],19:[function(require,module,exports){
// Modules
require("./__iconFill.js");
require("./iconFillDirective.js");
},{"./__iconFill.js":17,"./iconFillDirective.js":18}],20:[function(require,module,exports){
(function() {

  var dependencies = [
    "components_header"
  ];

  angular
    .module("components_materialButtons", []);

})();
},{}],21:[function(require,module,exports){
(function(){

  angular
    .module("components_materialButtons")
    .directive('buttonToFullScreen', buttonToFullScreenDirective);

  function buttonToFullScreenDirective($timeout, $location) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        element.on("click", function(e) {

          var bg = attr.buttonToFullScreen;
          var newElement;
          var animateToSize = $(window).height() > $(window).width() ? $(window).height() : $(window).width();

          // Make a copy of the element so we can return the original later
          newElement = angular.element("<div></div>");

          element.css({
            opacity: 0
          });

          newElement.css({
            backgroundColor: bg,
            left: element.offset().left,
            top: element.offset().top,
            width: element.outerWidth(),
            height: element.outerHeight(),
            borderRadius: element.css("borderRadius")
          });

          newElement.addClass("buttonToFullScreen-fixed");
          newElement.find("*").remove();
          $("body").append(newElement);

          // Animate
          newElement.css({
            left: -$(window).width()/2,
            top: -$(window).height()/2,
            height: animateToSize*2,
            width: animateToSize*2
          });

          $timeout(function() {
            newElement.css({
              opacity: 0
            });
            element.css({
              opacity: 1
            });

            // Transition to link at the end?
            if (angular.isDefined(attr.transitionLink)) {
              $location.url(attr.transitionLink);
            }

            $timeout(function() {
              newElement.remove();
            }, 500);
          }, 500);

        });
      }
    };
  }

})();
},{}],22:[function(require,module,exports){
// Modules
require("./__materialButtons.js");
require("./buttonToFullScreen.js");
},{"./__materialButtons.js":20,"./buttonToFullScreen.js":21}],23:[function(require,module,exports){
(function() {

  var dependencies = [
    "LocalStorageModule",
    "ngCookies",
    "ngRoute",
    "toaster",
    "ngRoute"
  ];

  angular
    .module("components_profile", []);

})();
},{}],24:[function(require,module,exports){
// Modules
require("./__profile.js");
require("./profileService.js");
},{"./__profile.js":23,"./profileService.js":25}],25:[function(require,module,exports){
(function() {

  angular
    .module("components_profile")
    .factory("components_profile_profileService", profileService);

  function profileService(components_dataModel_dataService) {

    var model = components_dataModel_dataService({
      name: "profileModel",
      autoSaveEnabled: true,
      autoSaveInterval: 3000,
      model: {
        pic: "/public/images/avatar_1.png",
        background: "/public/images/profile_bg4.jpg",
        name: "New User"
      }
    });

    // ========================================
    // Interface
    // ========================================

    return {
      model: model
    };

  }

})();
},{}],26:[function(require,module,exports){
(function() {

  var dependencies = [
    "angularTemplates2JS",
    "LocalStorageModule",
    "ngCookies",
    "ngRoute",
    "toaster",
    "ngMaterial",
    "ngRoute",
    "components_dataModel",
    "components_iconFill",
    "components_materialButtons",
    "components_header",
    "components_d3pie",
    "components_budget",
    "components_profile"
  ];

  angular
    .module("layouts_default", dependencies, function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    });

})();

},{}],27:[function(require,module,exports){
// Dependencies
require("../../angular_components/angularTemplates2JS");
require("../../angular_components/materialButtons");
require("../../angular_components/iconFill");
require("../../angular_components/header");
require("../../angular_components/d3pie");
require("../../angular_components/budget");
require("../../angular_components/profile");
require("../../angular_components/dataModel");

// Modules
require("./__default.js");
},{"../../angular_components/angularTemplates2JS":3,"../../angular_components/budget":6,"../../angular_components/d3pie":9,"../../angular_components/dataModel":12,"../../angular_components/header":16,"../../angular_components/iconFill":19,"../../angular_components/materialButtons":22,"../../angular_components/profile":24,"./__default.js":26}],28:[function(require,module,exports){
(function() {

  var dependencies = [
    "layouts_default"
  ];

  angular
    .module("views_budget", dependencies);

})();
},{}],29:[function(require,module,exports){
(function() {

  angular
    .module("views_budget")
    .controller("views_budget_budgetController", budgetController);

  function budgetController($scope, components_header_headerService, components_budget_budgetService) {

    var budgetService = components_budget_budgetService;

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      budgetService: budgetService,
      budgetPieData: budgetService.createBudgetPieData()
    });

    _init();

    // ========================================
    // Routines
    // ========================================

    function _init() {
      components_header_headerService.title = "Monthly Budget";
      components_header_headerService.headerBackground = "#4284F6";
      components_header_headerService.selectedLink = "budget";
    }

  }

})();

},{}],30:[function(require,module,exports){
// Dependencies
require("../../angular_layouts/default");

// Templates
require("../../javascripts-min/templates/angular_views/budget/html/budget.js");

// Modules
require("./__budget.js");
require("./budgetController.js");
},{"../../angular_layouts/default":27,"../../javascripts-min/templates/angular_views/budget/html/budget.js":40,"./__budget.js":28,"./budgetController.js":29}],31:[function(require,module,exports){
(function() {

  var dependencies = [
    "layouts_default"
  ];

  angular
    .module("views_edit", dependencies);

})();
},{}],32:[function(require,module,exports){
(function() {

  angular
    .module("views_edit")
    .controller("views_edit_editController", editController);

  function editController($scope, components_header_headerService, components_budget_budgetService) {

    var budgetService = components_budget_budgetService;

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      budgetService: budgetService,
      addSalary: addSalary,
      addBill: addBill
    });

    _init();

    // ========================================
    // Routines
    // ========================================

    function _init() {
      components_header_headerService.title = "Edit Monthly Budget";
      components_header_headerService.headerBackground = "#4CCF4C";
      components_header_headerService.showBackButton = true;
    }

    function addSalary() {
      budgetService.budgetModel.salary.push({
        name: "",
        value: 0
      });
    }

    function addBill() {
      budgetService.budgetModel.bills.push({
        name: "",
        value: 0
      });
    }

  }

})();

},{}],33:[function(require,module,exports){
// Templates
require("../../javascripts-min/templates/angular_views/edit/html/edit.js");

// Modules
require("./__edit.js");
require("./editController.js");
},{"../../javascripts-min/templates/angular_views/edit/html/edit.js":41,"./__edit.js":31,"./editController.js":32}],34:[function(require,module,exports){
(function() {

  var dependencies = [
    "layouts_default"
  ];

  angular
    .module("views_home", dependencies);

})();
},{}],35:[function(require,module,exports){
(function() {

  angular
    .module("views_home")
    .controller("views_home_homeController", homeController);

  function homeController($scope, components_header_headerService, components_profile_profileService, components_budget_budgetService) {

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      loadSampleProfile: loadSampleProfile
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

    function loadSampleProfile() {
      components_profile_profileService.model.read().name = "Sample User";
      components_budget_budgetService.model.read().salary = [
        { name: "My Salary", value: "2000.00"}
      ];
      components_budget_budgetService.model.read().bills = [
        { name: "Apartment", value: "550.00" },
        { name: "Phone", value:"90.00" },
        { name: "Food", value:"300.00" },
        { name: "Gas", value:"300.00" },
        { name: "Tolls", value:"50" }
      ];
    }
  }

})();

},{}],36:[function(require,module,exports){
// Dependencies
require("../../angular_layouts/default");

// Templates
require("../../javascripts-min/templates/angular_views/home/html/home.js");

// Modules
require("./__home.js");
require("./homeController.js");
},{"../../angular_layouts/default":27,"../../javascripts-min/templates/angular_views/home/html/home.js":42,"./__home.js":34,"./homeController.js":35}],37:[function(require,module,exports){
(function() {

  var dependencies = [
    "layouts_default"
  ];

  angular
    .module("views_profile", dependencies);

})();
},{}],38:[function(require,module,exports){
// Dependencies
require("../../angular_layouts/default");

// Templates
require("../../javascripts-min/templates/angular_views/profile/html/profile.js");

// Modules
require("./__profile.js");
require("./profileController.js");
},{"../../angular_layouts/default":27,"../../javascripts-min/templates/angular_views/profile/html/profile.js":43,"./__profile.js":37,"./profileController.js":39}],39:[function(require,module,exports){
(function() {

  angular
    .module("views_profile")
    .controller("views_profile_profileController", profileController);

  function profileController($scope, components_header_headerService, components_profile_profileService, components_budget_budgetService) {

    // ========================================
    // Interface
    // ========================================

    _.extend($scope, {
      headerService: components_header_headerService,
      removeLocalData: removeLocalData
    });

    _init();

    // ========================================
    // Routines
    // ========================================

    function _init() {
      components_header_headerService.title = "Profile";
      components_header_headerService.headerBackground = "#F6872D";
      components_header_headerService.selectedLink = "profile";
    }

    function removeLocalData() {
      components_profile_profileService.model.reset();
      components_budget_budgetService.model.reset();
    }

  }

})();

},{}],40:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('angularTemplates2JS');
} catch (e) {
  module = angular.module('angularTemplates2JS', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/public/angular_views/budget/html/budget.html',
    '<div ng-controller="views_budget_budgetController" class="views_budget"><div class="content"><div class="tabs"><md-tabs class="md-accent" md-selected="data.selectedIndex"><md-tab id="tab1" aria-controls="tab1-content">Summary</md-tab><md-tab id="tab2" aria-controls="tab2-content">Details</md-tab></md-tabs><ng-switch on="data.selectedIndex" class="tabpanel-container"><div role="tabpanel" id="tab1-content" aria-labelledby="tab1" ng-switch-when="0" md-swipe-left="next()" md-swipe-right="previous()"><div d3pie="" pie-data="budgetPieData"></div><div class="stats"><div class="stat"><span class="key">Total Salary:</span> <span class="value">$[[budgetService.convertToMoney(budgetService.getTotalSalary())]]</span></div><div class="stat"><span class="key">Total Bills:</span> <span class="value">$[[budgetService.convertToMoney(budgetService.getTotalBills())]]</span></div><div class="stat last"><span class="key">Total Savings:</span> <span class="value">$[[budgetService.convertToMoney(budgetService.getTotalSavings())]]</span></div></div></div><div role="tabpanel" id="tab2-content" aria-labelledby="tab2" ng-switch-when="1" md-swipe-left="next()" md-swipe-right="previous()"><md-button class="md-fab green addBudget" button-to-full-screen="#4CCF4C" transition-link="edit" icon-fill="#fff"><md-icon icon="/public/images/edit.svg"></md-icon></md-button><div class="details"><h2>Salary</h2><div ng-show="budgetService.budgetModel.salary.length === 0">You have not entered in any salaries.</div><div class="detail" ng-repeat="salary in budgetService.budgetModel.salary"><div class="key">[[salary.name]]</div><div class="value">$[[budgetService.convertToMoney(salary.value)]]</div></div></div><div class="details"><h2>Bills</h2><div ng-show="budgetService.budgetModel.bills.length === 0">You have entered in any bills.</div><div class="detail" ng-repeat="bill in budgetService.budgetModel.bills"><div class="key">[[bill.name]]</div><div class="value">$[[budgetService.convertToMoney(bill.value)]]</div></div></div></div></ng-switch></div></div></div>');
}]);
})();

},{}],41:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('angularTemplates2JS');
} catch (e) {
  module = angular.module('angularTemplates2JS', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/public/angular_views/edit/html/edit.html',
    '<div ng-controller="views_edit_editController" class="views_edit"><div class="content"><div class="tabs"><md-tabs class="md-accent" md-selected="data.selectedIndex"><md-tab id="tab1" aria-controls="tab1-content">Salary</md-tab><md-tab id="tab2" aria-controls="tab2-content">Bills</md-tab></md-tabs><ng-switch on="data.selectedIndex" class="tabpanel-container"><div role="tabpanel" id="tab1-content" aria-labelledby="tab1" ng-switch-when="0" md-swipe-left="next()" md-swipe-right="previous()"><div class="tab-content"><md-button ng-click="addSalary()" class="md-fab orange addBudget" icon-fill="#fff"><md-icon icon="/public/images/plus.svg"></md-icon></md-button><p ng-show="budgetService.budgetModel.salary.length === 0">You have not entered in any salaries.</p><div class="detail" ng-repeat="salary in budgetService.budgetModel.salary"><md-text-float label="Name:" ng-model="salary.name"></md-text-float><md-text-float label="Amount:" ng-model="salary.value"></md-text-float><md-button ng-click="budgetService.removeSalary(salary)" class="md-fab red removeBudget" icon-fill="#fff"><md-icon icon="/public/images/minus.svg"></md-icon></md-button></div></div></div><div role="tabpanel" id="tab2-content" aria-labelledby="tab2" ng-switch-when="1" md-swipe-left="next()" md-swipe-right="previous()"><div class="tab-content"><md-button ng-click="addBill()" class="md-fab orange addBudget" icon-fill="#fff"><md-icon icon="/public/images/plus.svg"></md-icon></md-button><p ng-show="budgetService.budgetModel.bills.length === 0">You have not entered in any bills.</p><div class="detail" ng-repeat="bill in budgetService.budgetModel.bills"><md-text-float label="Name:" ng-model="bill.name"></md-text-float><md-text-float label="Amount:" ng-model="bill.value"></md-text-float><md-button ng-click="budgetService.removeBill(bill)" class="md-fab red removeBudget" icon-fill="#fff"><md-icon icon="/public/images/minus.svg"></md-icon></md-button></div></div></div></ng-switch></div></div></div>');
}]);
})();

},{}],42:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('angularTemplates2JS');
} catch (e) {
  module = angular.module('angularTemplates2JS', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/public/angular_views/home/html/home.html',
    '<div class="views_home" ng-controller="views_home_homeController"><div class="splash"><div class="bg"></div><div class="overlay"></div><div class="logo">budgeteer</div><div class="subtitle">start managing your budget.</div><div class="actionButtons"><md-button button-to-full-screen="#4284F6" transition-link="budget" class="md-raised md-full-blue">manage my budget</md-button><md-button button-to-full-screen="#F6872D" ng-click="loadSampleProfile()" transition-link="budget" class="md-raised md-full-orange">load sample profile</md-button></div></div></div>');
}]);
})();

},{}],43:[function(require,module,exports){
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

},{}]},{},[1])