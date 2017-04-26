'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:calendar
 * @description
 * # calendar
 */
const name = 'calendar';

class CalendarCtrl {
  constructor() {
    var that = this;
    that.eventSources = { 
        events: [{
            title: 'event1',
            start: '2017-04-20',
            color: 'red',
            textColor: 'white'
        }, {
            title: 'event2',
            start: '2017-04-29',
            color: 'pink',
            textColor: 'blue'
        }]
    };

    that.uiConfig = {
        height: 450,
        editable: true,
        header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next myButton'
        },
        customButtons: {
            myButton: {
            text:'hello',
            click: function() {
                alert('oh yeahh');
            }
            }
        },
        eventClick: function(event, jsEvent, view) {
            that.currentEvent = event
        }       
    }; 
  }
}

angular.module('app.calendar', ['ui.router', 'ui.calendar'])
.directive('calendar', function () {
    return {
        templateUrl: '../views/calendar.html',
        restrict: 'E',
        controller: CalendarCtrl,
        controllerAs: 'calendar'
    }
})
.config(function($stateProvider) {
  	$stateProvider.state('calendar', {
  		url: '/',
  		template: '<calendar></calendar>'
  	})
});
