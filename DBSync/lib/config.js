"use strict";
// let queryStringSQL = "select City.id from City where City.name='上海'"
Object.defineProperty(exports, "__esModule", { value: true });
// let queryStringSQL = "INSERT INTO[LifeAcademy].[dbo].City([id], [name]) VALUES('000', '澳洲')"
// let queryStringSQL = "SELECT Participant.memberId as memberId,Member.name as memberName,Member.mobilePhone as mobilePhone,Member.email as email,Member.lineId as lineId,Member.wechatId as wechatId,Participant.sessionId as sessionId,Participant.sessionCityId as sessionCityId,Participant.visitFlowId as visitFlowId,visitFlow.name as visitFlowName,Participant.unitId as unitId,Unit.division as division,Unit.department as department,Unit.indexId as unitIndex FROM [LifeAcademy].[dbo].Participant  left join [LifeAcademy].[dbo].Member on Member.id = Participant.memberId left join [LifeAcademy].[dbo].Unit on Unit.id = Participant.unitId left join [LifeAcademy].[dbo].visitFlow on visitFlow.id = Participant.visitFlowId"
// let queryStringSQL = "SELECT Session.id as id,Session.location as location,Session.address as address,Session.startDate as startDate,Session.endDate as endDate,Session.invitationUrl as invitationUrl,Session.nursingUrl as nursingUrl,Session.volunteerUrl as volunteerUrl,Session.cityId as cityId,City.name as cityName FROM [LifeAcademy].[dbo].[Session] left join [LifeAcademy].[dbo].City on City.id = Session.cityId"
// let queryStringSQL = "SELECT Member.name as memberName,Member.mobilePhone as mobilePhone,Member.email as email,Member.lineId as lineId,\
// Member.wechatId as wechatId,City.name as cityName,visitFlow.name as visitFlowName,Participant.unitId as unitId,\
// Unit.division as division,Unit.department as department,Unit.indexId as unitIndex \
// FROM [LifeAcademy].[dbo].Participant \
// left join [LifeAcademy].[dbo].Member on Member.id = Participant.memberId \
// left join [LifeAcademy].[dbo].City on City.id = Participant.sessionCityId \
// left join [LifeAcademy].[dbo].Unit on Unit.id = Participant.unitId \
// left join [LifeAcademy].[dbo].visitFlow on visitFlow.id = Participant.visitFlowId \
// WHERE City.name = '上海' \
// AND visitFlow.name = '拜訪前'"
// let queryStringSQL = "SELECT Participant.id as participantId,Participant.memberId as memberId,Member.name as memberName,Member.mobilePhone as mobilePhone,Member.email as email,Member.lineId as lineId,\
// Member.wechatId as wechatId,Participant.sessionId as sessionId,City.name as cityName,visitFlow.name as visitFlowName,Participant.unitId as unitId,\
// Unit.division as division,Unit.department as department,Unit.indexId as unitIndex \
// FROM [LifeAcademy].[dbo].Participant \
// left join [LifeAcademy].[dbo].Member on Member.id = Participant.memberId \
// left join [LifeAcademy].[dbo].City on City.id = Participant.sessionCityId \
// left join [LifeAcademy].[dbo].Unit on Unit.id = Participant.unitId \
// left join [LifeAcademy].[dbo].visitFlow on visitFlow.id = Participant.visitFlowId \
// WHERE City.name = '上海' \
// AND visitFlow.name = '拜訪前' \
// AND Member.name = 'Raymond'"
let queryStringSQL = "SELECT Session.id as id,Session.location as location,Session.address as address,Session.startDate as startDate,Session.endDate as endDate \
,Session.invitationUrl as invitationUrl,Session.nursingUrl as nursingUrl,Session.volunteerUrl as volunteerUrl,Session.cityId as cityId,City.name as cityName,Work.name as workName \
FROM [LifeAcademy].[dbo].[Session] \
left join [LifeAcademy].[dbo].City on City.id = Session.cityId \
left join [LifeAcademy].[dbo].Work on Work.id = Session.workId \
WHERE Session.id = '860242ef-3543-44f9-b7df-2f2e7cefcb82'";
exports.sqlConfig = {
    user: 'sa',
    password: 'dj/4ej03',
    server: '140.124.183.138',
    database: 'LifeAcademy',
    options: {
        encrypt: true
    }
};
exports.sqlString = queryStringSQL;
//# sourceMappingURL=config.js.map