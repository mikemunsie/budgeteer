!function(module){try{module=angular.module("angularTemplates2JS")}catch(e){module=angular.module("angularTemplates2JS",[])}module.run(["$templateCache",function($templateCache){$templateCache.put("/public/angular_views/edit/html/edit.html",'<div ng-controller="views_edit_editController" class="views_edit"><div class="content"><div class="tabs"><md-tabs class="md-accent" md-selected="data.selectedIndex"><md-tab id="tab1" aria-controls="tab1-content">Salary</md-tab><md-tab id="tab2" aria-controls="tab2-content">Bills</md-tab></md-tabs><ng-switch on="data.selectedIndex" class="tabpanel-container"><div role="tabpanel" id="tab1-content" aria-labelledby="tab1" ng-switch-when="0" md-swipe-left="next()" md-swipe-right="previous()"><div class="tab-content"><md-button ng-click="addSalary()" class="md-fab orange addBudget" icon-fill="#fff"><md-icon icon="/public/images/plus.svg"></md-icon></md-button><p ng-show="budgetService.budgetModel.salary.length === 0">You have not entered in any salaries.</p><div class="detail" ng-repeat="salary in budgetService.budgetModel.salary"><md-text-float label="Name:" ng-model="salary.name"></md-text-float><md-text-float label="Amount:" ng-model="salary.value"></md-text-float><md-button ng-click="budgetService.removeSalary(salary)" class="md-fab red removeBudget" icon-fill="#fff"><md-icon icon="/public/images/minus.svg"></md-icon></md-button></div></div></div><div role="tabpanel" id="tab2-content" aria-labelledby="tab2" ng-switch-when="1" md-swipe-left="next()" md-swipe-right="previous()"><div class="tab-content"><md-button ng-click="addBill()" class="md-fab orange addBudget" icon-fill="#fff"><md-icon icon="/public/images/plus.svg"></md-icon></md-button><p ng-show="budgetService.budgetModel.bills.length === 0">You have not entered in any bills.</p><div class="detail" ng-repeat="bill in budgetService.budgetModel.bills"><md-text-float label="Name:" ng-model="bill.name"></md-text-float><md-text-float label="Amount:" ng-model="bill.value"></md-text-float><md-button ng-click="budgetService.removeBill(bill)" class="md-fab red removeBudget" icon-fill="#fff"><md-icon icon="/public/images/minus.svg"></md-icon></md-button></div></div></div></ng-switch></div></div></div>')}])}();