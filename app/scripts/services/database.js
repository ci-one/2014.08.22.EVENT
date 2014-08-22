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

        return executeResults;
    });