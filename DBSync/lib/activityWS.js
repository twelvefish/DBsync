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
const menuService = require("./services/menuService");
const organizationService = require("./services/organizationService");
const uuid_1 = require("uuid");
exports.importVisitActivity = (activityUploads) => __awaiter(this, void 0, void 0, function* () {
    for (const activityUpload of activityUploads) {
        if (activityUpload.name != "") {
            let memberOrganizationBefore = {
                id: uuid_1.v4(),
                name: "拜訪前",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            };
            let memberOrganizationAfter = {
                id: uuid_1.v4(),
                name: "拜訪後",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            };
            yield menuService.setBeforeVisitActivity(activityUpload);
            console.log("====拜訪前梯次建立 / 更新成功====");
            memberOrganizationBefore.parentId = activityUpload.id;
            yield menuService.setAfterVisitActivity(activityUpload);
            console.log("====拜訪後梯次建立 / 更新成功====");
            memberOrganizationAfter.parentId = activityUpload.id;
            const snapshotBefore = yield organizationService.getOrganizationByNameAndParentId("拜訪前", memberOrganizationBefore.parentId);
            if (!snapshotBefore.empty)
                memberOrganizationBefore = snapshotBefore.docs[0].data();
            const snapshotAfter = yield organizationService.getOrganizationByNameAndParentId("拜訪後", memberOrganizationAfter.parentId);
            if (!snapshotAfter.empty)
                memberOrganizationAfter = snapshotAfter.docs[0].data();
            // 建立/更新 成員組織根節點
            yield organizationService.updateOrganization(memberOrganizationBefore);
            yield organizationService.updateOrganization(memberOrganizationAfter);
            console.log("====拜訪前 / 後成員組織根節點建立成功====");
        }
    }
});
exports.importCourseActivity = (activityUploads) => __awaiter(this, void 0, void 0, function* () {
    for (const activityUpload of activityUploads) {
        if (activityUpload.name != "") {
            let memberOrganizationBefore = {
                id: uuid_1.v4(),
                name: "課前",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            };
            let memberOrganizationAfter = {
                id: uuid_1.v4(),
                name: "課中",
                type: "department",
                parentId: "",
                index: new Date().getTime(),
                childrenId: []
            };
            yield menuService.setBeforeCourseActivity(activityUpload);
            console.log("====課前梯次建立 / 更新成功====");
            memberOrganizationBefore.parentId = activityUpload.id;
            yield menuService.setAfterCourseActivity(activityUpload);
            console.log("====課中梯次建立 / 更新成功====");
            memberOrganizationAfter.parentId = activityUpload.id;
            const snapshotBefore = yield organizationService.getOrganizationByNameAndParentId("課前", memberOrganizationBefore.parentId);
            if (!snapshotBefore.empty)
                memberOrganizationBefore = snapshotBefore.docs[0].data();
            const snapshotAfter = yield organizationService.getOrganizationByNameAndParentId("課中", memberOrganizationAfter.parentId);
            if (!snapshotAfter.empty)
                memberOrganizationAfter = snapshotAfter.docs[0].data();
            // 建立/更新 成員組織根節點
            yield organizationService.updateOrganization(memberOrganizationBefore);
            yield organizationService.updateOrganization(memberOrganizationAfter);
            console.log("====課前 / 中成員組織根節點建立成功====");
        }
    }
});
//# sourceMappingURL=activityWS.js.map