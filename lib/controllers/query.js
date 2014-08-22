/**
 * Created by SimJeongmee on 2014-08-07.
 */

//exports.getEventInfo = "select 연회행사.* from 연회행사 where 행사코드 = ?";
exports.getEventInfo = "select 연회행사.*, coalesce (sum(참석인원), 0) as '총인원'"
                        + " from 연회행사"
                        + " join 행사참가현황"
                        + " on 연회행사.행사코드 = 행사참가현황.행사코드"
                        + " where 연회행사.행사코드= ? and 삭제여부 is null";

exports.getAnnualList = 'select * from 연회 where 삭제여부 is null';
exports.getLocalList = 'select * from 지방회 where 삭제여부 is null';
exports.getChurchList = 'select * from 교회 where 삭제여부 is null';

//filter 교회명 필요
exports.getChurchListWithUnit = "select 연회.연회ID, 연회.연회명"
                                + " , 지방회.지방회ID, 지방회.지방회명"
                                + " , 교회.교회ID, 교회.교회명"
                                + " from 연회구성"
                                + " join 연회"
                                + "     on 연회구성.연회ID = 연회.연회ID"
                                + " join 지방회"
                                + "     on 연회구성.지방회ID = 지방회.지방회ID"
                                + " join 교회"
                                + "     on 연회구성.교회ID = 교회.교회ID"
                                + " where 교회.교회명 like concat('%',:keyword,'%')"
                                + "     and 연회구성.삭제여부 is null";

//사전 참가신청
//{annual: '', local: '', church: '', name: '', duty: '', gender: '', year: '', age: '', hp: ''};
exports.insertEnterRegister = "insert into request(type, writer, tel, email, company, option1, option2, option3, 1000_main, money, date)"
    + " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())";