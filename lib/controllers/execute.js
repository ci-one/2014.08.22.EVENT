/**
 * Created by SimJeongmee on 2014-08-07.
 */

'use strict';

var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');

var c = connect.connection();

//연결로그 출력
c.on('connect', function () {
    console.log('Client connected');
}).on('error', function (err) {
    console.log('Client error: ' + err);
}).on('close', function (hadError) {
    console.log('Client closed');
});

// 행사 정보 얻기
exports.getEventInfo = function (req, res) {
    var id = req.body.id;
    var sending = [];

    c.query(query.getEventInfo, [ id ])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 연회 리스트
exports.getAnnualList = function (req, res) {
    var sending = [];

    c.query(query.getAnnualList,null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 지방회 리스트
exports.getLocalList = function (req, res) {
    var sending = [];

    c.query(query.getLocalList,null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 교회 리스트
exports.getChurchList = function (req, res) {
    var sending = [];

    c.query(query.getChurchList,null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 교회 리스트 (소속까지 포함)
exports.getChurchListWithUnit = function (req, res) {
    var keyword = req.body;
    var sending = [];

    c.query(query.getChurchListWithUnit, keyword)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// insertEnterRegister - 사전 참가신청
exports.insertEnterRegister = function (req, res) {
    var inputData = req.body;
    var sending = [];

    c.query(query.insertEnterRegister, inputData)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};