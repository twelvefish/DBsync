"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const organizationCollection = admin.firestore().collection("MemberOrganization");
exports.updateOrganization = function (org) {
    return organizationCollection.doc(org.id).set(org, { merge: true });
};
exports.getOrganizationByNameAndParentId = function (name, parentId) {
    return organizationCollection.where("name", "==", name).where("parentId", "==", parentId).get();
};
exports.getOrganizationById = function (id) {
    return organizationCollection.where("id", "==", id).get();
};
//# sourceMappingURL=organizationService.js.map