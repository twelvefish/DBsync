export type jsontMember = {
    memberId: string,
    organizationId: string,
    personalId: string,
    name: string,
    title: string,
    division: string,
    department: string,
    mobilePhone: string,
    email: string,
    lineId?: string,
    wechatId?: string,
    unitIndex?: number,
    referrer?: string
}

export type Member = {
    id: string
    name: string
    title?: string
    division?: string
    department?: string
    email: string
    mobilePhone: string
    businessPhone?: string
    lineId: string
    wechatId: string
    role: "manager" | "staff" | "student" | "customer"
    sid?: string //學號、員工編號
    path?: string
    index?: number
    referrer?: string
    student?: string
    data?: any
}

export type MemberOrganization = ({
    type: "department" | "system"
    activityId?: string
    childrenId?: any[]  //組織下的所有人
} | {
    type: "member"
    memberId: string               //對應 Member Collection 的id
}) & {
    id: string
    index?: number                 //排序
    parentId: string
    name: string
}

export type Activity = {
    id: string
    name: string
    index: number
    date: string
    time: string
    address: string
    location: string
    data?: any
}