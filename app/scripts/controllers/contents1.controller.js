/**
 * Created by SimJeongmee on 2014-08-05.
 */
'use strict';

angular.module('churchApp')
    .controller('Contents1Ctrl', function ($scope, $routeParams, executeResults) {
        $scope.count = 0;
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
            $scope.tryOrder = true;

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

            $scope.tryOrder = false;
        };

        // order by를 위한 함수
        $scope.ordering = function () {
            var orderArray = [];

            for (var i = 1; i <= $scope.orderItems.length; ++i) {
                orderArray.push(($scope.orderbyDesc[$scope.orderby[i]] ? '-' : '') + $scope.orderby[i]);
            }

            return orderArray;
        };


        var check = function () {
            $scope.ectTotal = 0;
            $scope.etrTotal = 0;
            for (var a = 0; a < $scope.items.length; a++) {
                if ($scope.items[a].expect_cnt != 0) {
                    $scope.ectTotal += parseInt($scope.items[a].expect_cnt);
                    $scope.etrTotal += parseInt($scope.items[a].fixed_cnt);
                }
            }
        };

        var itm = {'local_id': 0, 'local_name': '', 'expect_cnt': 0, 'fixed_cnt': 0};
        var arr = [];
        var getprvLst = function () {
            executeResults.getprvEnteredList().then(function (result) {
                $scope.oriitems = result.sending;
                $scope.search = {local_name: '', expect_cnt: 0, fixed_cnt: '', end: ''};

                for (var i = 0; i < result.sending.length; i++) {
                    itm.local_id = result.sending[i].local_id;
                    itm.local_name = result.sending[i].local_name;
                    itm.expect_cnt = result.sending[i].expect_cnt;
                    itm.fixed_cnt = result.sending[i].fixed_cnt;
                    arr.push(JSON.parse(JSON.stringify(itm)));
                }

            }).then(function () {
                $scope.items = arr;
                check();
            });
        };
        getprvLst();


        $scope.intExpCnt = function () {
            console.log('aa')
            var local_id = '';
            var expect_cnt = '';
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.oriitems[i].expect_cnt != $scope.items[i].expect_cnt) {

                    local_id = $scope.items[i].local_id;
                    expect_cnt = $scope.items[i].expect_cnt;
                    executeResults.insertExpectCnt(local_id, expect_cnt).then(
                    );
                }
            }
            check();
        };
// church list load
        var getInfo = function () {
            executeResults.getEventInfo().then(function (result) {
                $scope.count = result[0]["총인원"];
            });
        };
        getInfo();

        $scope.$watch('items', function (newV, oldV) {
            $scope.tryOrder = false;
        })
    });



/*************************************나중에 파일 옮길것**************************************************************************/


angular.module('churchApp')
    .controller('Contents10Ctrl', function ($scope, $routeParams, executeResults) {
        $scope.count = 0;
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


        // 각 지방별 사진 을 보여 줌
        $scope.photocheck = function(param){
            document.all("change_div").innerHTML="<img src='images/samples/ic"+param+".png' style='width: 100%'>";
        };


        // 각 정렬 컬럼 헤더를 클릭할 때마다 토글
        $scope.toggleOrder = function (type) {
            $scope.tryOrder = true;

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

            $scope.tryOrder = false;
        };

        // order by를 위한 함수
        // 오름차순으로 보일 수 있도록 함
        $scope.ordering = function () {
            var orderArray = [];

            for (var i = 1; i <= $scope.orderItems.length; ++i) {
                orderArray.push(($scope.orderby[$scope.orderbyDesc[i]] ? '-' : '') + $scope.orderby[i]);
            }

            return orderArray;
        };


        var check = function () {
            $scope.ectTotal = 0;
            $scope.etrTotal = 0;
            for (var a = 0; a < $scope.items.length; a++) {
                if ($scope.items[a].expect_cnt != 0) {
                    $scope.ectTotal += parseInt($scope.items[a].expect_cnt);
                    $scope.etrTotal += parseInt($scope.items[a].fixed_cnt);
                }
            }
        };

        var itm = {'local_id':0,'local_name': '', 'expect_cnt': 0, 'fixed_cnt': 0};
        var arr = [];
        var getprvLst = function () {
            executeResults.getprvEnteredList().then(function (result) {
                $scope.oriitems = result.sending;
                $scope.search = {local_name: '', expect_cnt: 0, fixed_cnt: '', end: ''};

                for (var i = 0; i < result.sending.length; i++) {
                    itm.local_id = result.sending[i].local_id;
                    itm.local_name = result.sending[i].local_name;
                    itm.expect_cnt = result.sending[i].expect_cnt;
                    itm.fixed_cnt = result.sending[i].fixed_cnt;
                    arr.push(JSON.parse(JSON.stringify(itm)));
                }

            }).then(function () {
                $scope.items = arr;
                check();
            });
        };
        getprvLst();


        //지방회별 교회 리스트 가져오는 함수
        $scope.getprvLst2 = function (param) {
//            console.log(param);
            executeResults.getLocalNameTT(param).then(function (result) {
                $scope.item2s = result.sending;
                console.log(result.sending);

            });
//            alert(result);
        };


        var tempValue = {'local_id':0,'local_name': ''};
        $scope.photocheck = function(param){
            console.log(param+"photechec2");
            executeResults.getannualNameTT(param).then(function (result) {
                $scope.item3s = result.sending;
                tempValue.local_name=result.sending[param-10].local_img;
//                alert(tempValue.local_name);
                console.log(result);
                document.all("change_div").innerHTML="<img src='images/local_img/"+tempValue.local_name+"'style='height: 43%'>";
            });

        };

        var tempValue2 = {'local_max':0,'local_name': ''};
        $scope.photocheck2 = function(param1,param2){
//            console.log(param1+"photechec2"+param2);
//            alert(param1);
//            alert(param2);

            executeResults.getLocalNameTT(param1).then(function (result) {
                $scope.item3s = result.sending;
//                alert(result.sending.length);

                tempValue2.local_max=parseInt(param2)+ parseInt(result.sending.length)-parseInt(result.sending[0].church_id);
                tempValue2.local_max=parseInt(param2)-parseInt(result.sending[0].church_id);

//                alert(tempValue2.local_max);

//                alert(result.sending[].church_img);
                tempValue2.local_name=result.sending[tempValue2.local_max].church_img;

//                alert('3');
                alert(tempValue2.local_name);
//                alert('4');
                console.log(result);
                document.all("change_div").innerHTML="<img src='images/church_img/"+tempValue2.local_name+"'style='width: 43%'>";
//                document.all("change_div").innerHTML="<img src='images/church_img/"+"church_img_1433.png"+"'style='width: 100%'>";
            });

        };


        $scope.intExpCnt = function () {console.log('aa')
            var local_id = '';
            var expect_cnt = '';
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.oriitems[i].expect_cnt != $scope.items[i].expect_cnt) {

                    local_id = $scope.items[i].local_id;
                    expect_cnt = $scope.items[i].expect_cnt;
                    executeResults.insertExpectCnt(local_id, expect_cnt).then(
                    );
                }
            }
            check();
        };
// church list load
        var getInfo = function () {
            executeResults.getEventInfo().then(function (result) {
                $scope.count = result[0]["총인원"];
            });
        };
        getInfo();

        $scope.$watch('items', function(newV, oldV) {
            $scope.tryOrder = false;
        })
    });