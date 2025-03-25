import { JSX } from "react";

export interface IApprovedTableData {
    id: string;
    selectable: JSX.Element;
    hospitalName: string;
    patientName: string;
    location: string;
    diagnosis: string;
    drugs: string;
}