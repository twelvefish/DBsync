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
const organizationService = require("./services/organizationService");
const memberService = require("./services/memberService");
const uuid_1 = require("uuid");
exports.importMember = (memberUploads, nodeId) => __awaiter(this, void 0, void 0, function* () {
    const rootSnapshot = yield organizationService.getOrganizationById(nodeId);
    if (!rootSnapshot.empty) {
        console.log("====組織根節點存在====");
        const rootOrg = rootSnapshot.docs[0].data();
        for (const memberUpload of memberUploads) {
            /**
             * Member主檔是否存在
             */
            const memberSnapshot = yield memberService.getMemberById(memberUpload.memberId);
            let member;
            if (memberSnapshot.empty) {
                console.log("====Member不存在====");
                // 不存在則建立Member
                member = {
                    id: memberUpload.memberId,
                    name: memberUpload.name.trim(),
                    title: memberUpload.title.trim(),
                    division: memberUpload.division.trim(),
                    department: memberUpload.department.trim(),
                    email: memberUpload.email.trim(),
                    mobilePhone: memberUpload.mobilePhone.trim(),
                    lineId: memberUpload.lineId ? memberUpload.lineId.trim() : "",
                    wechatId: memberUpload.wechatId ? memberUpload.wechatId.trim() : "",
                    role: "customer",
                    index: new Date().getTime(),
                    referrer: memberUpload.referrer ? memberUpload.referrer.trim() : ""
                };
            }
            else {
                console.log("====Member已存在====");
                // 若存在則檢查是否更新職稱、部門、單位、電話、Email
                member = memberSnapshot.docs[0].data();
                if (memberUpload.name && memberUpload.name !== "")
                    member.name = memberUpload.name.trim();
                if (memberUpload.email && memberUpload.email !== "")
                    member.email = memberUpload.email.trim();
                if (memberUpload.mobilePhone && memberUpload.mobilePhone !== "")
                    member.mobilePhone = memberUpload.mobilePhone.trim();
                if (memberUpload.title && memberUpload.title !== "")
                    member.title = memberUpload.title.trim();
                if (memberUpload.division && memberUpload.division !== "")
                    member.division = memberUpload.division.trim();
                if (memberUpload.department && memberUpload.department !== "")
                    member.department = memberUpload.department.trim();
                // 若存在則檢查是否更新LineId、WeChatId
                if (memberUpload.lineId && memberUpload.lineId !== "")
                    member.lineId = memberUpload.lineId.trim();
                if (memberUpload.wechatId && memberUpload.wechatId !== "")
                    member.wechatId = memberUpload.wechatId.trim();
            }
            yield memberService.updateMember(member);
            console.log("====member建立 / 更新成功====");
            if (rootOrg.type == "department" || rootOrg.type == "system") {
                if (rootOrg.childrenId.indexOf(member.id) < 0) {
                    rootOrg.childrenId.push(member.id);
                }
            }
            let parentId = nodeId;
            if (memberUpload.division && memberUpload.division !== "") {
                /**
                 * 檢察部門是否存在
                 */
                const divsionSnapshot = yield organizationService.getOrganizationByNameAndParentId(memberUpload.division.trim(), nodeId);
                let divsionOrganization;
                if (divsionSnapshot.empty) {
                    console.log("====Divsion不存在====");
                    // 不存在則建立部門
                    divsionOrganization = {
                        id: uuid_1.v4(),
                        name: memberUpload.division.trim(),
                        type: "department",
                        parentId: nodeId,
                        index: memberUpload.unitIndex,
                        childrenId: [member.id]
                    };
                }
                else {
                    console.log("====Divsion存在====");
                    divsionOrganization = divsionSnapshot.docs[0].data();
                    if (divsionOrganization.type == "department") {
                        if (divsionOrganization.childrenId.indexOf(member.id) < 0) {
                            console.log("====將member存進Divsion====");
                            divsionOrganization.childrenId.push(member.id);
                        }
                    }
                }
                yield organizationService.updateOrganization(divsionOrganization);
                parentId = divsionOrganization.id;
            }
            if (memberUpload.department && memberUpload.department !== "") {
                /**
                 * 檢查單位是否存在
                 */
                const departmentSnapshot = yield organizationService.getOrganizationByNameAndParentId(memberUpload.department.trim(), parentId);
                let departmentOrganization;
                if (departmentSnapshot.empty) {
                    console.log("====Department不存在====");
                    // 不存在則建立單位
                    departmentOrganization = {
                        id: uuid_1.v4(),
                        name: memberUpload.department.trim(),
                        type: "department",
                        parentId: parentId,
                        index: new Date().getTime(),
                        childrenId: [member.id]
                    };
                }
                else {
                    console.log("====Department存在====");
                    departmentOrganization = departmentSnapshot.docs[0].data();
                    if (departmentOrganization.type == "department") {
                        if (departmentOrganization.childrenId.indexOf(member.id) < 0) {
                            console.log("====將member存進Department====");
                            departmentOrganization.childrenId.push(member.id);
                        }
                    }
                }
                yield organizationService.updateOrganization(departmentOrganization);
                parentId = departmentOrganization.id;
            }
            /**
             * 檢查此部門單位是否已有此成員
             */
            const memberOrgSnapshot = yield organizationService.getOrganizationByNameAndParentId(memberUpload.name.trim(), parentId);
            if (memberOrgSnapshot.empty) {
                console.log("====MemberOrganization不存在====");
                // 不存在則建立成員節點
                const memberOrganization = {
                    id: memberUpload.organizationId,
                    name: memberUpload.name.trim(),
                    type: "member",
                    memberId: member.id,
                    parentId: parentId,
                    index: new Date().getTime()
                };
                yield organizationService.updateOrganization(memberOrganization);
            }
            else {
                console.log("====MemberOrganization存在====");
            }
            console.log("--------------------------------------------------");
        }
        yield organizationService.updateOrganization(rootOrg);
    }
    else {
        console.log("====組織根節點不存在====");
    }
});
//# sourceMappingURL=memberWS.js.map