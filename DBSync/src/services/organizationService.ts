import * as admin from 'firebase-admin';
import {  MemberOrganization } from '../model';

const organizationCollection = admin.firestore().collection("MemberOrganization");

export const updateOrganization = function (org: MemberOrganization) {
    return organizationCollection.doc(org.id).set(org, { merge: true })
}

export const getOrganizationByNameAndParentId = function (name: string, parentId: string) {
    return organizationCollection.where("name", "==", name).where("parentId", "==", parentId).get()
}

export const getOrganizationById = function (id: string) {
    return organizationCollection.where("id", "==", id).get()
}