"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Moment = require("moment-timezone");
const sql = require("mssql");
const config = require("./config");
const memberWS_1 = require("./memberWS");
const activityWS_1 = require("./activityWS");
const organizationService = require("./services/organizationService");
exports.connectSQL = (queryStringSQL) => {
    var connection = new sql.ConnectionPool(config.sqlConfig, function (err) {
        if (err != null) {
            console.warn("Issue with connecting to SQL Server!");
        }
        else {
            var requestQuery = new sql.Request(connection);
            requestQuery.query(queryStringSQL, function (err, result) {
                if (err) {
                    console.error(`Error happened calling Query: ${err.name} ${err.message}`);
                }
                else {
                    if (result.recordset.length > 0) {
                        if (result.recordset[0].memberName) {
                            /**
                             * 同步成員名單
                             */
                            importMemberRecordset(result);
                        }
                        else if (result.recordset[0].workName == "拜訪") {
                            /**
                             * 同步梯次
                             */
                            importVisitActivityRecordset(result);
                        }
                        else if (result.recordset[0].workName == "課程") {
                            /**
                             * 同步課程
                             */
                            importCourseActivityRecordset(result);
                        }
                    }
                }
            });
        }
    });
};
const importCourseActivityRecordset = (result) => __awaiter(this, void 0, void 0, function* () {
    let activity;
    let activityUploads = [];
    result.recordset.forEach((data) => {
        console.log("-----------SQLDB Course result---------\n", data);
        activity = {
            id: data.id,
            name: data.courseName.trim() + " (" + Moment(parseInt(data.startDate)).format("MM/DD") + " - " + Moment(parseInt(data.endDate)).format("MM/DD") + ")",
            date: Moment(parseInt(data.startDate)).format("YYYY/MM/DD") + " - " + Moment(parseInt(data.endDate)).format("YYYY/MM/DD"),
            time: "",
            address: data.address,
            location: data.location,
            index: parseInt(data.startDate),
            data: {
                date: Moment(parseInt(data.startDate)).format("YYYY/MM/DD") + " - " + Moment(parseInt(data.endDate)).format("YYYY/MM/DD"),
                address: data.address.trim(),
                location: data.location.trim()
            }
        };
        activityUploads.push(activity);
    });
    yield activityWS_1.importCourseActivity(activityUploads);
});
const importVisitActivityRecordset = (result) => __awaiter(this, void 0, void 0, function* () {
    let activity;
    let activityUploads = [];
    result.recordset.forEach((data) => {
        console.log("-----------SQLDB Visit result---------\n", data);
        activity = {
            id: data.id,
            name: data.cityName.trim() + "拜訪 (" + Moment(parseInt(data.startDate)).format("MM/DD") + " - " + Moment(parseInt(data.endDate)).format("MM/DD") + ")",
            date: Moment(parseInt(data.startDate)).format("YYYY/MM/DD") + " - " + Moment(parseInt(data.endDate)).format("YYYY/MM/DD"),
            time: "",
            address: data.address,
            location: data.location,
            index: parseInt(data.startDate),
            data: {
                date: Moment(parseInt(data.startDate)).format("YYYY/MM/DD") + " - " + Moment(parseInt(data.endDate)).format("YYYY/MM/DD"),
                address: data.address.trim(),
                location: data.location.trim(),
                invitationUrl: data.invitationUrl,
                nursingUrl: data.nursingUrl,
                volunteerUrl: data.volunteerUrl
            }
        };
        activityUploads.push(activity);
    });
    // await importVisitActivity(activityUploads)
});
const importMemberRecordset = (result) => __awaiter(this, void 0, void 0, function* () {
    let member;
    let memberUploads = [];
    result.recordset.forEach((data) => {
        console.log("-------SQLDB member result---------\n", data);
        member = {
            memberId: data.memberId,
            organizationId: data.participantId,
            personalId: "",
            name: data.memberName,
            title: "",
            division: data.division,
            department: data.department,
            mobilePhone: data.mobilePhone,
            email: data.email,
            lineId: data.lineId,
            wechatId: data.wechatId,
            unitIndex: data.unitIndex,
            referrer: ""
        };
        memberUploads.push(member);
    });
    const nodeSnapshot = yield organizationService.getOrganizationByNameAndParentId(result.recordset[0].visitFlowName.trim(), result.recordset[0].sessionId);
    console.log("-------組織根節點ID---------\n", nodeSnapshot.docs[0].data().id);
    yield memberWS_1.importMember(memberUploads, nodeSnapshot.docs[0].data().id);
});
//# sourceMappingURL=connectSQL.js.map