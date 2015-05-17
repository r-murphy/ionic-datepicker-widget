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
        var monthsList = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"];

        var currentDate = scope.value;
        scope.dayInitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        scope.today = {};
        scope.today.dateObj = now;
        scope.today.date = now.getDate();
        scope.today.month = now.getMonth();
        scope.today.year = now.getFullYear();

        var refreshCalendar = function (currentDate) {
          scope.selectedDateString = (new Date(currentDate)).toString();

          var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
          var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            scope.dayList.push({
              date: tempDate.getDate(),
              month: tempDate.getMonth(),
              year: tempDate.getFullYear(),
              day: tempDate.getDay(),
              dateString: tempDate.toString(),
              epochLocal: tempDate.getTime(),
              epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
            });
          }

          var firstDay = scope.dayList[0].day;

          for (var j = 0; j < firstDay; j++) {
            scope.dayList.unshift({});
          }

          scope.rows = [];
          scope.cols = [];

          scope.currentMonth = monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          scope.numColumns = 7;
          scope.rows.length = 6;
          scope.cols.length = scope.numColumns;

        };

        scope.prevMonth = function () {
          if (currentDate.getMonth() === 1) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() - 1);

          scope.currentMonth = monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          refreshCalendar(currentDate)
        };

        scope.nextMonth = function () {
          if (currentDate.getMonth() === 11) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() + 1);

          scope.currentMonth = monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          refreshCalendar(currentDate)
        };

        scope.date_selection = {selected: false, selectedDate: '', submitted: false};

        scope.dateSelected = function (date) {
          scope.selectedDateString = date.dateString;
          scope.date_selection.selected = true;
          scope.date_selection.selectedDate = new Date(date.dateString);
        };

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
                onTap: function (e) {
                  scope.date_selection.submitted = true;

                  if (scope.date_selection.selected === true) {
                    scope.value = scope.date_selection.selectedDate;
                  } else {
                    e.preventDefault();
                  }
                }
              }
            ]
          })
        })
      }
    }
  }]);
