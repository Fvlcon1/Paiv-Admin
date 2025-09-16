import { JSX } from "react"


export interface IClaimsTableType {
    hospitalName : string
    location : string
    patientName : string
    diagnosis : string
    drugs : string
}

export interface ITableData {
    id: string;
    selectable: JSX.Element;
    hospitalName: string;
    patientName: string;
    location: string;
    diagnosis: string;
    drugs: string;
    details : IClaimsDetailType
}

export interface IClaimsDetailType {
    encounterToken : string
    totalPayout? : number
    expectedPayout? : number
    reasons? : string[]
    diagnosis : IDiagonosisType[],
    drugs : IDrugsType[],
    serviceOutcome: string;
    serviceType1: string;
    serviceType2: string;
    specialties: string[];
    typeofAttendance: string;
    medicalProcedures: string[];
    labTests: string[];
    medicalProceduresTotal : number
    labTestsTotal : number
    diagnosisTotal : number
    drugsTotal : number
    hospitalName : string
    patientName : string
    location : string
    pharmacy : string
    status : string
    encounterDetails : IEncounterDetails
}

export interface INhisDetails {
    imageUrl? : string
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisit : string,
    gender : string,
    dob : string,
    expirtyDate : string,
    enrolementStatus : string,
    insuranceType : string
    issueDate : string,
    maritalStatus : string
    residentialAddress : string
    phoneNumber : string
    ghanaCardNumber : string
    memberShipId : string
    token? : string
}

export interface IEncounterDetails extends INhisDetails {
    checkinTime? : Date,
    checkoutTime? : Date,
    disposition? : string
    checkinImageUrl : string
    checkoutImageUrl : string
    createdAt : string
    checkinStatus? : boolean
    checkoutStatus? : boolean
    claimSubmissionAt? : Date
    EncounterId? : string
}

export interface IDrugsType {
    code : string,
    description : string
    dosage : string
    date : Date
    quantity : number
    tariff : number
    total : number
}
export interface IDiagonosisType {
    GRDG : string
    description : string
    diagnosis : string
    ICD10 : string
    tariff : number
}