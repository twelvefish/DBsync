import * as admin from 'firebase-admin';
import { Member } from '../model';

const memberCollection = admin.firestore().collection("Member");

export const getMembersByMobilePhoneAndName = function (mobilePhone: string, name: string) {
    return memberCollection
        .where("mobilePhone", "==", mobilePhone)
        .where("name", "==", name).get()
}

export const updateMember = function (member: Member) {
    return memberCollection.doc(member.id).set(member, { merge: true })
}

export const getMemberById = function (id: string) {
    return memberCollection.where("id", "==", id).get()
}
