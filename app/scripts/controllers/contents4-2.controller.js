/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('Contents42Ctrl', function ($scope, $routeParams, executeResults) {
        $scope.inputData = {local_id: '', local_name: '', app_cnt_total: '', church_sum: '', app_cnt_m: '', app_cnt_w: '', rooms_sum: '', rooms_m: '', rooms_w: ''};

        $scope.getLocalDt1 = function () {
            $scope.inputLocalInfo1(null);

            $('#modal-select-head').modal('show');
        };

        var getRoomDt = function (local_id) {

        }

        $scope.inputLocalInfo1 = function (local_id) {
            console.log("inputLocalInfol : " + local_id);
            if (local_id == null) {
                $scope.inputData = null;
                $scope.onthispage = local_id;
            } else {
                executeResults.getListofRoom().then(function (result) {//객실쪽 정보 획득
                    $scope.totalData = result.sending;
                }).then(function () {
                    $scope.totalRooms = $scope.totalData.length;
                    $scope.fixedRoom = 0;
                    $scope.yet = 0;

                    for (var i = 0; i < $scope.totalData.length; i++) {
                        if ($scope.totalData.is_alloc == null) {
                            $scope.yet++
                        } else {
                            $scope.fixedRoom++
                        }
                    }


                }).then(function () {
                    executeResults.getInfoofRoom(local_id).then(function (result) {//기타정보 획득
                        $scope.roomData = result[0].sending;
                        console.log($scope.roomData);

                        ;
                    });
                })


            }

            $('#modal-select-head').modal('hide');
        }

        $scope.initAlloc = function (room_no, is) {
            executeResults.roomsetting(room_no, is).then(function (result) {
                executeResults.getListofRoom().then(function(result){
                    $scope.totalData = result.sending;
                })
                console.log('바뀜');
            })

        }

    });

