export interface ProviderTable {
    providerId: string;
    providerName: string;
    prescribingLevel: string;
    providerCategory: string;
    email: string;
    credentialStatus: string;
    district: string;
    totalClaims: number;
    totalApprovedAmount: number;
}

interface GPSLocation {
    lat: number;
    lng: number;
}

interface ContactPerson {
    name: string;
    role: string;
    email: string;
    phone: string;
}

interface Address {
    physical: string;
    digital: string;
    gps: GPSLocation;
}

interface CredentialInfo {
    id: string;
    issueDate: string;
    expiryDate: string;
    documentUrl: string;
}

interface DateInfo {
    createdAt: string;
    updatedAt: string;
}

interface Claims {
    totalClaims: number;
    totalApprovedAmount: number;
}

export interface Provider {
    providerId: number | string;
    providerName: string;
    prescribingLevel: string;
    providerCategory: string;
    email: string;
    contactEmail: string;
    credentialStatus: string;
    district: string;
    region: string;
    facilityType: string;
    contactPerson: ContactPerson;
    address: Address;
    credentialInfo: CredentialInfo;
    dates: DateInfo;
    claims: Claims;
}

export interface ProviderProfile {
    facilityId: string
    providerName: string
    prescribingLevel: string
    providerCategory: string
    email: string
    credentialStatus: string
    district: string
    phone: string
    address: string
    region: string
    establishedDate?: string
    staffCount?: number
    specialties?: string[]
}