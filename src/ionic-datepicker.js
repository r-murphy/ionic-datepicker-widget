//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

'use strict';
angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates'])

  .directive('ionicDatepicker', ['$ionicPopup', function ($ionicPopup) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        value: '=',
        weekBeginsOnMonday: '@'
      },
      link: function (scope, element, attrs) {
        var currentDate = angular.copy(scope.value) || new Date(); // Date for the UI calendar display
        scope.selectedDate = currentDate; // Temporary selected date before the 'Set' or 'Today' is pressed

        scope.dayInitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        if (scope.weekBeginsOnMonday || false) {
          scope.dayInitials.push(scope.dayInitials.shift());
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

        // Check if the day is valid (for CSS class)
        scope.isValidDay = function (rowIndex, colIndex) {
          var day = scope.dayList[rowIndex * 7 + colIndex];
          return (typeof day !== 'undefined');
        };

        // Check if the day should be selected (for CSS class)
        scope.isSelected = function (rowIndex, colIndex) {
          if (scope.isValidDay(rowIndex, colIndex)) {
            var day = scope.dayList[rowIndex * 7 + colIndex]
            return (day.date.toDateString() === scope.selectedDate.toDateString());
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

        element.on('click', function () {
          refreshCalendar(currentDate);
          $ionicPopup.show({
            templateUrl: 'date-picker-modal.html',
            title: '<strong>Select Date</strong>',
            subTitle: '',
            scope: scope,
            buttons: [
              { text: 'Close' },
              {
                text: 'Today',
                onTap: function () {
                  var now = new Date();
                  scope.setDate({ date: now });
                  scope.value = now;
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
