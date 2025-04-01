import { JSX } from "react";
import { IClaimsDetailType } from "../../utils/types";

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