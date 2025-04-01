import { JSX } from "react";

export interface IApprovedTableData {
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
    reasons? : string[]
    diagnosis : IDiagonosisType[],
    drugs : IDrugsType[]
}

export interface IDrugsType {
    code : string,
    description : string
    quantity : number
    date : Date
}
export interface IDiagonosisType {
    GRDG : string
    description : string
    diagnosis : string
    ICD10 : string
}