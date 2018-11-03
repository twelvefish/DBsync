
import * as Moment from "moment-timezone"
import * as sql from 'mssql'

import * as config from './config'
import { jsontMember, Activity } from "./model"
import { importMember } from './memberWS';
import { importVisitActivity, importCourseActivity } from './activityWS';
import * as organizationService from "./services/organizationService"

export const connectSQL = (queryStringSQL: string) => {
    var connection: sql.ConnectionPool = new sql.ConnectionPool(config.sqlConfig, function (err: any) {
        if (err != null) {
            console.warn("Issue with connecting to SQL Server!");
        } else {
            var requestQuery = new sql.Request(connection);

            requestQuery.query(queryStringSQL, function (err, result: any) {
                if (err) {
                    console.error(`Error happened calling Query: ${err.name} ${err.message}`);
                } else {
                    if (result.recordset.length > 0) {
                        if (result.recordset[0].memberName) {
                            /**
                             * 同步成員名單
                             */
                            importMemberRecordset(result)
                        } else if (result.recordset[0].workName == "拜訪") {
                            /**
                             * 同步梯次
                             */
                            importVisitActivityRecordset(result)
                        } else if (result.recordset[0].workName == "課程") {
                            /**
                             * 同步課程
                             */
                            importCourseActivityRecordset(result)
                        }
                    }
                }
            })
        }
    });
}

const importCourseActivityRecordset = async (result) => {
    let activity: Activity
    let activityUploads: Activity[] = []
    result.recordset.forEach((data: any) => {
        console.log("-----------SQLDB Course result---------\n", data)
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
        }
        activityUploads.push(activity)
    })
    await importCourseActivity(activityUploads)
}

const importVisitActivityRecordset = async (result) => {
    let activity: Activity
    let activityUploads: Activity[] = []
    result.recordset.forEach((data: any) => {
        console.log("-----------SQLDB Visit result---------\n", data)
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
        }
        activityUploads.push(activity)
    })
    await importVisitActivity(activityUploads, result.recordset[0].workName)
}

const importMemberRecordset = async (result) => {
    let member: jsontMember
    let memberUploads: jsontMember[] = []
    result.recordset.forEach((data: any) => {
        console.log("-------SQLDB member result---------\n", data)
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
        }
        memberUploads.push(member)
    })

    const nodeSnapshot = await organizationService.getOrganizationByNameAndParentId(result.recordset[0].visitFlowName.trim(), result.recordset[0].sessionId)
    console.log("-------組織根節點ID---------\n", nodeSnapshot.docs[0].data().id)
    await importMember(memberUploads, nodeSnapshot.docs[0].data().id)
}
