import * as menuService from './services/menuService'
import * as organizationService from "./services/organizationService"

import { Activity, MemberOrganization } from "./model"
import { v4 as uuidv4 } from "uuid"

export const importVisitActivity = async (activityUploads: Activity[], workName: string) => {
    for (const activityUpload of activityUploads) {
        if (activityUpload.name != "") {

            let memberOrganizationBefore: MemberOrganization = {
                id: uuidv4(),
                name: "拜訪前",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            }

            let memberOrganizationAfter: MemberOrganization = {
                id: uuidv4(),
                name: "拜訪後",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            }

            await menuService.setBeforeVisitActivity(activityUpload)
            console.log("====拜訪前梯次建立 / 更新成功====")
            memberOrganizationBefore.parentId = activityUpload.id

            await menuService.setAfterVisitActivity(activityUpload)
            console.log("====拜訪後梯次建立 / 更新成功====")
            memberOrganizationAfter.parentId = activityUpload.id


            const snapshotBefore = await organizationService.getOrganizationByNameAndParentId("拜訪前", memberOrganizationBefore.parentId)
            if (!snapshotBefore.empty)
                memberOrganizationBefore = snapshotBefore.docs[0].data() as MemberOrganization

            const snapshotAfter = await organizationService.getOrganizationByNameAndParentId("拜訪後", memberOrganizationAfter.parentId)
            if (!snapshotAfter.empty)
                memberOrganizationAfter = snapshotAfter.docs[0].data() as MemberOrganization

            // 建立/更新 成員組織根節點
            await organizationService.updateOrganization(memberOrganizationBefore)
            await organizationService.updateOrganization(memberOrganizationAfter)
            console.log("====拜訪前 / 後成員組織根節點建立成功====")
        }
    }
}

export const importCourseActivity = async (activityUploads: Activity[]) => {
    for (const activityUpload of activityUploads) {
        if (activityUpload.name != "") {

            let memberOrganizationBefore: MemberOrganization = {
                id: uuidv4(),
                name: "課前",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            }

            let memberOrganizationAfter: MemberOrganization = {
                id: uuidv4(),
                name: "課中",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            }

            await menuService.setBeforeCourseActivity(activityUpload)
            console.log("====課前梯次建立 / 更新成功====")
            memberOrganizationBefore.parentId = activityUpload.id

            await menuService.setAfterCourseActivity(activityUpload)
            console.log("====課中梯次建立 / 更新成功====")
            memberOrganizationAfter.parentId = activityUpload.id


            const snapshotBefore = await organizationService.getOrganizationByNameAndParentId("課前", memberOrganizationBefore.parentId)
            if (!snapshotBefore.empty)
                memberOrganizationBefore = snapshotBefore.docs[0].data() as MemberOrganization

            const snapshotAfter = await organizationService.getOrganizationByNameAndParentId("課中", memberOrganizationAfter.parentId)
            if (!snapshotAfter.empty)
                memberOrganizationAfter = snapshotAfter.docs[0].data() as MemberOrganization

            // 建立/更新 成員組織根節點
            await organizationService.updateOrganization(memberOrganizationBefore)
            await organizationService.updateOrganization(memberOrganizationAfter)
            console.log("====課前 / 中成員組織根節點建立成功====")
        }
    }
}