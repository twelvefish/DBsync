"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const memberCollection = admin.firestore().collection("Member");
exports.getMembersByMobilePhoneAndName = function (mobilePhone, name) {
    return memberCollection
        .where("mobilePhone", "==", mobilePhone)
        .where("name", "==", name).get();
};
exports.updateMember = function (member) {
    return memberCollection.doc(member.id).set(member, { merge: true });
};
exports.getMemberById = function (id) {
    return memberCollection.where("id", "==", id).get();
};
//# sourceMappingURL=memberService.js.map