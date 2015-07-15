'use strict';

describe('Controller: MscvCtrl', function () {

  // load the controller's module
  beforeEach(module('mscv'));

  var MscvCtrl,
      scope;

  // let's mock some properties
  var skillsMock = {
    skillFilter: [1,2,3],
    skillItemsLimit: 10
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();

    MscvCtrl = $controller('MscvCtrl', {
      skills: skillsMock,
      dataservice: {
        getAppContent: function() {
          var deferred = $q.defer();
          return deferred.promise;
        }
      }
      //$scope: scope
    });
  }));

  it('should have skillFilter list with three items', function () {
    expect(MscvCtrl.skillFilter.length).toBe(3);
  });

  it('skillItemsLimit should have value of 10', function () {
    expect(MscvCtrl.skillItemsLimit).toBe(10);
  });

  it('should change skillItemsLimit from 10 to 1000', function () {
    MscvCtrl.skillsShowMoreLess();
    expect(MscvCtrl.skillItemsLimit).toBe(1000);
  });

});
