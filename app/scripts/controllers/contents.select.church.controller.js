/**
 * Created by SimJeongmee on 2014-08-08.
 */
'use strict';

angular.module('churchApp')
    .controller('ContentsSelectChurchCtrl', function ($scope, executeResults) {
        $scope.searchList = [
            {연회명: 'test1', 지방회명: 'test1', 교회명: 'test1'},
            {연회명: 'test2', 지방회명: 'test2', 교회명: 'test2'}
        ];

        // church list load
        $scope.$on('popup:update:selectChurch', function () {
            executeResults.getChurchListWithUnit($scope.selectedChurch['교회명']).then(function (result) {
                $scope.searchList = result;
            });
        });

        $scope.click_list = function (church) {
            $scope.inputChurchInfoOnList(church);
        }
    });
