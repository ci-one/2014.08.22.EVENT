/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('Contents41Ctrl', function ($scope, $routeParams, executeResults) {
        $scope.inputData = {local_id: '', local_name: '', app_cnt_total: '', church_sum: '', app_cnt_m: '', app_cnt_w: '', rooms_sum: '', rooms_m: '', rooms_w: ''};

        $scope.getLocalDt = function () {
            $scope.inputLocalInfo(null);

            $('#modal-select-local').modal('show');
        };

        var getRoomDt = function (local_id) {

        }

        $scope.inputLocalInfo = function (local) {
            if (local != null) {
                $scope.inputData.local_id = local.local_id;
                $scope.inputData.local_name = local.local_name;
                $scope.inputData.app_cnt_total = local.app_cnt_total;
                $scope.inputData.church_sum = local.church_sum;
                $scope.inputData.app_cnt_m = local.app_cnt_m;
                $scope.inputData.app_cnt_w = local.app_cnt_w;
                $scope.inputData.rooms_sum = local.rooms_sum;
                $scope.inputData.rooms_m = local.rooms_m;
                $scope.inputData.rooms_w = local.rooms_w;

                executeResults.getRoomList(local.local_id).then(function (result) {
                    $scope.getRoomList = result.sending;
                    $scope.getRoomListsub = JSON.parse(JSON.stringify(result.sending));
                });

            } else {
                $scope.inputData.local_id = '';
                $scope.inputData.local_name = '';
                $scope.inputData.app_cnt_total = '';
                $scope.inputData.church_sum = '';
                $scope.inputData.app_cnt_m = '';
                $scope.inputData.app_cnt_w = '';
                $scope.inputData.rooms_sum = '';
                $scope.inputData.rooms_m = '';
                $scope.inputData.rooms_w = '';
            }


            $('#modal-select-local').modal('hide');
        }
        $scope.gChange = function (index) {
            if ($scope.getRoomList[index].gender == null) {
                $scope.getRoomList[index].gender = 'M';
            } else if ($scope.getRoomList[index].gender == 'M') {
                $scope.getRoomList[index].gender = "W"
            } else {
                $scope.getRoomList[index].gender = "M"
            }
        }

        $scope.saveEvent = function () {
            for (var i = 0; i < $scope.getRoomList.length; i++) {
                if($scope.getRoomList[i].gender!=$scope.getRoomListsub[i].gender){
                    executeResults.setRoomData($scope.getRoomList[i].room_no,$scope.getRoomList[i].gender);
                }
            }
        }
    });

