/**
 * Converts the mysql datetime format into dateToISO then it can be formatted
 * using angularJS default date filter.
 *
 * EX: {{ example.datetime | dateToIso | date : 'shortDate' }}
 */
'use strict';
angular.module('datetimeConvert', [])
.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});