'use strict';

describe('Controller: CalendarctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var CalendarctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalendarctrlCtrl = $controller('CalendarctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CalendarctrlCtrl.awesomeThings.length).toBe(3);
  });
});
