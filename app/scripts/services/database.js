/**
 * Created by SimJeongmee on 2014-08-07.
 */
'use strict';

angular.module('churchApp')
    .factory('executeResults', function ($http, $q) {
        var executeResults = {};

        // 행사 정보
        executeResults.getEventInfo = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getEventInfo',
                    data: {id: '10000000'}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 연회 목록
        executeResults.getAnnualList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getAnnualList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 지방회 목록
        executeResults.getLocalList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getLocalList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 교회 목록
        executeResults.getChurchList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getChurchList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 교회 목록(소속 포함)
        executeResults.getChurchListWithUnit = function (keyword) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getChurchListWithUnit',
                    data: {keyword: keyword}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 참가사전등록 : object 형태로 묶어 받음
        executeResults.insertEnterRegister = function(inputData) {
            var deferred = $q.defer();

            //{annual: '', local: '', church: '', name: '', duty: '', gender: '', year: '', age: '', hp: ''};

            $http({
                method: 'post',
                url: '/insertEnterRegister',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getEnteredList = function () {
            var deferred = $q.defer();

            //{annual: '', local: '', church: '', name: '', duty: '', gender: '', year: '', age: '', hp: ''};

            $http({
                method: 'post',
                url: '/getEnteredList'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        // 참가사전등록 : object 형태로 묶어 받음
        executeResults.getprvEnteredList = function() {
            var deferred = $q.defer();

            //{annual: '', local: '', church: '', name: '', duty: '', gender: '', year: '', age: '', hp: ''};

            $http({
                method: 'post',
                url: '/getprvEnteredList'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };


        executeResults.insertExpectCnt = function(local_id,expect_cnt){
            var deferred = $q.defer();
console.log(local_id+" "+expect_cnt);
            $http({
                method: 'post',
                url: '/insertExpectCnt',
                data:{local_id:local_id,expect_cnt:expect_cnt}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getLocalListforResort = function() {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getLocalListforResort'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getRoomList = function(local_id) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getRoomList',
                data:{local_id:local_id}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getListofAllRoom = function() {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getListofAllRoom'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.allLocalList = function() {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/allLocalList'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.contractRoom = function(room_no,is) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/contractRoom',
                data:{room_no:room_no,is:is}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getInfoofRoom = function(local_id) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getInfoofRoom',
                data:{local_id:local_id}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getLocalDataforRoom = function(local_id) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getLocalDataforRoom',
                data:{local_id:local_id}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.setRoomData = function(room_no,gender) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/setRoomData',
                data:{room_no:room_no,gender:gender}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.roomsetting = function(room_no,is) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/roomsetting',
                data:{room_no:room_no,is:is}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getListofRoom = function() {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getListofRoom'
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        return executeResults;
    });