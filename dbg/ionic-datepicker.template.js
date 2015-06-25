(function(module) {
try {
  module = angular.module('ionic-datepicker.template');
} catch (e) {
  module = angular.module('ionic-datepicker.template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('ionic-datepicker.template.html',
    '<div class=datepicker><div class="row monthSelector"><button class="col col-10 button-clear icon-left ion-chevron-left" ng-click=prevMonth()></button><div class="col col-80 text-center">{{ currentMonth }} &mdash; {{ currentYear }}</div><button class="col col-10 button-clear icon-right ion-chevron-right" ng-click=nextMonth()></button></div><div class=calendar><div class="row text-center weekDays"><div class=col ng-repeat="weekDay in weekDays track by $index"><abbr title="{{ weekDay }}">{{ weekDay | limitTo:1 }}</abbr></div></div><div class="row text-center" ng-repeat="row in calendarRows track by $index"><div class=col ng-repeat="col in calendarCols track by $index" ng-class="{ \'day\': isValidDay($parent.$index, $index), \'selected\': isSelected($parent.$index, $index), \'today\': isToday($parent.$index, $index), \'disabled\': isDisabled($parent.$index, $index) }" ng-click="highlightDate(dayList[$parent.$index * 7 + $index].date)">{{ dayList[$parent.$index * 7 + $index].day }}</div></div></div></div>');
}]);
})();
