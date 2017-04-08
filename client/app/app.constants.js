'use strict';

import angular from 'angular';

export default angular.module('scheduetApp.constants', [])
  .constant('appConfig', require('.././environment/shared'))
  .name;
