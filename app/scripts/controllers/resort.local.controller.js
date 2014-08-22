/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';
var result = [{local_id:1,local_name:'test',app_cnt_total:1,church_sum:1,app_cnt_m:1,app_cnt_w:1,rooms_sum:2,rooms_m:1,rooms_w:1}];
angular.module('churchApp')
    .controller('resortLocalCtrl', function ($scope, $routeParams, executeResults) {
        $scope.searchList = [
            {지방회: 'test1', 여부: 'y'},
            {지방회: 'test2', 여부: null}
        ];

        //데이터 인입 후 돌릴 것
        var getData = function(){
            executeResults.getLocalListforResort().then(function(result){
                $scope.searchList = result.sending;
            });
        };

        $scope.click_list = function () {
            $scope.inputLocalInfo(result[0]);
        }

    });

