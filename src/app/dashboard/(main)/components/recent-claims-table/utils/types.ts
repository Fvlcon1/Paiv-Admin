import { JSX } from "react";
import { IClaimsDetailType } from "@/app/dashboard/utils/types";

export interface IRecentTableData {
    id: string;
    hospitalName: string;
    patientName: string;
    location: string;
    diagnosis: string;
    drugs: string;
    createdAt : string
    details : IClaimsDetailType
}