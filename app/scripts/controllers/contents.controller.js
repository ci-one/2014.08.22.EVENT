/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('ContentsCtrl', function ($scope, $routeParams, executeResults, $location) {
        $scope.sub = 'true';
        var aa = $location.url().split('/')[1];
        if (aa == 0) {
            $scope.subTitleName = '지방별 사전등록';
        } else if (aa == 1) {
            $scope.subTitleName = '당일등록';
        } else if (aa == 2) {
            $scope.subTitleName = '개인 사전등록';
        } else if (aa == 3) {
            $scope.subTitleName = '등록열람';
        } else if (aa == 4) {
            $scope.subTitleName = '숙소배정';
        } else if (aa == 5) {
            $scope.subTitleName = '배정열람';
        } else if (aa == 6) {
            $scope.subTitleName = '일정표';
        } else if (aa == 7) {
            $scope.subTitleName = '행사조직';
        } else if (aa == 8) {
            $scope.subTitleName = '강사소개';
        } else if (aa == 9) {
            $scope.subTitleName = '행사회계';
        } else if (aa == 10) {
            $scope.subTitleName = '지방회 교회';
        } else if (aa == 11) {
            $scope.subTitleName = '협찬열람';
        } else if (aa == 12) {
            $scope.subTitleName = '지방회 조직';
        } else if (aa == 13) {
            $scope.subTitleName = '참가자 열람';
        }

        // 컬럼들의 정렬 순서가 담김 : ex. 1:'col1', 2: 'col2'
        $scope.orderby = {};
        // 컬럼들의 정렬 방법(isDesc)이 담김 : ex. 'col1':true, 'col2':true
        $scope.orderbyDesc = {};

        // 정렬할 컬럼을 정의
        $scope.orderItems = ['local_name', 'expect_cnt', 'fixed_cnt'];
        // 정의된 정렬 컬럼들로 정렬 순서, 정렬 방법 초기화
        $scope.initOrderColumn = function () {
            for (var i = 1; i <= $scope.orderItems.length; ++i) {
                $scope.orderby[i] = $scope.orderItems[i - 1];
                $scope.orderbyDesc[$scope.orderItems[i - 1]] = true;
            }
        };
        $scope.initOrderColumn();

        // 각 정렬 컬럼 헤더를 클릭할 때마다 토글
        $scope.toggleOrder = function (type) {

            var fieldname = '';

            switch (type) {
                case 'lname':
                    fieldname = 'local_name';
                    break;
                case 'excnt':
                    fieldname = 'expect_cnt';
                    break;
                case 'fxcnt':
                    fieldname = 'fixed_cnt';
                    break;
            }

            // type이 해당하지 않으면 종료
            if (fieldname == '')
                return;

            // toggle
            $scope.orderbyDesc[fieldname] = !$scope.orderbyDesc[fieldname];

            // sort
            // 값 복제
            var _tmpArr = JSON.parse(JSON.stringify($scope.orderby));
            // 루프를 돌면서
            for (var i = 2, j = 1; j <= $scope.orderItems.length; ++j) {
                // 컬럼이 일치하는 경우에 1번으로 보내고
                if (_tmpArr[j] == fieldname)
                    $scope.orderby[1] = _tmpArr[j];
                // 일치 하지 않으면 기존의 순서대로 삽입
                else {
                    $scope.orderby[i] = _tmpArr[j];
                    ++i;
                }
            }

            console.log($scope.orderby);
        };

        // order by를 위한 함수
        $scope.ordering = function () {
            var orderArray = [];

            for (var i = 1; i <= $scope.orderItems.length; ++i) {
                orderArray.push(($scope.orderbyDesc[$scope.orderby[i]] ? '-' : '') + $scope.orderby[i]);
            }

            return orderArray;
        };

        $scope.etrTotal = 0;
var check = function(){
    $scope.ectTotal = 0;
    for (var a = 0; a < $scope.arr.length; a++) {
        if ($scope.arr[a] != 0) {
            $scope.ectTotal += parseInt($scope.arr[a])}
    }
}
        var arr = [];
        var getprvLst = function () {
            executeResults.getprvEnteredList().then(function (result) {
                $scope.search = {local_name: '', expect_cnt: '', fixed_cnt: '', end: ''};

                $scope.items = result.sending;


                for (var i = 0; i < result.sending.length; i++) {
                    if (result.sending[i].expect_cnt != 0) {
                        $scope.etrTotal += parseInt(result.sending[i].fixed_cnt);
                    }
                    arr[i] = result.sending[i].expect_cnt;
                }
                $scope.arr = arr;
            }).then(function(){
                check();
            });
        };
        getprvLst();


        $scope.intExpCnt = function () {
            var local_id = '';
            var expect_cnt = '';
            for (var i = 0; i < arr.length; i++) {
                if ($scope.arr[i] != $scope.items[i].expect_cnt) {
                    local_id = $scope.items[i].local_id;
                    expect_cnt = $scope.arr[i];
                    executeResults.insertExpectCnt(local_id, expect_cnt).then(
                    );
                }
            }
            check();
        };

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

