/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('ContentsCtrl', function ($scope, $routeParams, executeResults,$location) {

        $scope.sub = 'true';
        var aa = $location.url().split('/')[1];
        if(aa==0){
            $scope.subTitleName = '지방별 사전등록';
        }else if(aa==1){
            $scope.subTitleName = '당일등록';
        }else if(aa==2){
            $scope.subTitleName = '개인 사전등록';
        }else if(aa==3){
            $scope.subTitleName = '등록열람';
        }else if(aa==4){
            $scope.subTitleName = '숙소배정';
        }else if(aa==5){
            $scope.subTitleName = '배정열람';
        }else if(aa==6){
            $scope.subTitleName = '일정표';
        }else if(aa==7){
            $scope.subTitleName = '행사조직';
        }else if(aa==8){
            $scope.subTitleName = '강사소개';
        }else if(aa==9){
            $scope.subTitleName = '행사회계';
        }else if(aa==10){
            $scope.subTitleName = '지방회 교회';
        }else if(aa==11){
            $scope.subTitleName = '협찬열람';
        }else if(aa==12){
            $scope.subTitleName = '지방회 조직';
        }else if(aa==13){
            $scope.subTitleName = '참가자 열람';
        }



        // init
        $scope.tabPage = '';
        $scope.count = 0;

        // church list load
        var getInfo = function () {
            executeResults.getEventInfo().then(function (result) {
                $scope.count = result[0]["총인원"];
            });
        };
        getInfo();

        //처음에는 탭페이지 로딩하지 않음
        //$scope.tabPage = '등록';

        $scope.tab_click = function (tabs) {
            $scope.tabPage = tabs;
        };

        $scope.submit = function () {

            switch ($scope.tabPage) {
                case '등록': // insert
                {
                    $scope.$broadcast('database:insertEnterRegister');
                }
                    break;
                case '수정': // update (phone 기준)
                    break;
                case '열람':
                    break;
                default:
                    break;
            }
        };

        $scope.getTabClass = function () {
            var tabClass = '';

            switch ($scope.tabPage) {
                case '등록':
                    tabClass = 'tabs-option-add';
                    break;
                case '수정':
                    tabClass = 'tabs-option-edit';
                    break;
                case '열람':
                    tabClass = 'tabs-option-list';
                    break;
                default:
                    break;
            }

            return tabClass;
        };

        $scope.getTabContainerClass = function () {
            var tabContainerClass = '';

            switch ($scope.tabPage) {
                case '등록':
                    tabContainerClass = 'tabs-container-add';
                    break;
                case '수정':
                    tabContainerClass = 'tabs-container-edit';
                    break;
                case '열람':
                    tabContainerClass = 'tabs-container-list';
                    break;
                default:
                    break;
            }

            return tabContainerClass;
        }
    });

