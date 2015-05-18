/*!
 * Created by Rajeshwar Patlolla https://github.com/rajeshwarpatlolla
 * Modified by Marko Marković <okram@civokram.com>
 */
"use strict";angular.module("ionic-datepicker",["ionic","ionic-datepicker.template"]).directive("ionicDatepicker",["$ionicPopup",function(t){return{restrict:"AE",replace:!0,scope:{value:"=",weekBeginsOnMonday:"=",min:"=",max:"="},link:function(e,n,a){var i=angular.copy(e.value)||new Date;e.highlightedDate=angular.copy(i),e.dayInitials=["S","M","T","W","T","F","S"],e.weekBeginsOnMonday&&e.dayInitials.push(e.dayInitials.shift()),e.calendarRows=new Array(6),e.calendarCols=new Array(7);var r=function(t){e.dayList=[];for(var n=new Date(t.getFullYear(),t.getMonth(),1).getDate(),a=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),i=n;a>=i;i++){var r=new Date(t.getFullYear(),t.getMonth(),i);e.dayList.push({date:r,day:r.getDate()})}n=e.dayList[0].date.getDay(),e.weekBeginsOnMonday&&n--;for(var o=0;n>o;o++)e.dayList.unshift(void 0);e.currentMonth=t.getMonth(),e.currentYear=t.getFullYear()};e.prevMonth=function(){var t=new Date(i.getFullYear(),i.getMonth(),0);void 0!==e.min&&t<e.min||(i.setMonth(i.getMonth()-1),e.currentMonth=i.getMonth(),e.currentYear=i.getFullYear(),r(i))},e.nextMonth=function(){var t=new Date(i.getFullYear(),i.getMonth()+1,1);void 0!==e.max&&t>e.max||(i.setMonth(i.getMonth()+1),e.currentMonth=i.getMonth(),e.currentYear=i.getFullYear(),r(i))},e.highlightDate=function(t){if("undefined"!=typeof t){if(void 0!==e.min&&t<e.min)return;if(void 0!==e.max&&t>e.max)return;e.highlightedDate=angular.copy(t),i=t,r(i)}},e.isValidDay=function(t,n){var a=e.dayList[7*t+n];return"undefined"!=typeof a},e.isSelected=function(t,n){if(e.isValidDay(t,n)){var a=e.dayList[7*t+n];return a.date.toDateString()===e.highlightedDate.toDateString()}return!1},e.isToday=function(t,n){return e.isValidDay(t,n)?e.dayList[7*t+n].date.toDateString()===(new Date).toDateString():!1},e.isDisabled=function(t,n){if(e.isValidDay(t,n)){if(e.dayList[7*t+n].date<e.min)return!0;if(e.dayList[7*t+n].date>e.max)return!0}return!1},n.on("click",function(){r(i),t.show({templateUrl:"ionic-datepicker.template.html",title:"<strong>Select Date</strong>",subTitle:"",scope:e,buttons:[{text:"Close"},{text:"Today",onTap:function(t){var n=new Date;return void 0!==e.min&&n<e.min?void t.preventDefault():void 0!==e.max&&n>e.max?void t.preventDefault():(e.highlightDate(n),void(e.value=n))}},{text:"Set",type:"button-positive",onTap:function(){e.highlightDate(e.highlightedDate),e.value=e.highlightedDate}}]})})}}}]);