/*!
 * Created by Rajeshwar Patlolla https://github.com/rajeshwarpatlolla
 * Modified by Marko Marković <okram@civokram.com>
 */
'use strict';
angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.template'])

  .directive('ionicDatepicker', ['$ionicPopup', function ($ionicPopup) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        value: '=',
        weekBeginsOnMonday: '=',
        min: '=',
        max: '='
      },
      link: function (scope, element, attrs) {
        var currentDate = angular.copy(scope.value) || new Date(); // Date for the UI calendar display
        scope.highlightedDate = angular.copy(currentDate); // Temporary selected date before the 'Set' or 'Today' is pressed

        // Days of the week to be used in calendar heading
        scope.weekDays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        if (scope.weekBeginsOnMonday || false) {
          scope.weekDays.push(scope.weekDays.shift());
        }

        scope.calendarRows = new Array(6);
        scope.calendarCols = new Array(7);

        var refreshCalendar = function (currentDate) {
          scope.dayList = [];
          var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
          var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            scope.dayList.push({
              date: tempDate,
              day: tempDate.getDate()
            });
          }
          // Offset the first of the month to match the week day
          firstDay = scope.dayList[0].date.getDay();
          if (scope.weekBeginsOnMonday || false) {
            firstDay--;
          }
          for (var j = 0; j < firstDay; j++) {
            scope.dayList.unshift(undefined);
          }
          scope.currentMonth = currentDate.getMonth();
          scope.currentYear = currentDate.getFullYear();
        };

        // Go to previous month
        scope.prevMonth = function () {
          var previousLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
          if (undefined !== scope.min && previousLastDay < scope.min) {
            return;
          }
          currentDate.setMonth(currentDate.getMonth() - 1);
          refreshCalendar(currentDate)
        };

        // Go to next month
        scope.nextMonth = function () {
          var nextFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
          if (undefined !== scope.max && nextFirstDay > scope.max) {
            return;
          }
          currentDate.setMonth(currentDate.getMonth() + 1);
          refreshCalendar(currentDate)
        };

        scope.highlightDate = function (date) {
          if (typeof date !== 'undefined') {
            // Minimum date
            if (undefined !== scope.min && date < scope.min) {
              return;
            }
            // Maximum date
            if (undefined !== scope.max && date > scope.max) {
              return;
            }
            scope.highlightedDate = angular.copy(date);
            currentDate = date;
            refreshCalendar(currentDate);
          }
        };

        // Check if the day is valid (for CSS class)
        scope.isValidDay = function (rowIndex, colIndex) {
          var day = scope.dayList[rowIndex * 7 + colIndex];
          return (typeof day !== 'undefined');
        };

        // Check if the day should be selected (for CSS class)
        scope.isSelected = function (rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            var day = scope.dayList[rowIndex * 7 + colIndex];
            return (day.date.toDateString() === scope.highlightedDate.toDateString());
          }
          return false;
        };

        // Check if the day is today (for CSS class)
        scope.isToday = function (rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            return (scope.dayList[rowIndex * 7 + colIndex].date.toDateString() === new Date().toDateString());
          }
          return false;
        }

        // Check if the day should be disabled (for CSS class)
        scope.isDisabled = function (rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            // Minimum date
            if (scope.dayList[rowIndex * 7 + colIndex].date < scope.min) {
              return true;
            }
            // Maximum date
            if (scope.dayList[rowIndex * 7 + colIndex].date > scope.max) {
              return true;
            }
          }
          return false;
        }

        element.on('click', function () {
          refreshCalendar(currentDate);
          $ionicPopup.show({
            templateUrl: 'ionic-datepicker.template.html',
            title: '<strong>Select Date</strong>',
            subTitle: '',
            scope: scope,
            buttons: [
              { text: 'Close' },
              {
                text: 'Today',
                onTap: function (e) {
                  var now = new Date();
                  // Minimum date
                  if (undefined !== scope.min && now < scope.min) {
                    e.preventDefault();
                    return;
                  }
                  // Maxumum date
                  if (undefined !== scope.max && now > scope.max) {
                    e.preventDefault();
                    return;
                  }
                  scope.highlightDate(now);
                  scope.value = now;
                }
              },
              {
                text: 'Set',
                type: 'button-positive',
                onTap: function () {
                  scope.highlightDate(scope.highlightedDate);
                  scope.value = scope.highlightedDate;
                }
              }
            ]
          })
        })
      }
    }
  }]);
