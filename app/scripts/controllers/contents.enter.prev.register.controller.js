/**
 * Created by SimJeongmee on 2014-08-06.
 */
'use strict';

angular.module('churchApp')
    .controller('ContentsEnterPrevRegisterCtrl', function ($scope, executeResults) {

        // init
        $scope.inputData = {annual_id:'', annual: '', local_id:'', local: '', church_id:'', church: '', name: '', duty: '', gender: '', year: '', age: '', hp: ''};
        $scope.churchList = [];
        $scope.dutyList = ['감독', '목사', '전도사', '장로', '권사', '집사', '성도'];
        $scope.selectedChurch = '';

        $scope.churchInfo = null;

        // church list load
        var getChurchList = function () {
            executeResults.getChurchList().then(function (result) {
                $scope.churchList = result;
            });
        };
        getChurchList();

        $scope.selectChurch = function () {
            // A callback executed when a match is selected
            $scope.inputChurchInfoOnList(null);

            $('#modal-select-church').modal('show');
            $scope.$broadcast('popup:update:selectChurch');
        };

        $scope.$watch('inputData.year', function (newV, oldV) {
            // 출생년도를 입력받아 나이 출력
            var d = new Date();
            var year = d.getFullYear();

            // year - newV.ToInt32() + 1
            $scope.inputData.age = year - parseInt(newV) + 1;
        });

        $scope.$watch('inputData.age', function (newV, oldV) {
            // 나이를 입력받아 출생년도 출력
            var d = new Date();
            var year = d.getFullYear();

            $scope.inputData.year = year - parseInt(newV) + 1;
        });

        $scope.inputChurchInfoOnList = function (church) {
            $scope.churchInfo = church;

            if (church != null) {
                $scope.selectedChurch = '';

                $scope.inputData.annual_id = $scope.churchInfo['연회ID'];
                $scope.inputData.local_id = $scope.churchInfo['지방회ID'];
                $scope.inputData.church_id = $scope.churchInfo['교회ID'];

                $scope.inputData.annual = $scope.churchInfo['연회명'];
                $scope.inputData.local = $scope.churchInfo['지방회명'];
                $scope.inputData.church = $scope.churchInfo['교회명'];

                $('#modal-select-church').modal('hide');
            }
            else {
                $scope.inputData.annual_id = '';
                $scope.inputData.local_id = '';
                $scope.inputData.church_id = '';

                $scope.inputData.annual = '';
                $scope.inputData.local = '';
                $scope.inputData.church = '';
            }
        };

        var isValid = function () {
            return true;
        };

        $scope.$on('database:insertEnterRegister', function () {
            if (isValid()) {
                executeResults.insertEnterRegister($scope.inputData).then(function (data) {
                    alert(data);
                    history.back();
                })
            }
        })
    });

