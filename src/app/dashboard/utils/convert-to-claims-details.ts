import { IClaimsDetailType } from './types'

const convertToClaimsDetails = (data:any) : IClaimsDetailType => {
    return {
        expectedPayout : data.expected_payout,
        reasons : data.reason,
        diagnosis : data.diagnosis,
        drugs : data.drugs,
        serviceOutcome : data.service_outcome,
        serviceType1 : data.service_type_1,
        serviceType2 : data.service_type_2,
        specialties : data.specialties,
        typeofAttendance : data.typeofAttendance,
        medicalProcedures : data.medical_procedures,
        labTests : data.lab_tests,
        medicalProceduresTotal : data.medical_procedures_total,
        labTestsTotal : data.lab_tests_total,
        drugsTotal : data.drugs_total,
        hospitalName : data.hospital_name,
        patientName : data.patient_name,
        location : data.location,
        pharmacy : data.pharmacy,
        status : data.status,
        totalPayout : data.total_payout,
    }
}

export default convertToClaimsDetails