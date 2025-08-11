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
    encounterId : string
    checkinTime? : Date,
    checkoutTime? : Date,
    disposition? : string
    checkinImageUrl : string
    checkoutImageUrl : string
    createdAt : string
    checkinStatus? : boolean
    checkoutStatus? : boolean
    claimSubmissionAt? : Date
}