'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execute = require('./controllers/execute');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);


    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/')
        .get(index.index);

    app.route('/sub')
        .get(index.subindex);

    // ********* custom begin *********
    app.route('/getEventInfo')
        .post(execute.getEventInfo);

    app.route('/getAnnualList')
        .post(execute.getAnnualList);

    app.route('/getLocalList')
        .post(execute.getLocalList);

    app.route('/getChurchList')
        .post(execute.getChurchList);

    app.route('/getChurchListWithUnit')
        .post(execute.getChurchListWithUnit);

    app.route('/insertEnterRegister')
        .post(execute.insertEnterRegister);
    // ********* custom end *********

    app.route('/getEnteredList')
        .post(execute.getEnteredList);

    app.route('/getprvEnteredList')
        .post(execute.getprvEnteredList);

    app.route('/insertExpectCnt')
        .post(execute.insertExpectCnt);

    app.route('/getLocalListforResort')
        .post(execute.getLocalListforResort);

    app.route('/getRoomList')
        .post(execute.getRoomList);

    app.route('/getListofAllRoom')
        .post(execute.getListofAllRoom);

    app.route('/contractRoom')
        .post(execute.contractRoom);

    app.route('/getLocalDataforRoom')
        .post(execute.getLocalDataforRoom);

    app.route('/setRoomData')
        .post(execute.setRoomData);

    app.route('/allLocalList')
        .post(execute.allLocalList);

    app.route('/getInfoofRoom')
        .post(execute.getInfoofRoom);

    app.route('/getListofRoom')
        .post(execute.getListofRoom);

    app.route('/roomsetting')
        .post(execute.roomsetting);


    app.route('/getLocalNameTT')
        .post(execute.getLocalNameTT);


    app.route('/getannualNameTT')
        .post(execute.getannualNameTT);
};