export interface IClaimsTableType {
    hospitalName : string
    location : string
    patientName : string
    diagnosis : string
    drugs : string
}

export interface IClaimsDetailType {
    totalPayout : number
    reasons? : string[]
    diagnosis : IDiagonosisType[],
    drugs : IDrugsType[]
}

export interface IDrugsType {
    code : string,
    description : string
    dosage : string
    date : Date
}
export interface IDiagonosisType {
    GRDG : string
    description : string
    diagnosis : string
    ICD10 : string
}