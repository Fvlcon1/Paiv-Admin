import { Provider, ProviderProfile, ProviderTable } from "./types"

export const transformProviders = (data: any) : Provider[] => {
    return data.map((dataItem: any) => {
        const item = dataItem.provider
        const totalClaims = dataItem.claims_count

        return {
            providerId: item.id,
            providerName: item.facility_name,
            prescribingLevel: item.prescribing_level,
            providerCategory: item.facility_type,
            email: item.org_email,
            contactEmail: item.contact_person_email,
            credentialStatus: item.credential_status,
            district: item.district,
            region: item.region,
            facilityType: item.facility_type,
            claims : {
                totalClaims,
                totalApprovedAmount : 0
            },
            contactPerson: {
                name: item.contact_person_name,
                role: item.contact_person_role,
                email: item.contact_person_email,
                phone: item.phone_number
            },
            address: {
                physical: item.physical_address,
                digital: item.digital_address,
                gps: item.gps_coordinates
            },
            credentialInfo: {
                id: item.credential_id,
                issueDate: item.issue_date,
                expiryDate: item.expiry_date,
                documentUrl: item.credential_document_url
            },
            dates: {
                createdAt: item.created_at,
                updatedAt: item.updated_at,
            }
        }
    })
}

export const transformProvidersToTable = (providers: Provider[]): ProviderTable[] => {
    return providers.map((provider: Provider) => {
        return {
            providerId: provider.providerId.toString(), // Ensure it's a string
            providerName: provider.providerName,
            prescribingLevel: provider.prescribingLevel,
            providerCategory: provider.providerCategory,
            email: provider.email,
            credentialStatus: provider.credentialStatus,
            district: provider.district,
            lastUpdated: provider.dates.updatedAt,
            totalClaims: provider.claims.totalClaims,
            totalApprovedAmount: provider.claims.totalApprovedAmount
        };
    });
};

export const extractProviderProfile = (provider: Provider): ProviderProfile => {
    return {
        facilityId: provider.providerId.toString(),
        providerName: provider.providerName,
        prescribingLevel: provider.prescribingLevel,
        providerCategory: provider.providerCategory,
        email: provider.email,
        credentialStatus: provider.credentialStatus,
        district: provider.district,
        phone: provider.contactPerson.phone,
        address: provider.address.physical,
        region: provider.region,
        establishedDate: provider.dates.createdAt,
        staffCount: 0,
        specialties: []
    };
};