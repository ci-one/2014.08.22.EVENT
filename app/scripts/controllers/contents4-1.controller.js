/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('Contents41Ctrl', function ($scope, $routeParams, executeResults) {
        $scope.inputData = {local_id:'',local_name:'', app_cnt_total: '', church_sum:'', app_cnt_m: '', app_cnt_w:'', rooms_sum: '', rooms_m: '', rooms_w: ''};

        $scope.getLocalDt = function(){
            $scope.inputLocalInfo(null);

            $('#modal-select-local').modal('show');
        };

        var getRoomDt = function(local_id){

        }

        $scope.inputLocalInfo = function (local) {
            if(local!=null){
                $scope.inputData.local_id = local.local_id;
                $scope.inputData.local_name = local.local_name;
                $scope.inputData.app_cnt_total = local.app_cnt_total;
                $scope.inputData.church_sum = local.church_sum;
                $scope.inputData.app_cnt_m = local.app_cnt_m;
                $scope.inputData.app_cnt_w = local.app_cnt_w;
                $scope.inputData.rooms_sum = local.rooms_sum;
                $scope.inputData.rooms_m = local.rooms_m;
                $scope.inputData.rooms_w = local.rooms_w;

                getRoomDt(local.local_id);

            }else{
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

    });

