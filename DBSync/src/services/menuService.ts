import * as admin from 'firebase-admin';

const taskVisitCollection = admin.firestore().collection("Work").doc("d7fa1181-9454-4ee8-8333-21161c574921").collection("Task")
const beforeVisitActivityCollection = taskVisitCollection.doc("3503d043-78d9-40e0-b7f6-a2de87b2c876").collection("Activity")
const afterVisitActivityCollection = taskVisitCollection.doc("883cb81c-ecfd-4100-bc62-664c890b3a5f").collection("Activity")

const taskCourseCollection = admin.firestore().collection("Work").doc("befb339f-419c-4834-a023-7405bebb031d").collection("Task")
const beforeCourseActivityCollection = taskCourseCollection.doc("2fb0fbcd-47cf-4cc6-8627-ab7d07921713").collection("Activity")
const afterCourseActivityCollection = taskCourseCollection.doc("4e5d0e3a-afc0-4633-a8b6-1869eaf7afde").collection("Activity")


export const setBeforeVisitActivity = function (activity: any) {
    return beforeVisitActivityCollection.doc(activity.id).set(activity, { merge: true })
}

export const setAfterVisitActivity = function (activity: any) {
    return afterVisitActivityCollection.doc(activity.id).set(activity, { merge: true })
}

export const setBeforeCourseActivity = function (activity: any) {
    return beforeCourseActivityCollection.doc(activity.id).set(activity, { merge: true })
}

export const setAfterCourseActivity = function (activity: any) {
    return afterCourseActivityCollection.doc(activity.id).set(activity, { merge: true })
}