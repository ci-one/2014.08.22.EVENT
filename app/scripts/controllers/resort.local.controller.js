/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';
var result = [{local_id:35,local_name:'강화동',app_cnt_total:1,church_sum:1,app_cnt_m:1,app_cnt_w:1,rooms_sum:2,rooms_m:1,rooms_w:1},
    {local_id:41,local_name:'구리시',app_cnt_total:1,church_sum:1,app_cnt_m:1,app_cnt_w:1,rooms_sum:2,rooms_m:1,rooms_w:1}];
angular.module('churchApp')
    .controller('resortLocalCtrl', function ($scope, $routeParams, executeResults) {

        //데이터 인입 후 돌릴 것
        var getData = function(){
            executeResults.getLocalListforResort().then(function(result){
                $scope.searchList = result.sending;
            });
        };
        getData();
        $scope.click_list = function (index) {
            $scope.inputLocalInfo(result[index]);
        }

        var getLocalList = function(){
            executeResults.allLocalList().then(function(result){
                $scope.getLocalList = result.sending;
            });
        }
        getLocalList();
    });

