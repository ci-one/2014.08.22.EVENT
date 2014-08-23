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

//참가 리스트
exports.getEnteredList = 'select tbAttend.event_code, tbAttend.org_code, ' +
    'tbAttend.member_id, tbMem.member_name, tbMem.gender, tbOrg.org_name, ' +
    'tbChurch.church_name from m_attend_status as tbAttend left join m_member_code' +
    ' as tbMem on tbMem.member_id = tbAttend.member_id left join c_methodist_org as tbOrg' +
    ' on tbOrg.org_code = tbAttend.org_code left join c_church as tbChurch on tbChurch.church_id = tbMem.church_id';

//사전참가 리스트
exports.getprvEnteredList = "select tbLocalList.local_id, tbLocalList.local_name, ifnull(tbOrgReg.expect_cnt, 0) as expect_cnt, " +
    "ifnull(tbOrgReg.fixed_cnt, 0) as fixed_cnt from(select distinct tbUnit.local_id, concat(tbLocal.local_name, '지방') " +
    "as local_name from m_church_unit as tbUnit left join c_local as tbLocal on tbLocal.local_id = tbUnit.local_id where " +
    "tbLocal.is_delete is null and tbUnit.is_delete is null and tbUnit.annual_id = '12') as tbLocalList left join d_adv_reg as " +
    "tbOrgReg on tbOrgReg.local_id =  tbLocalList.local_id;";



////////////////////////////init from seongyu//////////////////////////
//예상참가인원 추가
exports.insertExpectCnt = "insert into d_adv_reg(event_code, local_id, expect_cnt, fixed_cnt) values('10001001', :local_id, :expect_cnt, 0) on duplicate key update expect_cnt = :expect_cnt;";

//숙소배정 - 객실배정 객실정보획득
exports.getListofRoom = "select * from m_resort_code where is_contract is not null and is_delete is null";

//숙소배정 - 객실배정 기타정보 획득
exports.getInfoofRoom = "select c_local.local_name, d_adv_reg.fixed_cnt from m_resort_code, c_local," +
    " d_adv_reg where m_resort_code.local_id=c_local.local_id and m_resort_code.local_id=d_adv_reg.local_id and" +
    " c_local.local_id=d_adv_reg.local_id and c_local.local_id=?";

/*
*
 //숙소배정 - 객실배정 기타정보 획득
 exports.getInfoofRoom = "select m_resort_code.COL, c_local.local_name, d_adv_reg.fixed_cnt from m_resort_code, c_local," +
 " d_adv_reg where m_resort_code.local_id=c_local.local_id and m_resort_code.local_id=d_adv_reg.local_id and" +
 " c_local.local_id=d_adv_reg.local_id and c_local.local_id=?";
* */




//객실현황 및 계약객실 획득 - 숙소배정 계약객실
exports.getListofAllRoom = "select house_name, room_no, is_contract from m_resort_code where is_delete is null";

//객실계약 - 숙소배정 계약객실
exports.contractRoom1 = "update m_resort_code set is_contract='y' where room_no=?";
exports.contractRoom2 = "update m_resort_code set is_contract=null where room_no=?";

//객실배정
exports.roomsetting1 = "update m_resort_code set is_alloc='y' where room_no=?";
exports.roomsetting2 = "update m_resort_code set is_alloc=null where room_no=?";



//모든 지방회 리스트 객실배정
exports.allLocalList = "select local_id, local_name from c_local where is_delete is null";

//숙소를 위한 지방회 리스트 - 개별배정, 객실배정
exports.getLocalListforResort = "select c_local.local_id, c_local.local_name, m_resort_code.is_alloc from c_local, m_resort_code where" +
    " m_resort_code.local_id=c_local.local_id and m_resort_code.is_delete is null and c_local.is_delete is null";

//지방회 정보획득 - 개별배정
exports.getLocalDataforRoom = "select c_local.local_name, count(m_member_code.event_code) as entNum, m_member_code.gender, " +
    "count(m_church_unit.church_id), m_resort_code.room_no, m_resort_code.house_name, m_resort_code.gender from c_local," +
    " m_resort_code, m_member_code, m_church_unit where c_local.local_id=m_member_code.local_id and c_local.local_id=m_church_unit.local_id" +
    " and m_member_code.local_id=m_church_unit.local_id and m_resort_code.local_id=m_member_code.local_id and " +
    "m_resort_code.local_id=m_church_unit.local_id and m_member_code.event_code='10001001' and m_church_unit.local_id=?";

//방정보 변경 - 개별배정
exports.setRoomData = "update m_resort_code set gender=? where room_no=?";

//지방회의 숙소리스트 - 객실배정
exports.getRoomList = "select house_name, room_no, gender from m_resort_code where local_id=? and is_delete is null";