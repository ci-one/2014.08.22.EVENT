/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('MainCtrl', function ($scope) {
        $scope.sub = 'false';

        $scope.click_menu = function(menu_tag) {
            location.href = '/sub/#/'+menu_tag;
        };
    });

