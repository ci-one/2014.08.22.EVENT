/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('Contents43Ctrl', function ($scope, $routeParams, executeResults) {

        var roomData = function () {
            executeResults.getListofAllRoom().then(function (result) {
                $scope.getDataResult = result.sending;

            }).then(function(){
                var n=0;
                for(var i = 0;i<$scope.getDataResult.length;i++){
                    if($scope.getDataResult[i].is_contract!=null){
                        n++;
                    }
                }
                $scope.numOfRoom = n;
            });
        }
        roomData();
        $scope.contracts = function(room_no,is){
            executeResults.contractRoom(room_no,is).then(function(data){
                alert(data);
            }).then(function(){
                roomData();
            })
        }

        $scope.changeData = function(contract){
            if(contract==null){
                roomData();
            }else{
                var arr = JSON.parse(JSON.stringify($scope.getDataResult));
                var array=[];
                for(var i=0;i<arr.length;i++){
                    if(arr[i].is_contract!=null){
                        array.push(arr[i]);
                    }
                }

                $scope.getDataResult = array;
            }
        }
    });

