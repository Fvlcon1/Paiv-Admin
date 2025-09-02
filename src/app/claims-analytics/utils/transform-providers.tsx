export const transformProviders = (providers: any) => {
    console.log({providers})
    const transformedProviders = providers.map((provider: any) => {
        return {
            id: provider.id,
            providerName: provider.facility_name,
            providerType: provider.facility_type,
            prescribingLevel: provider.prescribing_level,
            contactPersonName: provider.contact_person_name,
            contactPersonRole: provider.contact_person_role,
            phoneNumber: provider.phone_number,
            contactPersonEmail: provider.contact_person_email,
            orgEmail: provider.org_email,
            physicalAddress: provider.physical_address,
            digitalAddress: provider.digital_address,
            district: provider.district,
            region: provider.region,
            gpsCoordinates: {
                lat: provider.gps_coordinates?.lat,
                lng: provider.gps_coordinates?.lng,
            },
            credentialStatus: provider.credential_status,
            credentialId: provider.credential_id,
            issueDate: provider.issue_date,
            expiryDate: provider.expiry_date,
            credentialDocumentUrl: provider.credential_document_url,
            lastUpdatedDate: provider.last_updated_date,
            createdAt: provider.created_at,
            updatedAt: provider.updated_at
        }
    })
    console.log({transformedProviders})
    return transformedProviders
}