/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';
angular.module('churchApp')
    .controller('resortHeadCtrl', function ($scope, $routeParams, executeResults) {

        $scope.click_list1 = function (church) {
            console.log("church : "+church);
            $scope.inputLocalInfo1(church.local_id);
        };

        var getLocalList = function(){
            executeResults.allLocalList().then(function(result){
                $scope.getLocalList = result.sending;
            });
        }
        getLocalList();
    });
