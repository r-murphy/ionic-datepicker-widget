//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

"use strict";
angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates'])

  .directive('ionicDatepicker', ['$ionicPopup', function ($ionicPopup) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        value: '=value'
      },
      link: function (scope, element, attrs) {
        var now = new Date();

        var currentDate = angular.copy(scope.value);
        scope.dayInitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        scope.rows = new Array(6);
        scope.cols = new Array(7);

        scope.selectedDate = now;
        var refreshCalendar = function (currentDate) {

          var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
          var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            scope.dayList.push({
              date: tempDate,
              day: tempDate.getDate()
            });
          }

          // Offset the first of the month
          firstDay = scope.dayList[0].date.getDay();
          for (var j = 0; j < firstDay; j++) {
            scope.dayList.unshift(undefined);
          }

          scope.currentMonth = currentDate.getMonth();
          scope.currentYear = currentDate.getFullYear();
        };

        // Go to previous month
        scope.prevMonth = function () {
          currentDate.setMonth(currentDate.getMonth() - 1);
          scope.currentMonth = currentDate.getMonth();
          scope.currentYear = currentDate.getFullYear();
          refreshCalendar(currentDate)
        };

        // Go to next month
        scope.nextMonth = function () {
          currentDate.setMonth(currentDate.getMonth() + 1);
          scope.currentMonth = currentDate.getMonth();
          scope.currentYear = currentDate.getFullYear();
          refreshCalendar(currentDate)
        };

        scope.setDate = function (date) {
          if (typeof date !== 'undefined') {
            scope.selectedDate = date.date;
          }
        };

        // Check if the day is valid
        scope.isValidDay = function(rowIndex, colIndex) {
          var day = scope.dayList[rowIndex * 7 + colIndex];
          return (typeof day !== 'undefined');
        };
        // Check if the day should be selected
        scope.isSelected = function(rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            var day = scope.dayList[rowIndex * 7 + colIndex]
            return (day.date.toDateString() === scope.selectedDate.toDateString());
          }
          return false;
        };
        // Check if the day is today
        scope.isToday = function(rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            return (scope.dayList[rowIndex * 7 + colIndex].date.toDateString() === new Date().toDateString());
          }
          return false;
        }

        element.on("click", function () {
          var now = new Date();
          if (!scope.value) {
            refreshCalendar(now);
          } else {
            refreshCalendar(scope.value);
          }

          $ionicPopup.show({
            templateUrl: 'date-picker-modal.html',
            title: '<strong>Select Date</strong>',
            subTitle: '',
            scope: scope,
            buttons: [
              {text: 'Close'},
              {
                text: 'Today',
                onTap: function (e) {
                  refreshCalendar(now);
                  e.preventDefault();
                }
              },
              {
                text: 'Set',
                type: 'button-positive',
                onTap: function () {
                  scope.value = scope.selectedDate;
                }
              }
            ]
          })
        })
      }
    }
  }]);
