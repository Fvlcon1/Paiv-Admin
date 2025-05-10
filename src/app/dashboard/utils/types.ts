export interface IClaimsTableType {
    hospitalName : string
    location : string
    patientName : string
    diagnosis : string
    drugs : string
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